package com.carvo.backend.controller;

import com.carvo.backend.dto.RegisterRequest;
import com.carvo.backend.entity.User;
import com.carvo.backend.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public Map<String, Object> register(
            @Valid @RequestBody RegisterRequest request) {

        User user = authService.register(request);

        return Map.of(
                "message", "User registered successfully",
                "id", user.getId(),
                "fullName", user.getFullName(),
                "email", user.getEmail()
        );
    }
}
