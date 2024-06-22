package org.example.backend.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Pattern;
import lombok.Data;
import java.util.UUID;

@Data
@Entity
public class Enquiry {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(columnDefinition = "uuid DEFAULT gen_random_uuid()")
    private UUID id;

    private String firstname;
    private String lastname;
    @Pattern(regexp = "^\\+998.*$", message = "Phone number must start with +998")
    private String phoneNumber;
    private String email;
    private String text;
    private String tourName;
    private String answer;
}
