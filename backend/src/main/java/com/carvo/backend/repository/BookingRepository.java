package com.carvo.backend.repository;

import com.carvo.backend.entity.Booking;
import jakarta.persistence.LockModeType;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.repository.query.Param;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;
import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {

    @EntityGraph(attributePaths = {"ride", "ride.driver", "passenger"})
    List<Booking> findByPassenger_EmailIgnoreCaseOrderByCreatedAtDesc(
            String email
    );

    Optional<Booking> findByIdAndPassenger_EmailIgnoreCase(
            Long id,
            String email
    );

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("SELECT b FROM Booking b WHERE b.id = :bookingId "
            + "AND LOWER(b.passenger.email) = LOWER(:email)")
    Optional<Booking> findByIdAndPassengerEmailForUpdate(
            @Param("bookingId") Long bookingId,
            @Param("email") String email
    );
}
