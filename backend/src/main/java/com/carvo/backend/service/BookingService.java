package com.carvo.backend.service;

import com.carvo.backend.entity.Booking;
import com.carvo.backend.entity.Ride;
import com.carvo.backend.entity.User;
import com.carvo.backend.repository.BookingRepository;
import com.carvo.backend.repository.RideRepository;
import com.carvo.backend.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class BookingService {

    private final BookingRepository bookingRepository;
    private final RideRepository rideRepository;
    private final UserRepository userRepository;

    public BookingService(
            BookingRepository bookingRepository,
            RideRepository rideRepository,
            UserRepository userRepository) {
        this.bookingRepository = bookingRepository;
        this.rideRepository = rideRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public Booking createBooking(
            Long rideId,
            Integer seatsRequested,
            String authenticatedEmail) {

        if (seatsRequested == null || seatsRequested < 1) {
            throw new IllegalArgumentException(
                    "You must book at least one seat");
        }

        User passenger = userRepository.findByEmail(authenticatedEmail)
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Authenticated user not found"));

        Ride ride = rideRepository.findByIdForUpdate(rideId)
                .orElseThrow(() ->
                        new IllegalArgumentException("Ride not found"));

        if (ride.getDepartureTime().isBefore(
                java.time.LocalDateTime.now())) {
            throw new IllegalArgumentException(
                    "Cannot book a ride that has already departed");
        }

        if (ride.getDriver().getId().equals(passenger.getId())) {
            throw new IllegalArgumentException(
                    "You cannot book your own ride");
        }

        if (ride.getAvailableSeats() < seatsRequested) {
            throw new IllegalArgumentException(
                    "Not enough available seats");
        }

        ride.setAvailableSeats(
                ride.getAvailableSeats() - seatsRequested);

        Booking booking = new Booking();
        booking.setRide(ride);
        booking.setPassenger(passenger);
        booking.setSeatsBooked(seatsRequested);
        booking.setStatus("CONFIRMED");

        return bookingRepository.save(booking);
    }

    @Transactional(readOnly = true)
    public java.util.List<Booking> getMyBookings(String authenticatedEmail) {
        return bookingRepository
                .findByPassenger_EmailIgnoreCaseOrderByCreatedAtDesc(
                        authenticatedEmail
                );
    }

}
