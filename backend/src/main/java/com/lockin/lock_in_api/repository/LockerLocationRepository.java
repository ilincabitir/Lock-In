package com.lockin.lock_in_api.repository;

import com.lockin.lock_in_api.model.LockerLocation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LockerLocationRepository extends JpaRepository<LockerLocation, Integer> {
    List<LockerLocation> findAllByActiveTrue();
}