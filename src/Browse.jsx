import React, { useEffect, useState } from "react";
import ItemCard from "./components/home/ItemCard";
import "./Browse.css";

import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";

const Browse = () => {
  const [items, setItems] = useState([]);

  const getItems = async () => {
    try {
      const snapshot = await getDocs(collection(db, "posts"));

      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setItems(data);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getItems();
  }, []);

  return (
    <div className="browse-page">
      <div className="browse-container">
        <h2>Browse Items</h2>

        <div className="features-grid">
          {items.map((item) => (
            <ItemCard key={item.id} post={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Browse;