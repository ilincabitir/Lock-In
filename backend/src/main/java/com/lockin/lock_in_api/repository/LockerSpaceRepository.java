package com.lockin.lock_in_api.repository;

import com.lockin.lock_in_api.model.LockerSpace;
import com.lockin.lock_in_api.model.LockerSpaceSize;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LockerSpaceRepository extends JpaRepository<LockerSpace, Integer> {
    List<LockerSpace> findByLockerLocation_LocationID(Integer locationID);
    List<LockerSpace> findByLockerLocationLocationIDAndSizeAndAvailable(Integer locationID, LockerSpaceSize size, Boolean available);
    List<LockerSpace> findByLockerLocation_LocationIDAndActiveTrue(Integer locationID);
}
