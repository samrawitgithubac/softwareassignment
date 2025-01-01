import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Import your components/pages
import HomePage from "./Components/pages/Home/HomePage";
import TodaysMenu from "./Components/pages/TodaysMenu/TodaysMenu";
import OrderMenu from "./Components/pages/OrderMenu/OrderMenu";
import ReservationPage from "./Components/pages/ReservationPage/ReservationPage";
export default function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/TodaysMenu" element={<TodaysMenu />} />
          <Route path="/reservation" element={<ReservationPage />} />
        </Routes>
      </div>
    </Router>
  );
}
