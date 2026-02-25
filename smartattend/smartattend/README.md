# SmartAttend - Attendance Management System

A fully functional attendance management system built with React + Tailwind CSS + Vite.

## Tech Stack
- React 18 (JSX, no TypeScript)
- Tailwind CSS v3
- React Router DOM v6
- Vite 5

## Setup

```bash
npm install
npm run dev
```

## Demo Credentials

| Role | Username | Password |
|------|----------|----------|
| Employee | `alice` | `pass123` |
| Employee | `bob` | `pass123` |
| Employee | `carol` | `pass123` |
| Admin | `admin` | `admin123` |

## Features

### Employee
- **Dashboard** — Live clock, Punch In/Out with session timer, attendance stats, weekly chart, monthly rate (donut chart)
- **Leave Request** — Leave balance cards, request form with date picker, request history with status badges
- **Attendance History** — 60-day history table, filter by status, pagination, summary stats

### Admin
- **HR Dashboard** — 20 employees, real-time presence stats, search/filter by dept & status, salary display, employee detail panel

## File Structure
```
src/
├── contexts/AuthContext.jsx    ← Global auth state
├── lib/
│   ├── auth.js                 ← Mock users & 20 employees
│   └── utils.js                ← Helpers (date, currency, random history)
├── components/
│   ├── AppLogo.jsx
│   ├── BackButton.jsx
│   ├── Layout.jsx
│   ├── LiveClock.jsx
│   └── Sidebar.jsx
├── pages/
│   ├── LoginPage.jsx
│   ├── EmployeeDashboard.jsx
│   ├── LeaveRequestPage.jsx
│   ├── AttendanceHistoryPage.jsx
│   ├── AdminDashboard.jsx
│   └── NotFound.jsx
├── hooks/use-toast.js
├── App.jsx
├── main.jsx
└── index.css
```
