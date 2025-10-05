import { LogOut, User, Home } from 'lucide-react';

export default function Navbar({ user, showBackButton = false }) {
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  const getRoleBadgeStyle = (role) => {
    const styles = {
      admin: { backgroundColor: 'rgba(239, 68, 68, 0.2)', color: '#fca5a5' },
      agent: { backgroundColor: 'rgba(59, 130, 246, 0.2)', color: '#93c5fd' },
      user: { backgroundColor: 'rgba(34, 197, 94, 0.2)', color: '#bbf7d0' },
    };
    return styles[role] || styles.user;
  };

  return (
    <div
      style={{
        backgroundColor: 'rgba(0,0,0,0.2)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        position: 'sticky',
        top: 0,
        zIndex: 50,
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '16px 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {/* Left: Logo & Title */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {showBackButton && (
              <button
                onClick={() => (window.location.href = '/dashboard')}
                style={{
                  padding: '8px',
                  backgroundColor: 'rgba(255,255,255,0.05)',
                  borderRadius: '12px',
                  border: '1px solid rgba(255,255,255,0.1)',
                  cursor: 'pointer',
                }}
                title="Back to Dashboard"
              >
                <Home style={{ width: '20px', height: '20px', color: '#a78bfa' }} />
              </button>
            )}

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  background: 'linear-gradient(135deg, #a78bfa, #ec4899)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <span style={{ fontSize: '20px' }}>🎫</span>
              </div>
              <div>
                <h1 style={{ fontSize: '18px', fontWeight: '700', color: 'white', margin: 0 }}>
                  HelpDesk Mini
                </h1>
                <p style={{ fontSize: '12px', color: '#c4b5fd', margin: 0 }}>Ticket Management</p>
              </div>
            </div>
          </div>

          {/* Right: User Info & Logout */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '8px 16px',
                backgroundColor: 'rgba(255,255,255,0.05)',
                borderRadius: '12px',
                border: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  background: 'linear-gradient(135deg, #a78bfa, #ec4899)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <User style={{ width: '16px', height: '16px', color: 'white' }} />
              </div>
              <div>
                <p style={{ fontSize: '12px', fontWeight: '500', color: 'white', margin: 0 }}>
                  {user?.name || 'User'}
                </p>
                <span
                  style={{
                    fontSize: '10px',
                    padding: '2px 6px',
                    borderRadius: '999px',
                    ...getRoleBadgeStyle(user?.role),
                  }}
                >
                  {user?.role}
                </span>
              </div>
            </div>

            <button
              onClick={handleLogout}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                backgroundColor: 'rgba(239,68,68,0.2)',
                color: '#fca5a5',
                borderRadius: '12px',
                border: '1px solid rgba(239,68,68,0.3)',
                cursor: 'pointer',
                fontWeight: '500',
              }}
            >
              <LogOut style={{ width: '16px', height: '16px' }} />
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
