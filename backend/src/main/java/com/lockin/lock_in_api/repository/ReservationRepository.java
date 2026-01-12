package com.lockin.lock_in_api.repository;

import com.lockin.lock_in_api.model.LockerSpace;
import com.lockin.lock_in_api.model.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface ReservationRepository extends JpaRepository<Reservation, Integer> {

    List<Reservation> findByUserUserID(Integer userID);

    List<Reservation> findByEndTimeBeforeAndExpiredFalse(LocalDateTime time);

    boolean existsByAccessCode(String accessCode);
    List<Reservation> findBySpaceAndExpiredFalse(LockerSpace space);

}