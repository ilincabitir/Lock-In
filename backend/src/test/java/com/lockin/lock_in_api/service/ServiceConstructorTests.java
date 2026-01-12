package com.lockin.lock_in_api.service;

import com.lockin.lock_in_api.controller.LocationStatusController;
import com.lockin.lock_in_api.controller.LockerStatusController;
import com.lockin.lock_in_api.repository.LockerLocationRepository;
import com.lockin.lock_in_api.repository.LockerSpaceRepository;
import com.lockin.lock_in_api.repository.ReservationRepository;
import com.lockin.lock_in_api.repository.UserRepository;
import com.lockin.lock_in_api.service.AuthService;
import com.lockin.lock_in_api.service.LocationService;
import com.lockin.lock_in_api.service.ReservationService;
import com.lockin.lock_in_api.service.UserDetailsServiceImpl;
import com.lockin.lock_in_api.util.JwtUtil;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.junit.jupiter.api.Assertions.assertNotNull;

class ServiceConstructorTests {

    @Test
    void authServiceConstructor_ShouldInitialize() {
        UserRepository userRepository = Mockito.mock(UserRepository.class);
        PasswordEncoder passwordEncoder = Mockito.mock(PasswordEncoder.class);
        JwtUtil jwtUtil = Mockito.mock(JwtUtil.class);

        AuthService service = new AuthService(userRepository, passwordEncoder, jwtUtil);
        assertNotNull(service);
    }

    @Test
    void locationServiceConstructor_ShouldInitialize() {
        LockerLocationRepository locationRepo = Mockito.mock(LockerLocationRepository.class);
        LockerSpaceRepository spaceRepo = Mockito.mock(LockerSpaceRepository.class);
        ReservationRepository reservationRepo = Mockito.mock(ReservationRepository.class);
        LocationStatusController statusController = Mockito.mock(LocationStatusController.class);

        LocationService service = new LocationService(locationRepo, spaceRepo, reservationRepo, statusController);
        assertNotNull(service);
    }

    @Test
    void reservationServiceConstructor_ShouldInitialize() {
        ReservationRepository rr = Mockito.mock(ReservationRepository.class);
        LockerSpaceRepository sr = Mockito.mock(LockerSpaceRepository.class);
        UserRepository ur = Mockito.mock(UserRepository.class);
        LockerStatusController sc = Mockito.mock(LockerStatusController.class);

        ReservationService service = new ReservationService(rr, sr, ur, sc);
        assertNotNull(service);
    }

    @Test
    void userDetailsServiceImplConstructor_ShouldInitialize() {
        UserRepository repo = Mockito.mock(UserRepository.class);
        UserDetailsServiceImpl service = new UserDetailsServiceImpl(repo);
        assertNotNull(service);
    }
}
