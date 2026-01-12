package com.lockin.lock_in_api.model;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.annotations.SQLRestriction;
import java.util.List;

@Entity
@Table(name = "locker_location")
@Data
public class LockerLocation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "location_id")
    private Integer locationID;

    private String address;
    private double latitude;
    private double longitude;

    @OneToMany(mappedBy = "lockerLocation", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JsonManagedReference
    private List<LockerSpace> spaces;

    private Boolean active = true;
}