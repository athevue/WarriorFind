import ItemCard from "./ItemCard";
import "./RecentActivities.css";

export default function RecentActivities() {
  const items = [ // HARD-CODED DATA FOR DEMO PURPOSES
    {             // WILL BE REPLACED WITH API CALLS IN FUTURE
      id: 1,
      title: "Black North Face Backpack",
      description: "Lost my black backpack near the Student Center. Has a laptop and notebook inside.",
      location: "Student Center",
      category: "Bags",
      status: "lost",
      date: "2026-03-19",
    },
    {
      id: 2,
      title: "iPhone 16 Pro (Space Black)",
      description: "Found an iPhone on the 2nd floor of the Undergraduate Library. Has a green case.",
      location: "Undergraduate Library",
      category: "Electronics",
      status: "found",
      date: "2026-03-20",
    },
    {
      id: 3,
      title: "Gold Warrior Ring",
      description: "Found a gold class ring with WSU Warrior insignia near the Engineering building.",
      location: "Engineering Building",
      category: "Jewelry",
      status: "found",
      date: "2026-03-18",
    },
    {
        id: 3,
        title: "Gold Warrior Ring",
        description: "Found a gold class ring with WSU Warrior insignia near the Engineering building.",
        location: "Engineering Building",
        category: "Jewelry",
        status: "found",
        date: "2026-03-18",
      },
      {
        id: 3,
        title: "Gold Warrior Ring",
        description: "Found a gold class ring with WSU Warrior insignia near the Engineering building.",
        location: "Engineering Building",
        category: "Jewelry",
        status: "found",
        date: "2026-03-18",
      }
  ];

  return (
    <section className="recent-section">
      <h2>Recent Items</h2>

      <div className="recent-grid">
        {items.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}