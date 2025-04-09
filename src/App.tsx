import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { EmployeeList } from "./components/EmployeeList";
import { AddEmployee } from "./components/AddEmployee";
import { EmployeeDetails } from "./components/EmployeeDetails";
import { Navbar } from "./components/Navbar";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<EmployeeList />} />
            <Route path="/add" element={<AddEmployee />} />
            <Route path="/employee/:id" element={<EmployeeDetails />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
