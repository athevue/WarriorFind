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

  const handleFilter = (searchValue = search) => {    
    //set filter and search values
    //setDates();
    const searchText = searchValue;//document.getElementById("search").value;
    setSearch(searchText);

    const start = document.getElementById("start-date").valueAsDate || startDate;
    const end = document.getElementById("end-date").valueAsDate || endDate;

    end.setHours(23, 59,59,999);

    setStartDate(start);
    setEndDate(end);

    //filter by date
    //let filtered = items.filter((item) => new Date(item.created_at) >= start && new Date(item.created_at) <= end);
    let filtered = items.filter((item) => {
      const itemDate = new Date(item.created_at);
      return itemDate >= start && itemDate <= end;
    });
    // if the user also wants to search by item name, filter the items again, this time by item name
    if (searchText) {
      filtered = filtered.filter((item) => item.item.toLowerCase().includes(searchText.toLowerCase()));
    }

    setFilteredItems(filtered);
  }

  useEffect(() => {
    getItems();
    //setDates();
  }, []);

  return (
    <div className="browse-page">
      <div className="browse-container">
        <div className="browse-header">
          <h2>Browse Items</h2>
          <div className="browse-search-container">
            {/* search by item name */}
            <div className="browse-search-wrapper">
            <input id="search" type="text" placeholder="Search items by name" value={search} onChange={(e) =>handleFilter(e.target.value)} />
            {(search || startDate.getTime() !== new Date("2026-01-01").getTime() || endDate.toDateString() !== new Date().toDateString()) &&  (
              <button
                type="button"
                className="browse-clear-button"
                onClick={() => {
                  const defaultStart = new Date("2026-01-01");
                  const defaultEnd = new Date();

                  document.getElementById("start-date").valueAsDate = defaultStart;
                  document.getElementById("end-date").valueAsDate = defaultEnd;

                  setStartDate(defaultStart);
                  setEndDate(defaultEnd);

                  handleFilter("");
                }}
              >
                x
              </button>
            )}
            </div>

            {/* filter by date */}
            <div className="browse-date-container">
              <input id="start-date" type="date" defaultValue={startDate} onChange={(e) => handleFilter(document.getElementById("search").value)} />
              <label className="browse-label">Start Date</label>
            </div>
            <div className="browse-date-container">
              <input id="end-date" type="date" defaultValue={endDate} onChange={(e) => handleFilter(document.getElementById("search").value)} />
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