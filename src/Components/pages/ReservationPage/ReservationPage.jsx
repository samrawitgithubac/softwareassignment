import React, { useState } from "react";

const ReservationForm = () => {
  const [reservation, setReservation] = useState({
    date: "",
    time: "",
    availability: "",
    table: "",
  });

  const [customer, setCustomer] = useState({
    fullName: "",
    phoneNumber: "",
    numberOfGuests: "",
  });

  const handleReservationChange = (e) => {
    const { name, value } = e.target;
    setReservation({
      ...reservation,
      [name]: value,
    });
  };

  const handleCustomerChange = (e) => {
    const { name, value } = e.target;
    setCustomer({
      ...customer,
      [name]: value,
    });
  };

  const handleReservationSubmit = (e) => {
    e.preventDefault();
    if (
      !reservation.date ||
      !reservation.time ||
      !reservation.availability ||
      !reservation.table
    ) {
      alert("Please fill in all reservation fields.");
      return;
    }

    // Here you can add actions to perform when the reservation is submitted
    console.log("Reservation Details:", reservation);
    // Simulate a server call or another action
    alert(
      `Reservation made for ${reservation.date} at ${reservation.time}.\nAvailability: ${reservation.availability}\nTable: ${reservation.table}`
    );

    // Reset reservation fields after submission
    setReservation({
      date: "",
      time: "",
      availability: "",
      table: "",
    });
  };

  const handleCustomerSubmit = (e) => {
    e.preventDefault();
    if (
      !customer.fullName ||
      !customer.phoneNumber ||
      !customer.numberOfGuests
    ) {
      alert("Please fill in all customer detail fields.");
      return;
    }
    alert(
      `Customer Details:\nName: ${customer.fullName}\nPhone: ${customer.phoneNumber}\nGuests: ${customer.numberOfGuests}`
    );

    // Reset customer fields after submission
    setCustomer({
      fullName: "",
      phoneNumber: "",
      numberOfGuests: "",
    });
  };

  return (
    <div className="container">
      <h1>Make Reservation</h1>
      <form className="reservation-form" onSubmit={handleReservationSubmit}>
        <input
          type="date"
          name="date"
          placeholder="Select Date"
          value={reservation.date}
          onChange={handleReservationChange}
        />
        <input
          type="time"
          name="time"
          placeholder="Selected Time"
          value={reservation.time}
          onChange={handleReservationChange}
        />
        <input
          type="text"
          name="availability"
          placeholder="Check Availability"
          value={reservation.availability}
          onChange={handleReservationChange}
        />
        <input
          type="text"
          name="table"
          placeholder="Existing Table"
          value={reservation.table}
          onChange={handleReservationChange}
        />
        <button type="submit" className="btn">
          Reserve Now
        </button>
      </form>

      <h1>Reserve Now</h1>
      <form className="customer-details" onSubmit={handleCustomerSubmit}>
        <h2>Customer Details</h2>
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={customer.fullName}
          onChange={handleCustomerChange}
        />
        <input
          type="tel"
          name="phoneNumber"
          placeholder="Phone Number"
          value={customer.phoneNumber}
          onChange={handleCustomerChange}
        />
        <input
          type="number"
          name="numberOfGuests"
          placeholder="Number of Guests"
          value={customer.numberOfGuests}
          min="1"
          onChange={handleCustomerChange}
        />
        <button type="submit" className="btn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ReservationForm;
