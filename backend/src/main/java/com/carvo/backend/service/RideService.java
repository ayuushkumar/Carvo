package com.carvo.backend.service;

import com.carvo.backend.dto.CreateRideRequest;
import com.carvo.backend.entity.Ride;
import com.carvo.backend.entity.User;
import com.carvo.backend.repository.RideRepository;
import com.carvo.backend.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class RideService {

    private final RideRepository rideRepository;
    private final UserRepository userRepository;

    public RideService(
            RideRepository rideRepository,
            UserRepository userRepository) {
        this.rideRepository = rideRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public Ride createRide(
            CreateRideRequest request,
            String authenticatedEmail) {

        User driver = userRepository.findByEmail(authenticatedEmail)
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Authenticated user not found"));

        if (request.getOrigin().trim()
                .equalsIgnoreCase(request.getDestination().trim())) {
            throw new IllegalArgumentException(
                    "Origin and destination must be different");
        }

        Ride ride = new Ride();
        ride.setDriver(driver);
        ride.setOrigin(request.getOrigin().trim());
        ride.setDestination(request.getDestination().trim());
        ride.setDepartureTime(request.getDepartureTime());
        ride.setAvailableSeats(request.getAvailableSeats());
        ride.setPricePerSeat(request.getPricePerSeat());

        return rideRepository.save(ride);
    }

    @Transactional(readOnly = true)
    public List<Ride> getAvailableRides() {
        return rideRepository
                .findByDepartureTimeAfterAndAvailableSeatsGreaterThanOrderByDepartureTimeAsc(
                        LocalDateTime.now(),
                        0
                );
    }

    @Transactional(readOnly = true)
    public List<Ride> searchRides(String origin, String destination) {

        if (origin == null || origin.isBlank()
                || destination == null || destination.isBlank()) {
            throw new IllegalArgumentException(
                    "Origin and destination are required");
        }

        if (origin.trim().equalsIgnoreCase(destination.trim())) {
            throw new IllegalArgumentException(
                    "Origin and destination must be different");
        }

        return rideRepository
                .findByOriginIgnoreCaseAndDestinationIgnoreCaseAndDepartureTimeAfterAndAvailableSeatsGreaterThanOrderByDepartureTimeAsc(
                        origin.trim(),
                        destination.trim(),
                        LocalDateTime.now(),
                        0
                );
    }

    @Transactional(readOnly = true)
    public List<Ride> getMyRides(String authenticatedEmail) {
        return rideRepository
                .findByDriver_EmailIgnoreCaseOrderByDepartureTimeAsc(
                        authenticatedEmail
                );
    }

}
