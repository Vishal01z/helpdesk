// D:\Web Development\helpdesk\helpdesk-frontend\src\pages\CreateTicket.jsx
import { useState } from "react";
import { Ticket, User, Clock, AlertCircle, Send, Search, MessageSquare } from "lucide-react";
import "./CreateTicket.css";

export default function CreateTicket() {
  const [ticketData, setTicketData] = useState({
    title: "",
    description: "",
    priority: "medium",
    assignee: "",
    slaHours: 24,
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:3000/api/tickets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(ticketData),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Ticket submitted successfully!");
        setTicketData({
          title: "",
          description: "",
          priority: "medium",
          assignee: "",
          slaHours: 24,
        });
        console.log("Saved ticket:", data);
      } else {
        alert(data.message || "Failed to save ticket!");
      }
    } catch (err) {
      console.error(err);
      alert("Server error! Make sure backend is running on port 3000.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-ticket-page">
      <div className="page-header">
        <div className="header-content">
          <div className="logo-section">
            <div className="logo-icon">🎫</div>
            <div>
              <h1 className="header-title">HelpDesk Mini</h1>
              <p className="header-subtitle">
                Tickets + SLA + Comments | Create & manage tickets efficiently
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="content-wrapper">
        <div className="form-card">
          <div className="card-header">
            <Ticket className="header-icon" />
            <h2 className="card-title">Create New Ticket</h2>
          </div>

          <form className="ticket-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">
                <Ticket size={16} /> Ticket Title
              </label>
              <input
                type="text"
                value={ticketData.title}
                onChange={(e) =>
                  setTicketData({ ...ticketData, title: e.target.value })
                }
                placeholder="Enter a clear and concise title"
                required
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                <MessageSquare size={16} /> Description
              </label>
              <textarea
                value={ticketData.description}
                onChange={(e) =>
                  setTicketData({ ...ticketData, description: e.target.value })
                }
                placeholder="Describe the issue in detail..."
                required
                className="form-textarea"
              />
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">
                  <AlertCircle size={16} /> Priority
                </label>
                <select
                  value={ticketData.priority}
                  onChange={(e) =>
                    setTicketData({ ...ticketData, priority: e.target.value })
                  }
                  className="form-select"
                >
                  <option value="low">🟢 Low</option>
                  <option value="medium">🟡 Medium</option>
                  <option value="high">🟠 High</option>
                  <option value="urgent">🔴 Urgent</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">
                  <User size={16} /> Assignee
                </label>
                <input
                  type="text"
                  value={ticketData.assignee}
                  onChange={(e) =>
                    setTicketData({ ...ticketData, assignee: e.target.value })
                  }
                  placeholder="Assign to agent"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  <Clock size={16} /> SLA (hours)
                </label>
                <input
                  type="number"
                  value={ticketData.slaHours}
                  onChange={(e) =>
                    setTicketData({ ...ticketData, slaHours: e.target.value })
                  }
                  min={1}
                  className="form-input"
                />
              </div>
            </div>

            <button type="submit" disabled={loading} className="submit-button">
              <Send size={18} /> {loading ? "Saving..." : "Create Ticket"}
            </button>
          </form>
        </div>

        <div className="comments-card">
          <div className="card-header">
            <Search className="header-icon" />
            <h3 className="card-title">Ticket Comments & Search</h3>
          </div>

          <div className="search-wrapper">
            <Search className="search-icon" size={18} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tickets or comments..."
              className="search-input"
            />
          </div>

          <div className="comments-placeholder">
            <MessageSquare size={48} className="placeholder-icon" />
            <p className="placeholder-text">No comments yet</p>
            <p className="placeholder-subtext">
              This area will display threaded comments once tickets are created
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
