import "./ItemCard.css";
import { useState } from "react";
import { MapPin, Tag } from "lucide-react";
import ImageCarousel from "../imageCarousel";
import { auth, db } from "../../firebase";
import { doc, updateDoc, arrayUnion, getDoc } from "firebase/firestore";

export default function ItemCard({ post }) {
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState(post.comments || []);

  const addComment = async () => {
    if (!commentText.trim()) return;

    let userName = "Anonymous";

    try {
      const userDoc = await getDoc(doc(db, "users", auth.currentUser.uid));

      if (userDoc.exists()) {
        const data = userDoc.data();
        userName = data.firstName || "User"; // FIRST NAME ONLY
      }
    } catch (err) {
      console.log(err.message);
    }

    const newComment = {
      text: commentText,
      user: userName,
      created_at: Date.now()
    };

    try {
      await updateDoc(doc(db, "posts", post.id), {
        comments: arrayUnion(newComment)
      });

      setComments([...comments, newComment]);
      setCommentText("");
    } catch (err) {
      console.log(err.message);
    }
  };

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

      {/* COMMENTS SECTION */}
      <div className="comments-section">
        <h4>Comments</h4>

        {comments.length === 0 ? (
          <p className="no-comments">No comments yet.</p>
        ) : (
          comments.map((comment, index) => (
            <div className="comment" key={index}>
              <strong>{comment.user}</strong>
              <p>{comment.text}</p>
            </div>
          ))
        )}

        <div className="comment-form">
          <input
            type="text"
            placeholder="Add a comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
          <button type="button" onClick={addComment}>
            Post
          </button>
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