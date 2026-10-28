
package com.carvo.backend.repository;

import com.carvo.backend.entity.Ride;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDateTime;
import java.util.List;
import jakarta.persistence.LockModeType;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.Optional;

public interface RideRepository extends JpaRepository<Ride, Long> {

    @EntityGraph(attributePaths = {"driver"})
    List<Ride> findByDepartureTimeAfterAndAvailableSeatsGreaterThanOrderByDepartureTimeAsc(
            LocalDateTime departureTime,
            Integer availableSeats
    );
    @EntityGraph(attributePaths = {"driver"})
    List<Ride> findByOriginIgnoreCaseAndDestinationIgnoreCaseAndDepartureTimeAfterAndAvailableSeatsGreaterThanOrderByDepartureTimeAsc(
            String origin,
            String destination,
            LocalDateTime departureTime,
            Integer availableSeats
    );
    @EntityGraph(attributePaths = {"driver"})
    List<Ride> findByDriver_EmailIgnoreCaseOrderByDepartureTimeAsc(
            String email
    );

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("SELECT r FROM Ride r WHERE r.id = :rideId")
    Optional<Ride> findByIdForUpdate(@Param("rideId") Long rideId);



}
