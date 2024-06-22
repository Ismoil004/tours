package org.example.backend.repository;

import org.example.backend.entity.TourDay;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.UUID;

public interface TourDayRepo extends JpaRepository<TourDay, UUID> {
    @Query(value = "SELECT * FROM tour_day WHERE tour_Id = :tourId", nativeQuery = true)
    List<TourDay> findTourDayByTourId(UUID tourId);
    List<TourDay>getAllByTourId(UUID tourId);
    List<TourDay>getAllById(UUID idd);
}
