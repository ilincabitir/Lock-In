package com.lockin.lock_in_api.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import static org.springframework.security.config.http.SessionCreationPolicy.STATELESS;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final JwtAuthFilter jwtAuthFilter;

    public SecurityConfig(JwtAuthFilter jwtAuthFilter) {
        this.jwtAuthFilter = jwtAuthFilter;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }



    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)
                .sessionManagement(m -> m.sessionCreationPolicy(STATELESS))
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/auth/**", "/ping").permitAll()
                        .requestMatchers(HttpMethod.POST, "/locations/**").hasAuthority("ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/locations/**").hasAuthority("ADMIN")
                        .requestMatchers(HttpMethod.POST, "/spaces/**").hasAuthority("ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/spaces/**").hasAuthority("ADMIN")
                        .requestMatchers("/reservations/admin/**").hasAuthority("ADMIN")
                        .requestMatchers(HttpMethod.POST, "/reservations").hasAuthority("USER")
                        .requestMatchers("/reservations/**").hasAnyAuthority("USER", "ADMIN")
                        .requestMatchers("/users/me").hasAnyAuthority("USER", "ADMIN")
                        .requestMatchers(HttpMethod.GET, "/locations/**").hasAnyAuthority("USER", "ADMIN")

                        .anyRequest().authenticated()
                )
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
