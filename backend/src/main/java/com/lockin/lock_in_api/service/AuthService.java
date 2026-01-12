package com.lockin.lock_in_api.service;

import com.lockin.lock_in_api.dto.LoginResponse;
import com.lockin.lock_in_api.model.User;
import com.lockin.lock_in_api.model.UserRole;
import com.lockin.lock_in_api.repository.UserRepository;
import com.lockin.lock_in_api.util.JwtUtil;
import jakarta.transaction.Transactional;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    @Transactional
    public User registerUser(User user) {

        if (user.getName() == null || user.getName().trim().isEmpty()) {
            throw new IllegalArgumentException("Name cannot be empty.");
        }

        if (user.getEmail() == null || !user.getEmail().matches("^[A-Za-z0-9+_.-]+@(.+)$")) {
            throw new IllegalArgumentException("Invalid email format.");
        }


        if (user.getPassword() == null || user.getPassword().length() < 8 ||
                !user.getPassword().matches(".*[A-Z].*") || !user.getPassword().matches(".*\\d.*")) {
            throw new IllegalArgumentException("Password must be at least 8 characters, include an uppercase letter and a digit.");
        }


        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new RuntimeException("Email already in use.");
        }

        String encodedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(encodedPassword);
        user.setRole(UserRole.USER);

        return userRepository.save(user);
    }

    public LoginResponse loginUser(String email, String password) {
        Optional<User> userOpt = userRepository.findByEmail(email);

        if (userOpt.isEmpty() || !passwordEncoder.matches(password, userOpt.get().getPassword())) {
            throw new RuntimeException("Invalid credentials.");
        }

        User user = userOpt.get();
        String token = jwtUtil.generateToken(user.getEmail(), user.getRole().name());


        return new LoginResponse(token, user.getRole().name());
    }
}
