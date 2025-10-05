import { AlertCircle, Clock, MessageSquare, User } from 'lucide-react';
import './TicketCard.css';

export default function TicketCard({ ticket, onClick }) {
  const getStatusClass = (status) => {
    const statusMap = {
      open: 'status-open',
      'in-progress': 'status-progress',
      resolved: 'status-resolved',
      closed: 'status-closed',
    };
    return statusMap[status] || 'status-open';
  };

  const getPriorityClass = (priority) => {
    const priorityMap = {
      low: 'priority-low',
      medium: 'priority-medium',
      high: 'priority-high',
      urgent: 'priority-urgent',
    };
    return priorityMap[priority] || 'priority-low';
  };

  const isSLABreached = () => {
    return new Date(ticket.deadline) < new Date();
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div 
      className={`ticket-card ${isSLABreached() ? 'sla-breached' : ''}`}
      onClick={onClick}
    >
      <div className="ticket-card-content">
        {/* Left Content */}
        <div className="ticket-left">
          {/* Header with ID and Status */}
          <div className="ticket-header">
            <span className="ticket-id">#{ticket.id}</span>
            <span className={`status-badge ${getStatusClass(ticket.status)}`}>
              {ticket.status.replace('-', ' ')}
            </span>
            {isSLABreached() && (
              <span className="sla-badge">
                <AlertCircle size={12} />
                SLA Breached
              </span>
            )}
          </div>

          {/* Title & Description */}
          <h3 className="ticket-title">{ticket.title}</h3>
          <p className="ticket-description">{ticket.description}</p>

          {/* Meta Info */}
          <div className="ticket-meta">
            <span className={`priority-indicator ${getPriorityClass(ticket.priority)}`}>
              <span className="priority-dot"></span>
              {ticket.priority} priority
            </span>
            <span className="meta-item">
              <Clock size={12} />
              Created: {formatDate(ticket.created_at)}
            </span>
            <span className="meta-item">
              <Clock size={12} />
              Due: {formatDate(ticket.deadline)}
            </span>
          </div>
        </div>

        {/* Right Content */}
        <div className="ticket-right">
          {ticket.assigned_to && (
            <div className="assigned-box">
              <User size={14} className="assigned-icon" />
              <div>
                <p className="assigned-label">Assigned to</p>
                <p className="assigned-name">{ticket.agent_name || 'Agent'}</p>
              </div>
            </div>
          )}
          <div className="comments-badge">
            <MessageSquare size={14} />
            <span>{ticket.comments_count || 0}</span>
          </div>
        </div>
      </div>
    </div>
  );
}