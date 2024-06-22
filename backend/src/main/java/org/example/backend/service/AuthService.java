package org.example.backend.service;

import org.example.backend.dto.LoginDto;
import org.example.backend.entity.User;

import java.util.Map;

public interface AuthService {
    Map<String, String> check(LoginDto loginDto);
}
