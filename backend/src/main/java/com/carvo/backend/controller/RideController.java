package com.carvo.backend.controller;

import com.carvo.backend.dto.CreateRideRequest;
import com.carvo.backend.entity.Ride;
import com.carvo.backend.service.RideService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import java.util.List;

import java.util.LinkedHashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/rides")
public class RideController {

    private final RideService rideService;

    public RideController(RideService rideService) {
        this.rideService = rideService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Map<String, Object> createRide(
            @Valid @RequestBody CreateRideRequest request,
            Authentication authentication) {

        Ride ride = rideService.createRide(
                request, authentication.getName());

        Map<String, Object> response = new LinkedHashMap<>();
        response.put("message", "Ride created successfully");
        response.put("id", ride.getId());
        response.put("origin", ride.getOrigin());
        response.put("destination", ride.getDestination());
        response.put("departureTime", ride.getDepartureTime());
        response.put("availableSeats", ride.getAvailableSeats());
        response.put("pricePerSeat", ride.getPricePerSeat());
        response.put("driverId", ride.getDriver().getId());


        return response;
    }
    @GetMapping
    public List<Map<String, Object>> getAvailableRides() {
        return rideService.getAvailableRides()
                .stream()
                .map(ride -> {
                    Map<String, Object> response = new LinkedHashMap<>();
                    response.put("id", ride.getId());
                    response.put("origin", ride.getOrigin());
                    response.put("destination", ride.getDestination());
                    response.put("departureTime", ride.getDepartureTime());
                    response.put("availableSeats", ride.getAvailableSeats());
                    response.put("pricePerSeat", ride.getPricePerSeat());
                    response.put("driverId", ride.getDriver().getId());
                    response.put("driverName", ride.getDriver().getFullName());
                    return response;
                })
                .toList();
    }
}
