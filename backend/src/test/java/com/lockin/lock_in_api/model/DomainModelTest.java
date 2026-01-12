package com.lockin.lock_in_api.model;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class DomainModelConstructorTest {

    @Test
    void testUserNoArgsConstructor() {
        User user = new User();

        assertNotNull(user);
        assertNull(user.getUserID());
        assertNull(user.getName());
        assertNull(user.getEmail());
        assertNull(user.getPassword());
        assertNull(user.getRole());
        assertNull(user.getReservations());
    }

    @Test
    void testLockerLocationNoArgsConstructor() {
        LockerLocation location = new LockerLocation();

        assertNotNull(location);
        assertNull(location.getLocationID());
        assertNull(location.getAddress());
        assertEquals(0.0, location.getLatitude());
        assertEquals(0.0, location.getLongitude());
        assertNull(location.getSpaces());
        assertTrue(location.getActive());
    }

    @Test
    void testLockerSpaceNoArgsConstructor() {
        LockerSpace space = new LockerSpace();

        assertNotNull(space);
        assertNull(space.getSpaceID());
        assertNull(space.getLockerLocation());
        assertNull(space.getSize());
        assertTrue(space.getAvailable());
        assertTrue(space.getActive());
    }

    @Test
    void testReservationNoArgsConstructor() {
        Reservation reservation = new Reservation();

        assertNotNull(reservation);
        assertNull(reservation.getReservationID());
        assertNull(reservation.getUser());
        assertNull(reservation.getSpace());
        assertNull(reservation.getStartTime());
        assertNull(reservation.getEndTime());
        assertNull(reservation.getAccessCode());
        assertFalse(reservation.getExpired());
    }
}

