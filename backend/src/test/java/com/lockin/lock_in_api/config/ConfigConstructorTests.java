package com.lockin.lock_in_api.config;
import com.lockin.lock_in_api.config.JwtAuthFilter;
import com.lockin.lock_in_api.config.SecurityConfig;
import com.lockin.lock_in_api.util.JwtUtil;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.security.core.userdetails.UserDetailsService;

import static org.junit.jupiter.api.Assertions.assertNotNull;

class ConfigConstructorTests {

    @Test
    void jwtAuthFilterConstructor_ShouldInitialize() {
        JwtUtil jwtUtil = Mockito.mock(JwtUtil.class);
        UserDetailsService uds = Mockito.mock(UserDetailsService.class);

        JwtAuthFilter filter = new JwtAuthFilter(jwtUtil, uds);
        assertNotNull(filter);
    }

    @Test
    void securityConfigConstructor_ShouldInitialize() {
        JwtAuthFilter filter = Mockito.mock(JwtAuthFilter.class);
        SecurityConfig config = new SecurityConfig(filter);
        assertNotNull(config);
    }
}
