package com.lockin.lock_in_api.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;
import lombok.ToString;

import java.time.LocalDateTime;
import java.util.UUID;
@Entity
@Table(name = "reservation")
@Data
public class Reservation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "reservation_id")
    private Integer reservationID;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIgnoreProperties({
            "password", "reservations", "authorities", "role",
            "enabled", "accountNonExpired", "accountNonLocked",
            "credentialsNonExpired", "active"
    })
    private User user;


    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "space_id", nullable = false)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private LockerSpace space;

    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private String accessCode;
    private Boolean expired = false;
}