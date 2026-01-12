package com.lockin.lock_in_api.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "locker_space")
@Data
@NoArgsConstructor
public class LockerSpace {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "space_id")
    private Integer spaceID;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "location_id")
    @JsonBackReference
    private LockerLocation lockerLocation;

    @Enumerated(EnumType.STRING)
    private LockerSpaceSize size;

    private Boolean available = true;

    @Column(name = "active", nullable = false)
    private Boolean active = true;



    @JsonProperty("locationAddress")
    public String getJsonAddress() {
        return (lockerLocation != null) ? lockerLocation.getAddress() : "Ghost Hub (Deleted)";
    }

    @JsonProperty("locationActive")
    public Boolean getJsonActive() {
        return (lockerLocation != null) ? lockerLocation.getActive() : false;
    }
}