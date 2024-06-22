package org.example.backend.config;

import lombok.RequiredArgsConstructor;
import org.example.backend.entity.Role;
import org.example.backend.entity.User;
import org.example.backend.repository.RoleRepo;
import org.example.backend.repository.UserRepo;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.List;
import java.util.UUID;

@Configuration
@RequiredArgsConstructor
public class CommandRunner implements CommandLineRunner {
    final RoleRepo roleRepo;
    final UserRepo userRepo;

    @Override
    public void run(String... args) throws Exception {
        if (roleRepo.findAll().isEmpty()) {
            List<Role> roles = List.of(new Role(UUID.randomUUID(), "ROLE_ADMIN"));
            List<Role> savedRoles = roleRepo.saveAll(roles);
            BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
            User user = User.builder()
                    .username("Juraev")
                    .password(encoder.encode("123"))
                    .enabled(true)
                    .roles(savedRoles)
                    .build();
            userRepo.save(user);
        }
    }
}