package com.lockin.lock_in_api.service;

import com.lockin.lock_in_api.controller.LockerStatusController;
import com.lockin.lock_in_api.model.*;
import com.lockin.lock_in_api.repository.*;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class ReservationServiceTest {

    @Mock private ReservationRepository reservationRepository;
    @Mock private LockerSpaceRepository spaceRepository;
    @Mock private UserRepository userRepository;
    @Mock private LockerStatusController statusController;

    @InjectMocks private ReservationService reservationService;

    @Test
    void testReservationServiceConstructor() {
        assertNotNull(reservationService);
    }


    @Test
    void testCreateReservation_Success() {
        User user = new User();
        user.setEmail("user@test.com");

        LockerSpace space = new LockerSpace();
        space.setAvailable(true);

        when(spaceRepository.findById(1)).thenReturn(Optional.of(space));
        when(userRepository.findByEmail("user@test.com")).thenReturn(Optional.of(user));
        when(spaceRepository.save(space)).thenReturn(space);
        when(reservationRepository.save(any(Reservation.class))).thenAnswer(i -> i.getArguments()[0]);

        Reservation res = reservationService.createReservation(1, "user@test.com", 2);

        assertNotNull(res);
        assertEquals(user, res.getUser());
        assertEquals(space, res.getSpace());
        assertFalse(space.getAvailable());
        assertFalse(res.getExpired());
        assertNotNull(res.getAccessCode());

        verify(spaceRepository).save(space);
        verify(reservationRepository).save(res);
        verify(statusController).notifyLockerStatusChange(space);
    }


    @Test
    void testCreateReservation_InvalidDuration() {
        assertThrows(IllegalArgumentException.class, () ->
                reservationService.createReservation(1, "test@mail.com", 10));
    }

    @Test
    void testDeactivateReservation_Unauthorized() {
        User owner = new User();
        owner.setEmail("owner@test.com");
        Reservation res = new Reservation();
        res.setUser(owner);

        when(reservationRepository.findById(1)).thenReturn(Optional.of(res));

        assertThrows(RuntimeException.class, () ->
                reservationService.deactivateReservation(1, "hacker@test.com"));
    }
}