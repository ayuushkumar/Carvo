package com.carvo.backend.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class CreateRideRequest {

    @NotBlank(message = "Origin is required")
    @Size(max = 150, message = "Origin cannot exceed 150 characters")
    private String origin;

    @NotBlank(message = "Destination is required")
    @Size(max = 150, message = "Destination cannot exceed 150 characters")
    private String destination;

    @NotNull(message = "Departure time is required")
    @Future(message = "Departure time must be in the future")
    private LocalDateTime departureTime;

    @NotNull(message = "Available seats are required")
    @Min(value = 1, message = "At least 1 seat must be available")
    @Max(value = 8, message = "Available seats cannot exceed 8")
    private Integer availableSeats;

    @NotNull(message = "Price per seat is required")
    @DecimalMin(value = "0.0", inclusive = true,
            message = "Price cannot be negative")
    private BigDecimal pricePerSeat;

    public CreateRideRequest() {
    }

    public String getOrigin() {
        return origin;
    }

    public void setOrigin(String origin) {
        this.origin = origin;
    }

    public String getDestination() {
        return destination;
    }

    public void setDestination(String destination) {
        this.destination = destination;
    }

    public LocalDateTime getDepartureTime() {
        return departureTime;
    }

    public void setDepartureTime(LocalDateTime departureTime) {
        this.departureTime = departureTime;
    }

    public Integer getAvailableSeats() {
        return availableSeats;
    }

    public void setAvailableSeats(Integer availableSeats) {
        this.availableSeats = availableSeats;
    }

    public BigDecimal getPricePerSeat() {
        return pricePerSeat;
    }

    public void setPricePerSeat(BigDecimal pricePerSeat) {
        this.pricePerSeat = pricePerSeat;
    }
}
