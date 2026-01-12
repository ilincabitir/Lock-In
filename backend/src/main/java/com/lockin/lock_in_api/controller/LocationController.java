package com.lockin.lock_in_api.controller;

import com.lockin.lock_in_api.model.LockerLocation;
import com.lockin.lock_in_api.model.LockerSpace;
import com.lockin.lock_in_api.service.LocationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/locations")
public class LocationController {

    private final LocationService locationService;


    public LocationController(LocationService locationService) {
        this.locationService = locationService;
    }


    @GetMapping
    public ResponseEntity<List<LockerLocation>> getAllLocations() {
        return ResponseEntity.ok(locationService.getAllLocations());
    }


    @PostMapping
    public ResponseEntity<LockerLocation> addLocation(@RequestBody LockerLocation location) {
        try {
            LockerLocation newLocation = locationService.addLocation(location);

            return ResponseEntity.status(201).body(newLocation);
        } catch (IllegalArgumentException e) {

            return ResponseEntity.badRequest().body(null);
        }
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> removeLocation(@PathVariable Integer id) {
        try {
            locationService.removeLocation(id);

            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {

            return ResponseEntity.notFound().build();
        }
    }
    @GetMapping("/{id}/spaces")
    public ResponseEntity<List<com.lockin.lock_in_api.model.LockerSpace>> getLockerSpaces(@PathVariable Integer id) {
        List<com.lockin.lock_in_api.model.LockerSpace> spaces = locationService.getSpacesByLocation(id);
        return ResponseEntity.ok(spaces);
    }




    @PostMapping("/{id}/spaces")
    public ResponseEntity<LockerSpace> addSpace(@PathVariable Integer id, @RequestBody LockerSpace space) {
        try {
            LockerSpace newSpace = locationService.addSpaceToLocation(id, space);
            return ResponseEntity.status(201).body(newSpace);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }


    @PutMapping("/{id}")
    public ResponseEntity<?> updateLocation(@PathVariable Integer id, @RequestBody Map<String, String> payload) {
        try {
            String newAddress = payload.get("address");
            LockerLocation updatedLocation = locationService.updateLocationAddress(id, newAddress);
            return ResponseEntity.ok(updatedLocation);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }


}