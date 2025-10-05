import { useEffect, useState } from "react";

export default function Comments({ ticketId }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  // Fetch comments
  useEffect(() => {
    fetch(`http://localhost:3000/api/comments/ticket/${ticketId}`)
      .then(res => res.json())
      .then(setComments);
  }, [ticketId]);

  // Add comment
  const handleAddComment = async () => {
    if (!newComment) return;

    const token = localStorage.getItem("token");

    const res = await fetch(`http://localhost:3000/api/comments/ticket/${ticketId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ text: newComment })
    });

    const comment = await res.json();
    setComments([...comments, comment]);
    setNewComment("");
  };

  return (
    <div>
      <h3>Comments</h3>
      <div>
        {comments.map(c => (
          <div key={c.id} style={{ borderBottom: "1px solid #ccc", marginBottom: 4, padding: 2 }}>
            <b>{c.userId}</b>: {c.text}
          </div>
        ))}
      </div>

      <textarea
        value={newComment}
        onChange={e => setNewComment(e.target.value)}
        placeholder="Add a comment..."
      />
      <button onClick={handleAddComment}>Add Comment</button>
    </div>
  );
}
