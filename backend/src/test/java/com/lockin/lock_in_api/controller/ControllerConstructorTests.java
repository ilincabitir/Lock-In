package com.lockin.lock_in_api.controller;
import com.lockin.lock_in_api.controller.*;
import com.lockin.lock_in_api.repository.LockerSpaceRepository;
import com.lockin.lock_in_api.repository.UserRepository;
import com.lockin.lock_in_api.service.AuthService;
import com.lockin.lock_in_api.service.LocationService;
import com.lockin.lock_in_api.service.ReservationService;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import static org.junit.jupiter.api.Assertions.assertNotNull;

class ControllerConstructorTests {

    @Test
    void authControllerConstructor_ShouldInitialize() {
        AuthService authService = Mockito.mock(AuthService.class);
        AuthController controller = new AuthController(authService);
        assertNotNull(controller);
    }

    @Test
    void locationControllerConstructor_ShouldInitialize() {
        LocationService locationService = Mockito.mock(LocationService.class);
        LocationController controller = new LocationController(locationService);
        assertNotNull(controller);
    }

    @Test
    void locationStatusControllerConstructor_ShouldInitialize() {
        SimpMessagingTemplate template = Mockito.mock(SimpMessagingTemplate.class);
        LocationStatusController controller = new LocationStatusController(template);
        assertNotNull(controller);
    }

    @Test
    void lockerSpaceControllerConstructor_ShouldInitialize() {
        LockerSpaceRepository repo = Mockito.mock(LockerSpaceRepository.class);
        LockerSpaceController controller = new LockerSpaceController(repo);
        assertNotNull(controller);
    }

    @Test
    void lockerStatusControllerConstructor_ShouldInitialize() {
        SimpMessagingTemplate template = Mockito.mock(SimpMessagingTemplate.class);
        LockerStatusController controller = new LockerStatusController(template);
        assertNotNull(controller);
    }

    @Test
    void reservationControllerConstructor_ShouldInitialize() {
        ReservationService service = Mockito.mock(ReservationService.class);
        ReservationController controller = new ReservationController(service);
        assertNotNull(controller);
    }

    @Test
    void userControllerConstructor_ShouldInitialize() {
        UserRepository repo = Mockito.mock(UserRepository.class);
        UserController controller = new UserController(repo);
        assertNotNull(controller);
    }
}
