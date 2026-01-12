package com.lockin.lock_in_api.controller;

import com.lockin.lock_in_api.dto.LoginRequest;
import com.lockin.lock_in_api.dto.LoginResponse;
import com.lockin.lock_in_api.model.User;
import com.lockin.lock_in_api.service.AuthService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public User register(@RequestBody User user) {
        return authService.registerUser(user);
    }

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request) {
        return authService.loginUser(
                request.getEmail(),
                request.getPassword()
        );
    }
}
