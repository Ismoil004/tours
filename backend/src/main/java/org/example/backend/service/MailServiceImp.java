package org.example.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MailServiceImp implements MailService {

    private final JavaMailSender mailSender;

    @Override
    public HttpEntity<?> send(String to, String subject, String body) {
        SimpleMailMessage simpleMessage = new SimpleMailMessage();
        simpleMessage.setTo(to);
        simpleMessage.setSubject(subject);
        simpleMessage.setText(body);
        mailSender.send(simpleMessage);
        return ResponseEntity.ok("SENT");
    }
}
