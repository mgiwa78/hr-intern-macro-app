# HR Onboarding Management System

A lightweight internal tool for HR staff to track onboarding status and manage tasks for new employees.

## Features

- Add new employees with their basic information
- Track onboarding progress with a checklist of tasks
- Add custom tasks per employee
- Mark tasks as completed
- Filter employees by onboarding status
- Search employees by name or email
- Visual progress indicators
- Persistent storage using localStorage and optional JSON server
- Responsive and modern UI with TailwindCSS

## Tech Stack

- React with TypeScript
- React Router for navigation
- TailwindCSS for styling
- UUID for generating unique IDs
- JSON Server for optional mock API
- LocalStorage for data persistence

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd <repository-name>
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. (Optional) Start the JSON server for API persistence:

```bash
npm run server
```

The application will be available at `http://localhost:5173`

## Project Structure

```
src/
  ├── components/          # React components
  │   ├── AddEmployee.tsx    # Form to add new employees
  │   ├── EmployeeList.tsx   # List and filter employees
  │   ├── EmployeeDetails.tsx# View and manage employee tasks
  │   └── Navbar.tsx         # Navigation component
  ├── types/              # TypeScript type definitions
  │   └── index.ts
  └── App.tsx            # Main application component
```

## Features in Detail

### Employee Management

- Add new employees with full name, email, job role, department, and start date
- View all employees with their onboarding progress
- Search and filter employees by status

### Task Management

- Predefined onboarding tasks automatically assigned to new employees
- Add custom tasks for specific employees
- Mark tasks as completed
- Track overall onboarding progress
- Mark employees as fully onboarded when all tasks are complete

### Data Persistence

- Data is stored in localStorage by default
- Optional JSON server backend for API persistence

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
