import { useState, useEffect } from 'react';
import { Search, Plus, AlertCircle, Clock, CheckCircle, XCircle, LogOut, User, TrendingUp } from 'lucide-react';
import './Dashboard.css'; // Import your custom CSS file

export default function Dashboard() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    setUser(userData);
    fetchTickets();
  }, [filter]);

  const fetchTickets = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:4000/api/tickets?status=${filter !== 'all' ? filter : ''}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await response.json();
      setTickets(data || []);
    } catch (error) {
      console.error('Failed to fetch tickets:', error);
      setTickets([
        { id:1,title:'Server Down',description:'Main website not loading',status:'open',priority:'high',assigned_to:'Agent A',agent_name:'Agent A',comments_count:2,created_at:new Date(),deadline:new Date(new Date().getTime()+2*24*60*60*1000) },
        { id:2,title:'Login issue',description:'Cannot login to admin panel',status:'in-progress',priority:'medium',assigned_to:'Agent B',agent_name:'Agent B',comments_count:1,created_at:new Date(),deadline:new Date(new Date().getTime()+1*24*60*60*1000) }
      ]);
    } finally { setLoading(false); }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  const getStatusColor = (status) => {
    const colors = {
      open:'bg-blue-500/20 text-blue-300 border-blue-500/50',
      'in-progress':'bg-yellow-500/20 text-yellow-300 border-yellow-500/50',
      resolved:'bg-green-500/20 text-green-300 border-green-500/50',
      closed:'bg-gray-500/20 text-gray-300 border-gray-500/50'
    };
    return colors[status] || colors.open;
  };

  const getPriorityColor = (priority) => {
    const colors = {
      low:'text-green-400', medium:'text-yellow-400', high:'text-orange-400', urgent:'text-red-400'
    };
    return colors[priority] || colors.low;
  };

  const isSLABreached = (deadline) => new Date(deadline) < new Date();

  const filteredTickets = tickets.filter(ticket =>
    ticket.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ticket.id?.toString().includes(searchTerm)
  );

  return (
    <div className="min-h-screen dashboard-bg grid-pattern">
      {/* Background Blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="blob-purple"></div>
        <div className="blob-pink"></div>
        <div className="blob-blue"></div>
      </div>

      {/* Header */}
      <div className="header-card">
        <div className="header-content">
          <div className="logo-section">
            <div className="logo-icon">🎫</div>
            <div>
              <h1 className="title">
                HelpDesk Mini <TrendingUp className="trending-icon" />
              </h1>
              <p className="subtitle">Ticket Management Dashboard</p>
            </div>
          </div>

          <div className="user-section">
            <div className="user-info">
              <div className="user-icon"><User className="w-5 h-5 text-white" /></div>
              <div>
                <p className="user-name">{user?.name || 'Guest'}</p>
                <span className="role-badge">{user?.role || 'user'}</span>
              </div>
            </div>
            <button onClick={handleLogout} className="logout-btn">
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </div>
        </div>
      </div>

      <div className="content-wrapper">
        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card">
            <div>
              <p>Total Tickets</p>
              <p>{tickets.length}</p>
            </div>
            <div className="stat-icon"><AlertCircle /></div>
          </div>

          <div className="stat-card">
            <div>
              <p>SLA Breached</p>
              <p>{tickets.filter(t => isSLABreached(t.deadline)).length}</p>
            </div>
            <div className="stat-icon"><XCircle /></div>
          </div>

          <div className="stat-card">
            <div>
              <p>In Progress</p>
              <p>{tickets.filter(t => t.status === 'in-progress').length}</p>
            </div>
            <div className="stat-icon"><Clock /></div>
          </div>

          <div className="stat-card">
            <div>
              <p>Resolved</p>
              <p>{tickets.filter(t => t.status === 'resolved').length}</p>
            </div>
            <div className="stat-icon"><CheckCircle /></div>
          </div>
        </div>

        {/* Filters & Search */}
        <div className="filter-search">
          <div className="filter-buttons">
            {['all','open','in-progress','resolved','closed'].map(status => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`filter-btn ${filter===status?'active':''}`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1).replace('-',' ')}
              </button>
            ))}
          </div>

          <div className="search-newticket">
            <div className="search-wrapper">
              <Search className="search-icon" />
              <input
                type="text"
                value={searchTerm}
                onChange={e=>setSearchTerm(e.target.value)}
                placeholder="Search tickets..."
                className="search-input"
              />
            </div>
            {(user?.role==='admin' || user?.role==='agent') && (
              <button onClick={()=>window.location.href='/create-ticket'} className="new-ticket-btn">
                <Plus /> New Ticket
              </button>
            )}
          </div>
        </div>

        {/* Tickets List */}
        {loading ? (
          <div className="loading-state">
            <div className="loading-spinner"></div>
            <p>Loading tickets...</p>
          </div>
        ) : filteredTickets.length===0 ? (
          <div className="empty-state">
            <AlertCircle className="empty-icon" />
            <h3>No Tickets Found</h3>
            <p>Try adjusting your filters or create a new ticket</p>
            {(user?.role==='admin'||user?.role==='agent') && (
              <button onClick={()=>window.location.href='/create-ticket'} className="new-ticket-btn">Create Your First Ticket</button>
            )}
          </div>
        ) : (
          <div className="tickets-grid">
            {filteredTickets.map((ticket)=>(
              <div key={ticket.id} className="ticket-card" onClick={()=>window.location.href=`/ticket/${ticket.id}`}>
                <div className="ticket-left">
                  <div className="ticket-tags">
                    <span>#{ticket.id}</span>
                    <span className={getStatusColor(ticket.status)}>{ticket.status.toUpperCase()}</span>
                    {isSLABreached(ticket.deadline) && <span className="sla-breach-badge"><AlertCircle /> SLA BREACHED</span>}
                  </div>
                  <h3 className="ticket-title">{ticket.title}</h3>
                  <p className="ticket-desc">{ticket.description}</p>
                  <div className="ticket-meta">
                    <span className={getPriorityColor(ticket.priority)}>{ticket.priority.toUpperCase()} PRIORITY</span>
                    <span><Clock /> Created: {new Date(ticket.created_at).toLocaleDateString()}</span>
                    <span><AlertCircle /> Due: {new Date(ticket.deadline).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="ticket-right">
                  {ticket.assigned_to && (
                    <div className="assigned-card">
                      <p>Assigned to</p>
                      <p>{ticket.agent_name || 'Agent'}</p>
                    </div>
                  )}
                  <div className="comments-card">
                    <p>Comments</p>
                    <p>{ticket.comments_count || 0}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
