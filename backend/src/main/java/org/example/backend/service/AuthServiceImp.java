package org.example.backend.service;

import org.example.backend.dto.LoginDto;
import org.example.backend.entity.User;
import org.example.backend.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class AuthServiceImp implements AuthService {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private JwtService jwtService;

    @Override
    public Map<String, String> check(LoginDto loginDto) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginDto.getUsername(), loginDto.getPassword())
            );

            SecurityContextHolder.getContext().setAuthentication(authentication);

            User user = userRepo.findByUsername(loginDto.getUsername())
                    .orElseThrow(() -> new RuntimeException("User not found"));

            String accessToken = jwtService.generateJwtToken(user);
            String refreshToken = jwtService.generateRefreshToken(user);

            Map<String, String> tokens = new HashMap<>();
            tokens.put("access_token", accessToken);
            tokens.put("refresh_token", refreshToken);
            tokens.put("username", user.getUsername());

            return tokens;
        } catch (Exception e) {
            throw new RuntimeException("Invalid credentials", e);
        }
    }
}
