package com.lockin.lock_in_api.controller;

import com.lockin.lock_in_api.model.User;
import com.lockin.lock_in_api.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }



    @GetMapping("/me")
    public ResponseEntity<User> getCurrentUser(Principal principal) {

        return userRepository.findByEmail(principal.getName())
                .map(user -> {

                    user.setPassword(null);
                    return ResponseEntity.ok(user);
                })
                .orElse(ResponseEntity.notFound().build());
    }
}