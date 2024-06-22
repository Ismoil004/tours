package org.example.backend.service;

import lombok.RequiredArgsConstructor;
import org.example.backend.dto.TourDayDto;
import org.example.backend.entity.Tour;
import org.example.backend.entity.TourDay;
import org.example.backend.repository.TourDayRepo;
import org.example.backend.repository.TourRepo;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class TourDayServiceImp implements TourDayService {
    private final TourRepo tourRepo;
    private final TourDayRepo tourDayRepo;

    @Override
    public TourDay addTourDay(TourDayDto tourDayDto) {
        Tour tour = tourRepo.findById(tourDayDto.tourId()).orElseThrow();
        TourDay tourDay = new TourDay();
        tourDay.setTitle(tourDayDto.title());
        tourDay.setDescription(tourDayDto.description());
        tourDay.setPhoto(tourDayDto.photo());
        tourDay.setTour(tour);
        return tourDayRepo.save(tourDay);
    }

    @Override
    public List<TourDay> getTourDays(UUID tourId) {
        return tourDayRepo.getAllByTourId(UUID.fromString(tourId.toString()));
    }

    @Override
    public TourDay updateTourDay(UUID id, TourDayDto tourDayDto) {
        Tour tour = tourRepo.findById(tourDayDto.tourId()).orElseThrow();
        TourDay existingTourDay = tourDayRepo.findById(id).orElseThrow(() -> new RuntimeException("TourDay not found"));
        existingTourDay.setTitle(tourDayDto.title());
        existingTourDay.setDescription(tourDayDto.description());
        if (tourDayDto.photo() == null || tourDayDto.photo().isEmpty()) {
            existingTourDay.setPhoto(existingTourDay.getPhoto());
        } else {
            existingTourDay.setPhoto(tourDayDto.photo());
        }
        existingTourDay.setTour(tour);
        return tourDayRepo.save(existingTourDay);
    }

    @Override
    public void deleteTourDay(UUID id) {
        if (!tourDayRepo.existsById(id)) {
            throw new RuntimeException("TourDay not found");
        }
        tourDayRepo.deleteById(id);
    }

    @Override
    public List<TourDay> getById(UUID tourId) {
        return tourDayRepo.findTourDayByTourId(tourId);
    }

    @Override
    public List<TourDay> getByIdd(UUID idd) {
        return tourDayRepo.getAllById(UUID.fromString(idd.toString()));
    }
}
