package com.lockin.lock_in_api.controller;

import com.lockin.lock_in_api.model.LockerSpace;
import com.lockin.lock_in_api.repository.LockerSpaceRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/spaces")
public class LockerSpaceController {

    private final LockerSpaceRepository lockerSpaceRepository;

    public LockerSpaceController(LockerSpaceRepository lockerSpaceRepository) {
        this.lockerSpaceRepository = lockerSpaceRepository;
    }

    @GetMapping("/search")
    public List<LockerSpace> searchByLocation(@RequestParam Integer locationId) {
        return lockerSpaceRepository.findByLockerLocation_LocationID(locationId);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> softDeleteSpace(@PathVariable Integer id) {
        LockerSpace space = lockerSpaceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Space not found"));

        space.setActive(false);
        lockerSpaceRepository.save(space);

        return ResponseEntity.noContent().build();
    }
}
