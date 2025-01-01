import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./TodaysMenu.css";

const TodaysMenu = () => {
  const [id, setId] = useState(null); // For editing an existing preference
  const [dietaryRestrictions, setDietaryRestrictions] = useState("");
  const [mealType, setMealType] = useState("breakfast");
  const [portionSize, setPortionSize] = useState(1);
  const [priceRange, setPriceRange] = useState("");
  const [preferences, setPreferences] = useState([]);
  const [message, setMessage] = useState("");

  // Fetch preferences on component load
  useEffect(() => {
    fetchPreferences();
  }, []);

  const fetchPreferences = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/preferences");
      const data = await response.json();
      if (response.ok) {
        setPreferences(data);
      } else {
        setMessage("Failed to fetch preferences.");
      }
    } catch (error) {
      console.error("Error fetching preferences:", error);
      setMessage("An error occurred while fetching preferences.");
    }
  };

  const handleSubmit = async () => {
    if (!dietaryRestrictions || !mealType || !portionSize || !priceRange) {
      setMessage("All fields are required.");
      return;
    }

    try {
      const url = id
        ? `http://localhost:3001/api/preferences/${id}`
        : "http://localhost:3001/api/preferences";
      const method = id ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          dietary_restrictions: dietaryRestrictions,
          meal_type: mealType,
          portion_size: portionSize,
          price_range: priceRange,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage(data.message || "Preference saved successfully!");
        fetchPreferences();
        resetForm();
      } else {
        setMessage(data.error || "Error saving preference.");
      }
    } catch (error) {
      console.error("Error saving preference:", error);
      setMessage("An error occurred while saving preference.");
    }
  };

  const handleEdit = (preference) => {
    setId(preference.id);
    setDietaryRestrictions(preference.dietary_restrictions);
    setMealType(preference.meal_type);
    setPortionSize(preference.portion_size);
    setPriceRange(preference.price_range);
  };

  const handleDelete = async (preferenceId) => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/preferences/${preferenceId}`,
        { method: "DELETE" }
      );
      const data = await response.json();
      if (response.ok) {
        setMessage(data.message || "Preference deleted successfully!");
        fetchPreferences();
      } else {
        setMessage(data.error || "Error deleting preference.");
      }
    } catch (error) {
      console.error("Error deleting preference:", error);
      setMessage("An error occurred while deleting preference.");
    }
  };

  const resetForm = () => {
    setId(null);
    setDietaryRestrictions("");
    setMealType("breakfast");
    setPortionSize(1);
    setPriceRange("");
  };

  return (
    <div className="container">
      <h1>Manage Preferences</h1>

      <div className="form">
        <label htmlFor="dietaryRestrictions">Dietary Restrictions:</label>
        <input
          type="text"
          id="dietaryRestrictions"
          value={dietaryRestrictions}
          onChange={(e) => setDietaryRestrictions(e.target.value)}
        />

        <label htmlFor="mealType">Meal Type:</label>
        <select
          id="mealType"
          value={mealType}
          onChange={(e) => setMealType(e.target.value)}
        >
          <option value="breakfast">Breakfast</option>
          <option value="lunch">Lunch</option>
          <option value="dinner">Dinner</option>
        </select>

        <label htmlFor="portionSize">Portion Size:</label>
        <input
          type="number"
          id="portionSize"
          min="1"
          value={portionSize}
          onChange={(e) => setPortionSize(e.target.value)}
        />

        <label htmlFor="priceRange">Price Range:</label>
        <input
          type="text"
          id="priceRange"
          placeholder="e.g. 10-20"
          value={priceRange}
          onChange={(e) => setPriceRange(e.target.value)}
        />

        <button onClick={handleSubmit}>
          {id ? "Update Preference" : "Add Preference"}
        </button>
        {message && <p className="message">{message}</p>}
      </div>

      <h2>Preferences List</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Dietary Restrictions</th>
            <th>Meal Type</th>
            <th>Portion Size</th>
            <th>Price Range</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {preferences.map((preference) => (
            <tr key={preference.id}>
              <td>{preference.id}</td>
              <td>{preference.dietary_restrictions}</td>
              <td>{preference.meal_type}</td>
              <td>{preference.portion_size}</td>
              <td>{preference.price_range}</td>
              <td>
                <button onClick={() => handleEdit(preference)}>Edit</button>
                <button onClick={() => handleDelete(preference.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TodaysMenu;
