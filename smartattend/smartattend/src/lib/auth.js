export const MOCK_USERS = {
  employees: [
    { id: 'E001', username: 'alice', password: 'pass123', name: 'Alice Johnson', role: 'employee', department: 'Engineering', position: 'Senior Developer', avatar: 'AJ', salary: 95000 },
    { id: 'E002', username: 'bob', password: 'pass123', name: 'Bob Smith', role: 'employee', department: 'Design', position: 'UI/UX Designer', avatar: 'BS', salary: 78000 },
    { id: 'E003', username: 'carol', password: 'pass123', name: 'Carol Williams', role: 'employee', department: 'Marketing', position: 'Marketing Lead', avatar: 'CW', salary: 82000 },
  ],
  admin: { id: 'A001', username: 'admin', password: 'admin123', name: 'Sarah Mitchell', role: 'admin', position: 'HR Manager', avatar: 'SM' },
}

export function authenticate(username, password) {
  if (username === MOCK_USERS.admin.username && password === MOCK_USERS.admin.password) {
    return MOCK_USERS.admin
  }
  const emp = MOCK_USERS.employees.find(e => e.username === username && e.password === password)
  return emp || null
}

export const ALL_EMPLOYEES = [
  { id: 'E001', name: 'Alice Johnson', department: 'Engineering', position: 'Senior Developer', avatar: 'AJ', salary: 95000, status: 'present', hoursToday: 6.5 },
  { id: 'E002', name: 'Bob Smith', department: 'Design', position: 'UI/UX Designer', avatar: 'BS', salary: 78000, status: 'present', hoursToday: 7.0 },
  { id: 'E003', name: 'Carol Williams', department: 'Marketing', position: 'Marketing Lead', avatar: 'CW', salary: 82000, status: 'absent', hoursToday: 0 },
  { id: 'E004', name: 'David Chen', department: 'Engineering', position: 'Backend Engineer', avatar: 'DC', salary: 90000, status: 'present', hoursToday: 8.0 },
  { id: 'E005', name: 'Emma Davis', department: 'Sales', position: 'Sales Executive', avatar: 'ED', salary: 72000, status: 'late', hoursToday: 5.5 },
  { id: 'E006', name: 'Frank Miller', department: 'Finance', position: 'Financial Analyst', avatar: 'FM', salary: 85000, status: 'present', hoursToday: 7.5 },
  { id: 'E007', name: 'Grace Lee', department: 'HR', position: 'HR Specialist', avatar: 'GL', salary: 68000, status: 'present', hoursToday: 8.0 },
  { id: 'E008', name: 'Henry Wilson', department: 'Engineering', position: 'DevOps Engineer', avatar: 'HW', salary: 92000, status: 'leave', hoursToday: 0 },
  { id: 'E009', name: 'Iris Taylor', department: 'Design', position: 'Graphic Designer', avatar: 'IT', salary: 65000, status: 'present', hoursToday: 6.0 },
  { id: 'E010', name: 'Jack Brown', department: 'Product', position: 'Product Manager', avatar: 'JB', salary: 105000, status: 'present', hoursToday: 7.0 },
  { id: 'E011', name: 'Kate Anderson', department: 'Engineering', position: 'QA Engineer', avatar: 'KA', salary: 75000, status: 'present', hoursToday: 8.0 },
  { id: 'E012', name: 'Leo Martinez', department: 'Sales', position: 'Account Manager', avatar: 'LM', salary: 77000, status: 'late', hoursToday: 4.5 },
  { id: 'E013', name: 'Mia Thompson', department: 'Marketing', position: 'Content Strategist', avatar: 'MT', salary: 70000, status: 'present', hoursToday: 7.0 },
  { id: 'E014', name: 'Nathan White', department: 'Finance', position: 'Accountant', avatar: 'NW', salary: 72000, status: 'absent', hoursToday: 0 },
  { id: 'E015', name: 'Olivia Harris', department: 'HR', position: 'Recruiter', avatar: 'OH', salary: 64000, status: 'present', hoursToday: 6.5 },
  { id: 'E016', name: 'Paul Jackson', department: 'Engineering', position: 'Frontend Developer', avatar: 'PJ', salary: 88000, status: 'present', hoursToday: 8.0 },
  { id: 'E017', name: 'Quinn Roberts', department: 'Design', position: 'Product Designer', avatar: 'QR', salary: 80000, status: 'leave', hoursToday: 0 },
  { id: 'E018', name: 'Rachel Green', department: 'Product', position: 'Product Analyst', avatar: 'RG', salary: 82000, status: 'present', hoursToday: 5.0 },
  { id: 'E019', name: 'Sam Turner', department: 'Sales', position: 'Sales Manager', avatar: 'ST', salary: 95000, status: 'present', hoursToday: 7.5 },
  { id: 'E020', name: 'Tina Moore', department: 'Finance', position: 'Finance Manager', avatar: 'TM', salary: 98000, status: 'present', hoursToday: 8.0 },
]
