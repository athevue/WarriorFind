import "./Features.css";
import { Search, Shield, Bell } from "lucide-react";

export default function Features() {
  const features = [
    {
      icon: Search,
      title: "Search & Browse",
      desc: "Quickly find your lost items by searching our community database.",
    },
    {
      icon: Shield,
      title: "Safe & Secure",
      desc: "Contact item finders securely through your WSU email.",
    },
    {
      icon: Bell,
      title: "Stay Updated",
      desc: "Report items and help fellow Warriors reunite with their belongings.",
    }
  ];

  return (
    <section className="features-section">
      <div className="features-container">
        
        <div className="features-grid">
          {features.map((f, i) => (
            <div key={i} className="feature-card">
              <div className="icon-box">
                <f.icon size={24} />
              </div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}