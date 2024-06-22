package org.example.backend.repository;

import org.example.backend.entity.Enquiry;
import org.example.backend.entity.TourDay;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface EnquiryRepo extends JpaRepository<Enquiry, UUID> {

}
