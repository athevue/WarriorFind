import "./ItemCard.css";
import { MapPin, Tag } from "lucide-react";
import ImageCarousel from "../imageCarousel";

export default function ItemCard({ post }) {
  return (
    <div className="item-card">

      {/* top row */}
      <div className="item-card-top">
        <span className={`badge ${post.status || "lost"}`}>
          {post.status || "lost"}
        </span>

        <span className="date">
          {post.created_at
            ? new Date(post.created_at).toLocaleDateString()
            : "No date"}
        </span>
      </div>

      {/* title */}
      <h3 className="item-title">{post.item}</h3>

      {/* images */}
      <ImageCarousel urls={post.image_urls || []} />

      {/* description */}
      <p className="item-desc">{post.caption}</p>

      {/* meta */}
      <div className="item-meta">
        <div className="meta-row">
          <MapPin size={14} />
          <span>{post.location}</span>
        </div>

        <div className="meta-row">
          <Tag size={14} />
          <span>{post.category || "General"}</span>
        </div>
      </div>

      <div className="item-footer">
        <button className="contact-btn">
          Contact about this item →
        </button>
      </div>
    </div>
  );
}