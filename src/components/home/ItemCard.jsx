import "./ItemCard.css";
import { MapPin, Tag } from "lucide-react";

export default function ItemCard({ item }) {
    return (
      <div className="item-card">
  
        {/* top row */}
        <div className="item-card-top">
          <span className={`badge ${item.status}`}>
            {item.status}
          </span>
  
          <span className="date">
            {item.date}
          </span>
        </div>
  
        {/* title */}
        <h3 className="item-title">{item.title}</h3>
  
        {/* description */}
        <p className="item-desc">{item.description}</p>
  
        {/* meta info */}
        <div className="item-meta">
          <div className="meta-row">
            <MapPin style={{ color: "red" }} size={14}/> <span>{item.location}</span>
          </div>
  
          <div className="meta-row">
            <Tag style={{ color: "orange" }} size={14} /> <span>{item.category}</span>
          </div>
        </div>
  
        {/* action */}
        <div className="item-footer">
          <button className="contact-btn">
            Contact about this item →
          </button>
        </div>
  
      </div>
    );
  }