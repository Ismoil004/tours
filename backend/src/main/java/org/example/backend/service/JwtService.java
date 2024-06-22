
package org.example.backend.service;

import org.example.backend.entity.User;

public interface JwtService {
    String generateJwtToken(User user);
    String extractSubject(String token);
    String generateRefreshToken(User user);

}
