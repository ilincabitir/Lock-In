package com.lockin.lock_in_api.service;

import com.lockin.lock_in_api.model.*;
import com.lockin.lock_in_api.repository.*;
import com.lockin.lock_in_api.controller.LockerStatusController;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Random;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

@Service
public class ReservationService {
    private final ReservationRepository reservationRepository;
    private final LockerSpaceRepository spaceRepository;
    private final UserRepository userRepository;
    private final LockerStatusController statusController;

    public ReservationService(ReservationRepository rr, LockerSpaceRepository sr, UserRepository ur, LockerStatusController sc) {
        this.reservationRepository = rr;
        this.spaceRepository = sr;
        this.userRepository = ur;
        this.statusController = sc;
    }

    @Transactional
    public Reservation createReservation(Integer spaceId, String email, Integer durationHours) {
        if (durationHours < 1 || durationHours > 6) {
            throw new IllegalArgumentException("Duration must be between 1 and 6 hours.");
        }
        LockerSpace space = spaceRepository.findById(spaceId)
                .orElseThrow(() -> new RuntimeException("Locker space not found."));

        if (!space.getAvailable()) throw new RuntimeException("Locker is occupied.");

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found."));

        space.setAvailable(false);
        spaceRepository.save(space);
        statusController.notifyLockerStatusChange(space);

        Reservation res = new Reservation();
        res.setUser(user);
        res.setSpace(space);
        res.setStartTime(LocalDateTime.now());
        res.setEndTime(LocalDateTime.now().plusHours(durationHours));
        res.setExpired(false);
        res.setAccessCode(String.format("%08d", new Random().nextInt(100000000)));

        return reservationRepository.save(res);
    }

    @Transactional
    public void deactivateReservation(Integer id, String email) {
        Reservation res = reservationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Reservation not found"));

        if (!res.getUser().getEmail().equals(email)) {
            throw new RuntimeException("Unauthorized to end this reservation.");
        }

        if (!res.getExpired()) {
            performDeactivation(res);
        }
    }

    @EventListener(ApplicationReadyEvent.class)
    @Transactional
    public void startupCleanup() {
        updateExpiredReservations();
    }

    @Transactional
    @Scheduled(fixedRate = 60000)
    public void updateExpiredReservations() {
        List<Reservation> expiredReservations =
                reservationRepository.findByEndTimeBeforeAndExpiredFalse(LocalDateTime.now());

        ExecutorService executor = Executors.newFixedThreadPool(5);

        for (Reservation r : expiredReservations) {
            executor.submit(() -> {
                System.out.println(
                        "[SCHEDULER] Auto-expiring reservation " + r.getReservationID() +
                                " | Thread: " + Thread.currentThread().getName()
                );

                performDeactivation(r);

                System.out.println(
                        "[SCHEDULER] Reservation " + r.getReservationID() +
                                " expired successfully | Thread: " + Thread.currentThread().getName()
                );
            });

        }

        executor.shutdown();
        while (!executor.isTerminated()) {}
    }

    private void performDeactivation(Reservation reservation) {
        reservation.setExpired(true);
        LockerSpace space = reservation.getSpace();
        if (space != null) {
            space.setAvailable(true);
            spaceRepository.save(space);
            statusController.notifyLockerStatusChange(space);
        }
        reservationRepository.save(reservation);
    }

    public List<Reservation> getUserReservationsByEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return reservationRepository.findByUserUserID(user.getUserID());
    }

    public List<Reservation> getAllReservations() {
        return reservationRepository.findAll();
    }

    public void adminForceDeactivation(Integer id) {
        Reservation res = reservationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Reservation not found"));
        if (!res.getExpired()) performDeactivation(res);
    }

    @Transactional
    public Reservation extendReservation(Integer reservationId, String email, Integer additionalHours) {

        Reservation res = reservationRepository.findById(reservationId)
                .orElseThrow(() -> new RuntimeException("Reservation not found."));

        if (!res.getUser().getEmail().equals(email)) {
            throw new RuntimeException("Unauthorized to extend this reservation.");
        }

        if (res.getExpired()) {
            throw new RuntimeException("Cannot extend an expired reservation.");
        }

        LocalDateTime newEndTime = res.getEndTime().plusHours(additionalHours);
        java.time.Duration totalDuration = java.time.Duration.between(res.getStartTime(), newEndTime);

        if (totalDuration.toHours() > 6) {
            throw new IllegalArgumentException("Total duration cannot exceed 6 hours.");
        }

        res.setEndTime(newEndTime);
        return reservationRepository.save(res);
    }
}
