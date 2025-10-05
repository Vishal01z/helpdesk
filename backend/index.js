console.log("Index.js loaded");

const express = require('express');
const cors = require('cors');
const app = express();
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);


// Enable JSON body parsing and CORS
app.use(express.json());
app.use(cors());

// Test route
app.get('/', (req, res) => res.send('Backend running!'));

// Login route
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;

  // Simple mock authentication
  const users = [
    { email: 'admin@helpdesk.com', password: 'admin123', role: 'admin' },
    { email: 'agent@helpdesk.com', password: 'agent123', role: 'agent' },
    { email: 'user@helpdesk.com', password: 'user123', role: 'user' },
  ];

  const user = users.find(u => u.email === email && u.password === password);

  if (!user) return res.status(401).json({ message: 'Invalid credentials' });

  // Return token and user info (mock token)
  res.json({ token: 'abc123token', user: { email: user.email, role: user.role } });
});

// Register route
app.post('/api/auth/register', (req, res) => {
  const { email, password, name, role } = req.body;

  // For now, just echo back data (no DB)
  res.json({
    message: 'User registered successfully',
    user: { name, email, role },
    token: 'newusertoken123',
  });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
