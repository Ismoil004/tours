package org.example.backend.service;

import org.example.backend.entity.User;

public interface UserService {
    User findByUsername(String username);
}
