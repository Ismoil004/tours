package org.example.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Tour {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(columnDefinition = "uuid DEFAULT gen_random_uuid()")
    private UUID id;
    private String text;
    private String title;
    private String description;
    private Integer day;
    private Double cost;
    @Column(columnDefinition = "TEXT")
    private String photo;
    private String description2;
    @Column(columnDefinition = "TEXT")
    private String video;

}
