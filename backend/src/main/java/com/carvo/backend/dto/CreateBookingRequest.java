package com.carvo.backend.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public class CreateBookingRequest {

    @NotNull(message = "Ride ID is required")
    @Min(value = 1, message = "Ride ID must be positive")
    private Long rideId;

    @NotNull(message = "Number of seats is required")
    @Min(value = 1, message = "You must book at least one seat")
    @Max(value = 8, message = "You cannot book more than 8 seats at once")
    private Integer seatsRequested;

    public CreateBookingRequest() {
    }

    public Long getRideId() {
        return rideId;
    }

    public void setRideId(Long rideId) {
        this.rideId = rideId;
    }

    public Integer getSeatsRequested() {
        return seatsRequested;
    }

    public void setSeatsRequested(Integer seatsRequested) {
        this.seatsRequested = seatsRequested;
    }
}
