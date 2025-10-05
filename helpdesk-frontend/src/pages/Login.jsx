/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Eye, EyeOff, LogIn, UserPlus } from "lucide-react";
import "./Login.css"; // Import the separate CSS

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    role: "user",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const endpoint = isLogin ? "/api/auth/login" : "/api/auth/register";
      const response = await fetch(`http://localhost:3000${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        window.location.href = "/dashboard";
      } else {
        alert(data.message || "Authentication failed");
      }
    } catch (error) {
      alert("Server error! Make sure backend is running on port 3000.");
    } finally {
      setLoading(false);
    }
  };

  const fillTestCredentials = (role) => {
    const credentials = {
      admin: { email: "admin@helpdesk.com", password: "admin123" },
      agent: { email: "agent@helpdesk.com", password: "agent123" },
      user: { email: "user@helpdesk.com", password: "user123" },
    };
    setFormData({ ...formData, ...credentials[role] });
    setIsLogin(true);
  };

  return (
    <div className="login-bg">
      <div className="login-card">
        {/* Header */}
        <div className="login-header">
          <div className="login-logo">🎫</div>
          <h1>HelpDesk Mini</h1>
          <p>Smart Ticketing System</p>
        </div>

        {/* Tabs */}
        <div className="login-tabs">
          <button
            className={isLogin ? "active" : ""}
            onClick={() => setIsLogin(true)}
          >
            <LogIn className="icon" /> Login
          </button>
          <button
            className={!isLogin ? "active" : ""}
            onClick={() => setIsLogin(false)}
          >
            <UserPlus className="icon" /> Register
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="login-form">
          {!isLogin && (
            <input
              type="text"
              placeholder="Full Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
          />
          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>

          {!isLogin && (
            <select
              value={formData.role}
              onChange={(e) =>
                setFormData({ ...formData, role: e.target.value })
              }
            >
              <option value="user">User</option>
              <option value="agent">Agent</option>
              <option value="admin">Admin</option>
            </select>
          )}

          <button type="submit" disabled={loading}>
            {loading ? "Processing..." : isLogin ? "Sign In" : "Register"}
          </button>
        </form>

        {/* Quick login */}
        {isLogin && (
          <div className="quick-login">
            Quick Login:
            <button onClick={() => fillTestCredentials("admin")}>Admin</button>
            <button onClick={() => fillTestCredentials("agent")}>Agent</button>
            <button onClick={() => fillTestCredentials("user")}>User</button>
          </div>
        )}
      </div>
    </div>
  );
}
