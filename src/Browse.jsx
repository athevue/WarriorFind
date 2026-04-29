import React, { useEffect, useState } from "react";
import ItemCard from "./components/home/ItemCard";
import "./Browse.css";

import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";

const Browse = () => {
  const today = new Date();
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState(new Date("2026-01-01")); // start date jan 01 2026
  const [endDate, setEndDate] = useState(today);

  const getItems = async () => {
    try {
      const snapshot = await getDocs(collection(db, "posts"));

      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setItems(data);
      setFilteredItems(data);
    } catch (err) {
      console.log(err.message);
    }
  };

  const setDates = () => {
    const startDateInput = document.getElementById("start-date");
    const endDateInput = document.getElementById("end-date");

    setStartDate(startDateInput.valueAsDate);
    setEndDate(endDateInput.valueAsDate);

    startDateInput.valueAsDate = startDate;
    endDateInput.valueAsDate = endDate;
  }

  const handleFilter = () => {    
    //set filter and search values
    setDates();
    const searchText = document.getElementById("search").value;
    setSearch(searchText);

    //filter by date
    let filtered = items.filter((item) => new Date(item.created_at) >= startDate && new Date(item.created_at) <= endDate);

    // if the user also wants to search by item name, filter the items again, this time by item name
    if (search) {
      filtered = filtered.filter((item) => item.item.toLowerCase().includes(search.toLowerCase()));
    }

    setFilteredItems(filtered);
  }

  useEffect(() => {
    getItems();
    setDates();
  }, []);

  return (
    <div className="browse-page">
      <div className="browse-container">
        <div className="browse-header">
          <h2>Browse Items</h2>
          <div className="browse-search-container">
            {/* search by item name */}
            <input id="search" type="text" placeholder="Search items by name" value={search} onChange={handleFilter} />

            {/* filter by date */}
            <div className="browse-date-container">
              <input id="start-date" type="date" defaultValue={startDate} onChange={handleFilter} />
              <label className="browse-label">Start Date</label>
            </div>
            <div className="browse-date-container">
              <input id="end-date" type="date" defaultValue={endDate} onChange={handleFilter} />
              <label className="browse-label">End Date</label>
            </div>
          </div>
        </div>

        <div className="features-grid">
          {filteredItems.map((item) => (
            <ItemCard key={item.id} post={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Browse;