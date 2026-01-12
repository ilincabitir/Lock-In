package com.lockin.lock_in_api.controller;

import com.lockin.lock_in_api.model.Reservation;
import com.lockin.lock_in_api.service.ReservationService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/reservations")
public class ReservationController {

    private final ReservationService reservationService;

    public ReservationController(ReservationService reservationService) {
        this.reservationService = reservationService;
    }

    @PostMapping
    public ResponseEntity<Reservation> create(@RequestBody ReservationRequest req, Principal principal) {
        try {

            Reservation res = reservationService.createReservation(
                    req.getSpaceId(),
                    principal.getName(),
                    req.getHours()
            );
            return ResponseEntity.status(201).body(res);
        } catch (IllegalArgumentException e) {

            return ResponseEntity.badRequest().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping
    public ResponseEntity<List<Reservation>> getMyReservations(Principal principal) {

        return ResponseEntity.ok(reservationService.getUserReservationsByEmail(principal.getName()));
    }

    @PostMapping("/{id}/deactivate")
    public ResponseEntity<Void> deactivate(@PathVariable Integer id, Principal principal) {
        reservationService.deactivateReservation(id, principal.getName());
        return ResponseEntity.ok().build();
    }

    @GetMapping("/admin/all")
    public ResponseEntity<List<Reservation>> getAll() {
        return ResponseEntity.ok(reservationService.getAllReservations());
    }

    @PostMapping("/admin/{id}/force-deactivate")
    public ResponseEntity<Void> adminForceDeactivate(@PathVariable Integer id) {
        reservationService.adminForceDeactivation(id);
        return ResponseEntity.ok().build();
    }

    public static class ReservationRequest {
        private Integer spaceId;
        private Integer hours;

        public Integer getSpaceId() { return spaceId; }
        public void setSpaceId(Integer spaceId) { this.spaceId = spaceId; }
        public Integer getHours() { return hours; }
        public void setHours(Integer hours) { this.hours = hours; }
    }

    @PostMapping("/{id}/extend")
    public ResponseEntity<?> extend(@PathVariable Integer id, @RequestBody Map<String, Integer> request, Principal principal) {
        try {
            Integer additionalHours = request.get("additionalHours");
            Reservation updated = reservationService.extendReservation(id, principal.getName(), additionalHours);
            return ResponseEntity.ok(updated);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}