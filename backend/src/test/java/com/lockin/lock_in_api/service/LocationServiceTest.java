package com.lockin.lock_in_api.service;

import com.lockin.lock_in_api.model.LockerLocation;
import com.lockin.lock_in_api.model.LockerSpace;
import com.lockin.lock_in_api.repository.LockerLocationRepository;
import com.lockin.lock_in_api.repository.LockerSpaceRepository;
import com.lockin.lock_in_api.repository.ReservationRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.Collections;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class LocationServiceTest {

    @Mock private LockerLocationRepository locationRepository;
    @Mock private LockerSpaceRepository spaceRepository;
    @Mock private ReservationRepository reservationRepository;

    @InjectMocks private LocationService locationService;

    @Test
    void testServiceIsNotNull() {
        assertNotNull(locationService);
    }

    @Test
    void testAddLocation_Failure() {
        LockerLocation loc = new LockerLocation();
        loc.setAddress("");
        loc.setLatitude(0);
        loc.setLongitude(0);

        assertThrows(IllegalArgumentException.class, () -> locationService.addLocation(loc));
    }

    @Test
    void testAddLocation_Success() {
        LockerLocation loc = new LockerLocation();
        loc.setAddress("Test");
        loc.setLatitude(10.0);
        loc.setLongitude(20.0);

        when(locationRepository.save(loc)).thenReturn(loc);

        LockerLocation saved = locationService.addLocation(loc);
        assertEquals("Test", saved.getAddress());
        verify(locationRepository).save(loc);
    }

}
