import React from "react";
import ItemCard from "./components/home/ItemCard";
import "./Browse.css";

const Browse = () => {
  const items = [
    {
      id: 1,
      type: "lost",
      name: "Black Backpack",
      location: "WSU Library",
      description: "Left in study area around 3 PM. Has laptop inside.",
      category: "Electronics",
      date: "Apr 18, 2026",
    },
    {
      id: 2,
      type: "found",
      name: "AirPods Case",
      location: "Student Center",
      description: "Found near seating area, turned into front desk.",
      category: "Accessories",
      date: "Apr 17, 2026",
    },
    {
      id: 3,
      type: "lost",
      name: "Car Keys",
      location: "Parking Garage A",
      description: "Lost near level 2 entrance ramp.",
      category: "Keys",
      date: "Apr 16, 2026",
    },
  ];

  return (
    <div className="browse-page">
      <div className="browse-container">
        <h2>Browse Items</h2>

        <div className="features-grid">
          {items.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Browse;