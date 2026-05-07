package com.bank.hrms.controller;

import com.bank.hrms.config.JwtUtil;
import com.bank.hrms.model.User;
import com.bank.hrms.service.UserService;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin("*")
public class AuthController {

    private final UserService service;
    private final JwtUtil jwtUtil;

    // Constructor Injection
    public AuthController(UserService service,
                          JwtUtil jwtUtil) {
        this.service = service;
        this.jwtUtil = jwtUtil;
    }

    // ✅ Register User
    @PostMapping("/register")
    public User register(@RequestBody User user) {
        return service.save(user);
    }

    // ✅ Login User → Generate JWT Token
    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody User user) {

        User loggedInUser = service.login(
                user.getUsername(),
                user.getPassword()
        );

        Map<String, Object> response = new HashMap<>();

        if (loggedInUser != null) {

            String token = jwtUtil.generateToken(
                    loggedInUser.getUsername()
            );

            response.put("token", token);
            response.put("username", loggedInUser.getUsername());
            response.put("role", loggedInUser.getRole());

            return response;
        }

        response.put("message", "Invalid Username or Password");
        return response;
    }
}