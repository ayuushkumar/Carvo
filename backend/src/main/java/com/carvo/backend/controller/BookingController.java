package com.carvo.backend.controller;

import com.carvo.backend.dto.CreateBookingRequest;
import com.carvo.backend.entity.Booking;
import com.carvo.backend.service.BookingService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedHashMap;
import java.util.Map;
import java.util.List;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    private final BookingService bookingService;

    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Map<String, Object> createBooking(
            @Valid @RequestBody CreateBookingRequest request,
            Authentication authentication) {

        Booking booking = bookingService.createBooking(
                request.getRideId(),
                request.getSeatsRequested(),
                authentication.getName()
        );

        Map<String, Object> response = new LinkedHashMap<>();
        response.put("message", "Booking created successfully");
        response.put("bookingId", booking.getId());
        response.put("rideId", booking.getRide().getId());
        response.put("passengerId", booking.getPassenger().getId());
        response.put("seatsBooked", booking.getSeatsBooked());
        response.put("status", booking.getStatus());
        response.put("createdAt", booking.getCreatedAt());

        return response;
    }

    @GetMapping("/my-bookings")
    public List<Map<String, Object>> getMyBookings(
            Authentication authentication) {

        return bookingService.getMyBookings(authentication.getName())
                .stream()
                .map(booking -> {
                    Map<String, Object> response = new LinkedHashMap<>();

                    response.put("bookingId", booking.getId());
                    response.put("rideId", booking.getRide().getId());
                    response.put("origin", booking.getRide().getOrigin());
                    response.put("destination", booking.getRide().getDestination());
                    response.put("departureTime", booking.getRide().getDepartureTime());
                    response.put("seatsBooked", booking.getSeatsBooked());
                    response.put("status", booking.getStatus());
                    response.put("createdAt", booking.getCreatedAt());

                    return response;
                })
                .toList();
    }

}

