package com.lockin.lock_in_api.service;

import com.lockin.lock_in_api.controller.LocationStatusController;
import com.lockin.lock_in_api.model.LockerLocation;
import com.lockin.lock_in_api.model.LockerSpace;
import com.lockin.lock_in_api.model.Reservation;
import com.lockin.lock_in_api.repository.LockerLocationRepository;
import com.lockin.lock_in_api.repository.LockerSpaceRepository;
import com.lockin.lock_in_api.repository.ReservationRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;


import java.time.LocalDateTime;
import java.util.List;

@Service
public class LocationService {

    private final LockerLocationRepository locationRepository;
    private final LockerSpaceRepository spaceRepository;
    private final ReservationRepository reservationRepository;
    private final LocationStatusController locationStatusController;

    public LocationService(LockerLocationRepository locationRepository,
                           LockerSpaceRepository spaceRepository,
                           ReservationRepository reservationRepository,
                           LocationStatusController locationStatusController) {
        this.locationRepository = locationRepository;
        this.spaceRepository = spaceRepository;
        this.reservationRepository = reservationRepository;
        this.locationStatusController = locationStatusController;
    }


    public List<LockerLocation> getAllLocations() {
        return locationRepository.findAllByActiveTrue();
    }



    @Transactional
    public void removeLocation(Integer id) {
        LockerLocation location = locationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Location not found"));

        location.setActive(false);
        List<LockerSpace> spaces = location.getSpaces();

        if (spaces != null && !spaces.isEmpty()) {
            ExecutorService executor = Executors.newFixedThreadPool(5);
            for (LockerSpace space : spaces) {
                executor.submit(() -> {
                    System.out.println(
                            "[THREAD-START] Deactivating space " + space.getSpaceID() +
                                    " | Thread: " + Thread.currentThread().getName()
                    );
                    space.setAvailable(true);
                    space.setActive(false);
                    List<Reservation> activeReservations = reservationRepository.findBySpaceAndExpiredFalse(space);
                    for (Reservation res : activeReservations) {
                        res.setExpired(true);
                        res.setEndTime(LocalDateTime.now());
                    }
                    reservationRepository.saveAll(activeReservations);
                    spaceRepository.save(space);
                    locationStatusController.notifySpaceDeactivation(space.getSpaceID());
                });
            }
            executor.shutdown();
            while (!executor.isTerminated()) {}
        }

        locationRepository.save(location);
        locationStatusController.notifyLocationDeactivation(location.getLocationID());
    }

    @Transactional
    public LockerLocation addLocation(LockerLocation location) {
        if (location.getAddress() == null || location.getAddress().trim().isEmpty()) {
            throw new IllegalArgumentException("Address cannot be empty.");
        }
        return locationRepository.save(location);
    }

    @Transactional
    public LockerSpace addSpaceToLocation(Integer locationId, LockerSpace space) {
        LockerLocation location = locationRepository.findById(locationId)
                .orElseThrow(() -> new RuntimeException("Location not found"));

        space.setLockerLocation(location);
        space.setAvailable(true);
        LockerSpace saved = spaceRepository.save(space);
        locationStatusController.notifySpaceDeactivation(saved.getSpaceID()); // optional if needed
        return saved;
    }





public List<LockerSpace> getSpacesByLocation(Integer locationId) {
        return spaceRepository.findByLockerLocation_LocationIDAndActiveTrue(locationId);
    }

    @Transactional
    public LockerLocation updateLocationAddress(Integer id, String newAddress) {
        LockerLocation location = locationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Location not found"));

        if (newAddress == null || newAddress.trim().isEmpty()) {
            throw new IllegalArgumentException("Address cannot be empty.");
        }

        location.setAddress(newAddress);
        return locationRepository.save(location);
    }
}