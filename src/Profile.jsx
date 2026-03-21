import "./Profile.css";
import { useState } from "react";
import { getBadges } from "./BadgeSystem";

function Profile() {
  const [points] = useState(20); // fake data for now

  const badges = getBadges(points);

  return (
    <div>
      <h1>User Profile</h1>

      <p><strong>Points:</strong> {points}</p>

      <h2>Badges</h2>

      {badges.length === 0 ? (
        <p>No badges yet.</p>
      ) : (
        <ul>
          {badges.map((badge, index) => (
            <li key={index}>{badge}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Profile;