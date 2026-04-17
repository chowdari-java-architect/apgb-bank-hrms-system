package com.bank.hrms.service;

import com.bank.hrms.model.User;
import com.bank.hrms.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository repo;

    public UserService(UserRepository repo) {
        this.repo = repo;
    }

    public User save(User user) {
        return repo.save(user);
    }

    public User login(String username, String password) {
        return repo.findByUsername(username)
                .filter(user -> user.getPassword().equals(password))
                .orElse(null);
    }
}