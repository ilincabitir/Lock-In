package com.lockin.lock_in_api.service;

import com.lockin.lock_in_api.model.User;
import com.lockin.lock_in_api.model.UserRole;
import com.lockin.lock_in_api.repository.UserRepository;
import com.lockin.lock_in_api.util.JwtUtil;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class AuthServiceTest {

    @Mock private UserRepository userRepository;
    @Mock private PasswordEncoder passwordEncoder;
    @Mock private JwtUtil jwtUtil;

    @InjectMocks private AuthService authService;

    @Test
    void testAuthServiceConstructor() {
        assertNotNull(authService);
    }

    @Test
    void testRegisterUser_Success() {
        User user = new User();
        user.setName("John Doe");
        user.setEmail("new@test.com");
        user.setPassword("Password123");

        when(userRepository.findByEmail(anyString())).thenReturn(Optional.empty());
        when(passwordEncoder.encode("Password123")).thenReturn("hashedPass");
        when(userRepository.save(any(User.class))).thenAnswer(i -> i.getArgument(0));

        User saved = authService.registerUser(user);

        assertNotNull(saved);
        assertEquals("hashedPass", saved.getPassword());
        assertEquals(UserRole.USER, saved.getRole());
    }
    @Test
    void testRegisterUser_Failure_EmptyName() {
        User user = new User();
        user.setName(""); // empty name
        user.setEmail("valid@test.com");
        user.setPassword("Password1");

        Exception exception = assertThrows(IllegalArgumentException.class, () -> {
            authService.registerUser(user);
        });

        assertEquals("Name cannot be empty.", exception.getMessage());
    }
    @Test
    void testRegisterUser_Failure_WeakPassword() {
        User user = new User();
        user.setEmail("valid@email.com");
        user.setPassword("123"); // password is too short,  no uppercase letter, no digit

        assertThrows(IllegalArgumentException.class, () -> authService.registerUser(user));
    }

    @Test
    void testRegisterUser_Failure_InvalidEmail() {
        User invalidUser = new User();
        invalidUser.setEmail("not-an-email");
        invalidUser.setPassword("Password1");

        assertThrows(IllegalArgumentException.class, () -> authService.registerUser(invalidUser));
    }
}