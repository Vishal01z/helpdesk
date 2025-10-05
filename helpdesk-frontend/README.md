# 🎫 HelpDesk Mini - Frontend

> **Modern Ticketing System with SLA Management** | Built for Hackathon 2024

![Tech Stack](https://img.shields.io/badge/React-18.2-61DAFB?logo=react)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38BDF8?logo=tailwindcss)
![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?logo=vite)

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- Backend server running on `http://localhost:3000`

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

Frontend will run on **http://localhost:5173**

---

## 🎨 Features

### ✅ **Authentication**
- Login/Register with role selection (User/Agent/Admin)
- JWT-based authentication
- Quick test login buttons for demo

### ✅ **Dashboard**
- Real-time ticket statistics
- SLA breach indicators
- Status-based filtering (All, Open, In-Progress, Resolved, Closed)
- Search functionality
- Pagination support

### ✅ **Ticket Details**
- Complete ticket information
- SLA timer with visual alerts
- Threaded comments system
- Status management (role-based)
- Assignment tracking
- Timeline view

### ✅ **UI/UX**
- Dark gradient theme with glassmorphism
- Responsive design (mobile-friendly)
- Smooth animations and transitions
- Color-coded priorities and statuses
- Visual SLA breach warnings

---

## 📁 Project Structure

```
helpdesk-frontend/
│
├── src/
│   ├── pages/
│   │   ├── Login.jsx           # Authentication page
│   │   ├── Dashboard.jsx       # Ticket list with filters
│   │   └── TicketDetails.jsx   # Single ticket view
│   ├── App.jsx                 # Main router
│   ├── index.css               # Global styles + Tailwind
│   └── main.jsx                # React entry point
│
├── index.html                  # HTML template
├── package.json                # Dependencies
├── vite.config.js              # Vite configuration
├── tailwind.config.js          # Tailwind setup
└── postcss.config.js           # PostCSS setup
```

---

## 🔐 Test Credentials

Use these credentials for quick testing:

| Role  | Email                  | Password  |
|-------|------------------------|-----------|
| Admin | admin@helpdesk.com     | admin123  |
| Agent | agent@helpdesk.com     | agent123  |
| User  | user@helpdesk.com      | user123   |

---

## 🎯 API Endpoints Used

### Authentication
```
POST /api/auth/register
POST /api/auth/login
```

### Tickets
```
GET    /api/tickets              # List all tickets (with filters)
GET    /api/tickets/:id          # Get single ticket
POST   /api/tickets              # Create new ticket
PUT    /api/tickets/:id          # Update ticket status
```

### Comments
```
GET    /api/tickets/:id/comments  # Get all comments
POST   /api/tickets/:id/comments  # Add new comment
```

---

## 🎨 Design Highlights

### Color Scheme
- **Primary**: Purple gradient (`#a855f7` → `#ec4899`)
- **Background**: Dark slate with purple accents
- **Accents**: Glassmorphism effects with backdrop blur

### Status Colors
- 🔵 **Open**: Blue
- 🟡 **In-Progress**: Yellow
- 🟢 **Resolved**: Green
- ⚫ **Closed**: Gray

### Priority Colors
- 🟢 **Low**: Green
- 🟡 **Medium**: Yellow
- 🟠 **High**: Orange
- 🔴 **Urgent**: Red

### SLA Indicators
- ✅ **On Time**: Default border
- ⚠️ **Breached**: Red border + alert badge

---

## 📱 Responsive Design

- **Desktop**: Full layout with sidebar
- **Tablet**: Optimized 2-column grid
- **Mobile**: Single column, stacked layout

---

## 🛠️ Technologies Used

| Technology | Purpose |
|------------|---------|
| React 18 | UI Library |
| Vite | Build tool & dev server |
| TailwindCSS | Utility-first styling |
| Lucide React | Icon library |
| Fetch API | HTTP requests |

---

## 🔧 Configuration

### Backend URL
Update the backend URL in all API calls if needed:

```javascript
// Current: http://localhost:3000
// Change to your backend URL
const API_URL = 'http://localhost:3000';
```

### Routing
Simple client-side routing without React Router:
- `/` or `/login` → Login page
- `/dashboard` → Ticket list
- `/ticket/:id` → Ticket details

---

## 📊 Performance Features

- **Lazy loading**: Components load on demand
- **Optimized re-renders**: React best practices
- **Minimal bundle size**: Vite code splitting
- **Fast refresh**: Instant HMR during development

---

## 🎓 Hackathon Scoring Criteria

### ✅ Basic UI (10 pts)
- Modern, professional design
- Responsive across devices
- Smooth user experience

### ✅ API Integration
- Complete CRUD operations
- Proper error handling
- Loading states

### ✅ Advanced Features
- SLA breach visualization
- Role-based UI changes
- Real-time comment system
- Search and filter functionality

---

## 🚢 Deployment

### Vercel (Recommended)
```bash
npm run build
vercel --prod
```

### Netlify
```bash
npm run build
netlify deploy --prod --dir=dist
```

### Environment Variables
Set `VITE_API_URL` for production backend:
```
VITE_API_URL=https://your-backend.com
```

---

## 🐛 Troubleshooting

### Backend Connection Issues
```javascript
// Check if backend is running
curl http://localhost:3000/api/health

// CORS errors? Backend needs:
app.use(cors({ origin: 'http://localhost:5173' }));
```

### Build Errors
```bash
# Clear cache
rm -rf node_modules dist
npm install
npm run build
```

---

## 📝 Future Enhancements

- [ ] Real-time WebSocket updates
- [ ] File attachments for tickets
- [ ] Advanced analytics dashboard
- [ ] Email notifications
- [ ] Dark/Light theme toggle
- [ ] Bulk ticket operations
- [ ] Export to CSV/PDF

---

## 👨‍💻 Development Tips

### Quick Test Flow
1. Login with test credentials
2. Dashboard loads with sample tickets
3. Click on any ticket to view details
4. Add comments and change status
5. Check SLA breach indicators

### Debug Mode
```javascript
// Add to localStorage for debug logs
localStorage.setItem('debug', 'true');
```

---

## 📄 License

MIT License - Built for Educational/Hackathon purposes

---

## 🙌 Credits

**Built with ❤️ for Hackathon 2024**

Icons: [Lucide React](https://lucide.dev/)  
UI Framework: [TailwindCSS](https://tailwindcss.com/)  
Build Tool: [Vite](https://vitejs.dev/)

---

## 📧 Support

For issues or questions:
- Check backend logs first
- Verify API endpoints are matching
- Ensure test users exist in database

**Happy Hacking! 🚀**