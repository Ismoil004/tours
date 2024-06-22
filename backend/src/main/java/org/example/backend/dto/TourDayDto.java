package org.example.backend.dto;

import java.util.UUID;

 public record TourDayDto(String title, String description, String photo, UUID tourId) {
}
