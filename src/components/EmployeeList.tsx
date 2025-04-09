import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Employee } from "../types";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export function EmployeeList() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "not_started" | "in_progress" | "completed"
  >("all");

  useEffect(() => {
    const storedEmployees = JSON.parse(
      localStorage.getItem("employees") || "[]"
    );
    setEmployees(storedEmployees);
  }, []);

  const getEmployeeStatus = (employee: Employee) => {
    if (!employee.tasks.length) return "not_started";
    if (employee.isFullyOnboarded) return "completed";
    const completedTasks = employee.tasks.filter(
      (task) => task.completed
    ).length;
    return completedTasks === 0 ? "not_started" : "in_progress";
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "not_started":
        return "bg-red-100 text-red-800 ring-red-600/20";
      case "in_progress":
        return "bg-yellow-100 text-yellow-800 ring-yellow-600/20";
      case "completed":
        return "bg-green-100 text-green-800 ring-green-600/20";
      default:
        return "bg-gray-100 text-gray-800 ring-gray-600/20";
    }
  };

  const filteredEmployees = employees.filter((employee) => {
    const matchesSearch =
      employee.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase());
    const status = getEmployeeStatus(employee);
    return matchesSearch && (statusFilter === "all" || status === statusFilter);
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl">
              Employees
            </h2>
            <Link
              to="/add"
              className="inline-flex text-black items-center justify-center rounded-md bg-primary-600 px-4 py-2 text-sm font-semibold  shadow-sm hover:bg-primary-500 border border-gray-400 focus-visible:outline-offset-2 focus-visible:outline-primary-600 sm:ml-3"
            >
              Add Employee
            </Link>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative flex-1 max-w-md">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <MagnifyingGlassIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </div>
              <input
                type="text"
                placeholder="Search employees..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full rounded-md border-0 py-2.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(
                  e.target.value as
                    | "all"
                    | "not_started"
                    | "in_progress"
                    | "completed"
                )
              }
              className="block w-full rounded-md border-0 py-2.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-primary-600 sm:text-sm sm:leading-6 sm:w-auto"
            >
              <option value="all">All Status</option>
              <option value="not_started">Not Started</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div className="overflow-hidden bg-white shadow-soft-xl sm:rounded-lg">
            <ul role="list" className="divide-y divide-gray-100">
              {filteredEmployees.length === 0 ? (
                <li className="p-8 text-center text-gray-500">
                  No employees found. Add a new employee to get started.
                </li>
              ) : (
                filteredEmployees.map((employee) => {
                  const status = getEmployeeStatus(employee);
                  const completedTasks = employee.tasks.filter(
                    (task) => task.completed
                  ).length;
                  const progress =
                    (completedTasks / employee.tasks.length) * 100;

                  return (
                    <li
                      key={employee.id}
                      className="relative flex justify-between gap-x-6 px-4 py-5 hover:bg-gray-50 sm:px-6"
                    >
                      <Link
                        to={`/employee/${employee.id}`}
                        className="flex min-w-0 gap-x-4 flex-1"
                      >
                        <div className="min-w-0 flex-auto">
                          <p className="text-sm font-semibold leading-6 text-gray-900">
                            {employee.fullName}
                          </p>
                          <p className="mt-1 flex text-xs leading-5 text-gray-500">
                            {employee.email}
                          </p>
                        </div>
                        <div className="flex shrink-0 items-center gap-x-4">
                          <div className="hidden sm:flex sm:flex-col sm:items-end">
                            <p className="text-sm leading-6 text-gray-900">
                              {employee.jobRole}
                            </p>
                            <p className="mt-1 text-xs leading-5 text-gray-500">
                              {employee.department}
                            </p>
                          </div>
                          <div className="flex flex-col items-end gap-y-1">
                            <span
                              className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${getStatusColor(
                                status
                              )}`}
                            >
                              {status.replace("_", " ")}
                            </span>
                            <div className="flex items-center gap-x-1">
                              <div className="h-2 w-24 rounded-full bg-gray-100">
                                <div
                                  className="h-2 rounded-full bg-green-600"
                                  style={{ width: `${progress}%` }}
                                />
                              </div>
                              <span className="text-xs text-gray-500">
                                {Math.round(progress)}%
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </li>
                  );
                })
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
