import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { Employee, DEFAULT_TASKS } from "../types";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

const departments = [
  "Engineering",
  "Sales",
  "Marketing",
  "Design",
  "HR",
  "Finance",
  "Legal",
  "Customer Support",
  "IT",
];

const jobRoles = [
  "Software Engineer",
  "Sales Manager",
  "Marketing Specialist",
  "Graphic Designer",
  "HR Manager",
  "Finance Analyst",
  "Legal Counsel",
  "Customer Support Specialist",
  "IT Technician",
];

export function AddEmployee() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    jobRole: "",
    department: "",
    startDate: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newEmployee: Employee = {
      id: uuidv4(),
      ...formData,
      tasks: DEFAULT_TASKS.map((task) => ({
        id: uuidv4(),
        ...task,
        completed: false,
        employeeId: uuidv4(),
      })),
      isFullyOnboarded: false,
    };

    // Save to localStorage
    const employees = JSON.parse(localStorage.getItem("employees") || "[]");
    localStorage.setItem(
      "employees",
      JSON.stringify([...employees, newEmployee])
    );

    navigate("/");
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <div className="flex items-center gap-x-3">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="rounded-full cursor-pointer p-1 text-gray-900 hover:bg-gray-100"
            >
              <ArrowLeftIcon className="h-5 w-5" aria-hidden="true" />
            </button>
            <h2 className="text-2xl  font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl">
              Add New Employee
            </h2>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-6 bg-white p-8 shadow-soft-xl sm:rounded-lg"
          >
            <div className="border-b border-gray-200 pb-6">
              <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label
                    htmlFor="fullName"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Full Name
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="fullName"
                      id="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Email
                  </label>
                  <div className="mt-2">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="block w-full px-2  rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="jobRole"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Job Role
                  </label>
                  <div className="mt-2">
                    <select
                      id="jobRole"
                      name="jobRole"
                      value={formData.jobRole}
                      onChange={handleChange}
                      required
                      className="block w-full px-2  rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                    >
                      {jobRoles.map((jobRole) => (
                        <option key={jobRole} value={jobRole}>
                          {jobRole}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="department"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Department
                  </label>
                  <div className="mt-2">
                    <select
                      id="department"
                      name="department"
                      value={formData.department}
                      onChange={handleChange}
                      required
                      className="block w-full px-2  rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                    >
                      {departments.map((department) => (
                        <option key={department} value={department}>
                          {department}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="startDate"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Start Date
                  </label>
                  <div className="mt-2">
                    <input
                      type="date"
                      name="startDate"
                      id="startDate"
                      value={formData.startDate}
                      onChange={handleChange}
                      className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-x-6">
              <button
                type="button"
                onClick={() => navigate("/")}
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-md bg-primary-600 px-6 py-2 text-sm font-semibold text-black border border-gray-400 shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
              >
                Add Employee
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
