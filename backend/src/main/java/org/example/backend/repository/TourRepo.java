package org.example.backend.repository;

import org.example.backend.entity.Tour;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface TourRepo extends JpaRepository<Tour, UUID> {
}
