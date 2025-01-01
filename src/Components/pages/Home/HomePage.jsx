import React from "react";
import "./HomePage.css";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="page-container">
      <div className="container">
        <h1>Welcome to Tobiyaw Restaurant</h1>
        <h2>Home Page</h2>
        <div className="button-container">
          {/* Added Link to TodaysMenu Page */}
          <Link to="/todaysmenu">
            <button className="menu-button">Today's Menu</button>
          </Link>
          <Link to="/reservation">
            <button className="reservation-button">Make a Reservation</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
