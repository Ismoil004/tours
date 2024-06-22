package org.example.backend.service;

import org.springframework.http.HttpEntity;

public interface MailService {
    HttpEntity<?> send(String to, String subject, String body);
}