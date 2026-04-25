import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import ItemCard from "./ItemCard";
import "./RecentActivities.css";

import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { db } from "../../firebase";

export default function RecentActivities() {
  const [items, setItems] = useState([]);

  const getRecentItems = async () => {
    try {
      // get newest posts first, limit to 4 (or whatever you want)
      const q = query(
        collection(db, "posts"),
        orderBy("created_at", "desc"),
        limit(3)
      );

      const snapshot = await getDocs(q);

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
    getRecentItems();
  }, []);

  return (
    <section className="recent-section">
        
      <div className="recent-header">
        <h2>Recent Items</h2>
        <Link to="/Browse" className="view-all-btn">
          View All →
        </Link>
      </div>

      <div className="recent-grid">
        {items.map((item) => (
          <ItemCard key={item.id} post={item} />
        ))}
      </div>
    </section>
  );
}