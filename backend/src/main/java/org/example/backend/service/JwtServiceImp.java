package org.example.backend.service;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

import org.example.backend.entity.User;
import org.example.backend.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
public class JwtServiceImp implements JwtService {
    private static final String SECRET_KEY = "mxkB8R6OYURDIk8HiiEUpBxVLQGznXl4OjDLJaNFke8="; // Ensure this key is consistent

    @Autowired
    private UserRepo userRepo;

    @Override
    public String generateJwtToken(User user) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("username", user.getUsername());
        claims.put("password", user.getPassword());

        return Jwts.builder()
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 15))  // 15 minutes
                .setClaims(claims)
                .setSubject(user.getId().toString())
                .signWith(signWithKey())
                .compact();
    }

    @Override
    public String extractSubject(String token) {
        return Jwts.parser()
                .setSigningKey(signWithKey())
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    private SecretKey signWithKey() {
        byte[] decode = Decoders.BASE64.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(decode);
    }

    @Override
    public String generateRefreshToken(User user) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("username", user.getUsername());
        claims.put("password", user.getPassword());

        return Jwts.builder()
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60))  // 1 hour
                .setClaims(claims)
                .setSubject(user.getId().toString())
                .signWith(signWithKey())
                .compact();
    }
}
