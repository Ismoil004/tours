package org.example.backend.service;

import org.example.backend.dto.TourDayDto;
import org.example.backend.entity.TourDay;

import java.util.List;
import java.util.UUID;

public interface TourDayService {
    TourDay addTourDay(TourDayDto tourDayDto);
    List<TourDay> getTourDays(UUID tourId);
    TourDay updateTourDay(UUID id, TourDayDto tourDayDto);
    void deleteTourDay(UUID id);
    List<TourDay> getById(UUID tourId);
    List<TourDay>getByIdd(UUID idd);
}
