package org.example.backend.config;

import lombok.RequiredArgsConstructor;
import org.example.backend.repository.UserRepo;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@RequiredArgsConstructor
public class SecurityConfig {
    final UserRepo userRepo;

    @Bean
    SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)
                .cors(Customizer.withDefaults())
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(HttpMethod.POST,"/api/auth/login").permitAll()
                        .requestMatchers(HttpMethod.POST, "/files/img","/files/video","/files/tourDay").permitAll()
                        .requestMatchers(HttpMethod.GET, "/files/img","/files/video","/api/tour","/api/tourDay","/files/tourDay","/api/enquiry/{idd}").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/tour","/api/tourDay").permitAll()
                        .requestMatchers(HttpMethod.GET,"/api/tour/getAll").permitAll()
                        .requestMatchers(HttpMethod.POST,"/api/comment").permitAll()
                        .requestMatchers(HttpMethod.GET,"/api/comment/all","/api/comment/approved","/api/tour/gettour").permitAll()
                        .requestMatchers(HttpMethod.PUT,"/api/comment/{id}/status","/api/comment/{id}/adminstatus","/api/tour/{id}","/api/tourDay/{id}").permitAll()
                        .requestMatchers(HttpMethod.GET,"/api/comment/adminstatus/true").permitAll()
                        .requestMatchers(HttpMethod.GET,"/api/tourDay/{tourId}","api/tourDay/all/{id}").permitAll()
                        .requestMatchers(HttpMethod.GET,"/api/enquiry","/api/tourDay/{idd}").permitAll()
                        .requestMatchers(HttpMethod.POST,"/api/message").permitAll()
                        .requestMatchers(HttpMethod.POST,"/api/enquiry").permitAll()
                        .requestMatchers(HttpMethod.PATCH,"/api/enquiry/{id}/answer").permitAll()
                        .requestMatchers(HttpMethod.DELETE,"/api/tour/{id}","/api/tourDay/{id}").permitAll()
                        .anyRequest().authenticated()
                );
        return http.build();
    }

    @Bean
    UserDetailsService userDetailsService() {
        return username -> userRepo.findByUsername(username).orElseThrow();
    }

    @Bean
    AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
    return configuration.getAuthenticationManager();
}
@Bean
    PasswordEncoder passwordEncoder(){
    return new BCryptPasswordEncoder();
}
}
