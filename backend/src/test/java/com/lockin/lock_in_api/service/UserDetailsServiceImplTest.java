package com.lockin.lock_in_api.service;

import com.lockin.lock_in_api.model.User;
import com.lockin.lock_in_api.model.UserRole;
import com.lockin.lock_in_api.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class UserDetailsServiceImplTest {

    @Mock private UserRepository userRepository;

    @InjectMocks private UserDetailsServiceImpl userDetailsService;

    @Test
    void testConstructor() {
        assertNotNull(userDetailsService);
    }

    @Test
    void testLoadUserByUsername_Success() {
        User user = new User();
        user.setEmail("test@lockin.com");
        user.setPassword("encoded_pass");
        user.setRole(UserRole.USER);

        when(userRepository.findByEmail("test@lockin.com")).thenReturn(Optional.of(user));

        UserDetails result = userDetailsService.loadUserByUsername("test@lockin.com");
        assertEquals("test@lockin.com", result.getUsername());
    }
}