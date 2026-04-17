package com.bank.hrms.controller;

import com.bank.hrms.config.JwtUtil;
import com.bank.hrms.model.User;
import com.bank.hrms.service.UserService;
import org.springframework.web.bind.annotation.*;

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
    public String login(@RequestBody User user) {

        User loggedInUser = service.login(
                user.getUsername(),
                user.getPassword()
        );

        if (loggedInUser != null) {
            return jwtUtil.generateToken(
                    loggedInUser.getUsername()
            );
        }

        return "Invalid Username or Password";
    }
}