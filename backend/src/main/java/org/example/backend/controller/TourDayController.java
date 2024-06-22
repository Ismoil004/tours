package org.example.backend.controller;

import lombok.RequiredArgsConstructor;
import org.example.backend.dto.TourDayDto;
import org.example.backend.entity.TourDay;
import org.example.backend.service.TourDayService;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/tourDay")
public class TourDayController {

    private final TourDayService tourDayService;

    @PostMapping
    public HttpEntity<?> addTourDay(@RequestBody TourDayDto tourDayDto) {
        TourDay addedTourDay = tourDayService.addTourDay(tourDayDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(addedTourDay);
    }
    @GetMapping("/all/{id}")
    public ResponseEntity<List<TourDay>> getAllTourDays(@PathVariable UUID id) {
        List<TourDay> tourDays = tourDayService.getTourDays(id);
        return ResponseEntity.ok(tourDays);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateTourDay(@PathVariable UUID id, @RequestBody TourDayDto tourDayDto) {
        TourDay updatedTourDay = tourDayService.updateTourDay(id, tourDayDto);
        return ResponseEntity.ok(updatedTourDay);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTourDay(@PathVariable UUID id) {
        tourDayService.deleteTourDay(id);
        return ResponseEntity.noContent().build();
    }
    @GetMapping("/{tourId}")
    public List<TourDay> getTourDay(@PathVariable UUID tourId) {
        List<TourDay> tourDays = tourDayService.getById(tourId);
        return tourDays;
    }
    @GetMapping("/idd")
    public List<TourDay> getTourDays(@RequestParam UUID idd) {
        List<TourDay>tourDays = tourDayService.getByIdd(idd);
        return tourDays;
    }
}
