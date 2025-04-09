import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { Employee, Task } from "../types";
import { ArrowLeftIcon, CheckCircleIcon } from "@heroicons/react/24/outline";

export function EmployeeDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [newTaskTitle, setNewTaskTitle] = useState("");

  useEffect(() => {
    const employees = JSON.parse(localStorage.getItem("employees") || "[]");
    const foundEmployee = employees.find((e: Employee) => e.id === id);
    if (foundEmployee) {
      setEmployee(foundEmployee);
    }
  }, [id]);

  if (!employee) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900">
              Employee not found
            </h2>
            <p className="mt-2 text-gray-600">
              The employee you're looking for doesn't exist or has been removed.
            </p>
            <button
              onClick={() => navigate("/")}
              className="mt-4 inline-flex items-center rounded-md bg-primary-600 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-500"
            >
              <ArrowLeftIcon className="mr-2 h-5 w-5" />
              Back to List
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleTaskToggle = (taskId: string) => {
    if (!employee) return;

    const updatedEmployee = {
      ...employee,
      tasks: employee.tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      ),
    };

    // Update localStorage
    const employees = JSON.parse(localStorage.getItem("employees") || "[]");
    const updatedEmployees = employees.map((e: Employee) =>
      e.id === employee.id ? updatedEmployee : e
    );
    localStorage.setItem("employees", JSON.stringify(updatedEmployees));
    setEmployee(updatedEmployee);
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim() || !employee) return;

    const newTask: Task = {
      id: uuidv4(),
      title: newTaskTitle.trim(),
      completed: false,
      employeeId: employee.id,
      isCustom: true,
    };

    const updatedEmployee = {
      ...employee,
      tasks: [...employee.tasks, newTask],
    };

    // Update localStorage
    const employees = JSON.parse(localStorage.getItem("employees") || "[]");
    const updatedEmployees = employees.map((e: Employee) =>
      e.id === employee.id ? updatedEmployee : e
    );
    localStorage.setItem("employees", JSON.stringify(updatedEmployees));
    setEmployee(updatedEmployee);
    setNewTaskTitle("");
  };

  const handleMarkAsComplete = () => {
    if (!employee) return;

    const updatedEmployee = {
      ...employee,
      isFullyOnboarded: true,
    };

    // Update localStorage
    const employees = JSON.parse(localStorage.getItem("employees") || "[]");
    const updatedEmployees = employees.map((e: Employee) =>
      e.id === employee.id ? updatedEmployee : e
    );
    localStorage.setItem("employees", JSON.stringify(updatedEmployees));
    setEmployee(updatedEmployee);
  };

  const completedTasks = employee.tasks.filter((task) => task.completed).length;
  const progress = (completedTasks / employee.tasks.length) * 100;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <div className="flex items-center gap-x-3">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="rounded-full p-1 text-gray-900 hover:bg-gray-100"
            >
              <ArrowLeftIcon className="h-5 w-5" aria-hidden="true" />
            </button>
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl">
              {employee.fullName}
            </h2>
          </div>

          <div className="bg-white shadow-soft-xl sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <h3 className="text-base font-semibold leading-7 text-gray-900">
                    Employee Information
                  </h3>
                  <dl className="mt-4 space-y-4">
                    <div>
                      <dt className="text-sm font-medium text-gray-500">
                        Email
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {employee.email}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">
                        Department
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {employee.department}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">
                        Job Role
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {employee.jobRole}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">
                        Start Date
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {employee.startDate || "Not set"}
                      </dd>
                    </div>
                  </dl>
                </div>

                <div>
                  <h3 className="text-base font-semibold leading-7 text-gray-900">
                    Onboarding Progress
                  </h3>
                  <div className="mt-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-900">
                        {Math.round(progress)}% Complete
                      </span>
                      <span className="text-sm text-gray-500">
                        {completedTasks} of {employee.tasks.length} tasks
                      </span>
                    </div>
                    <div className="mt-2">
                      <div className="h-2 w-full rounded-full bg-gray-200">
                        <div
                          className="h-2 rounded-full bg-green-600"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white shadow-soft-xl sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-base font-semibold leading-7 text-gray-900">
                Onboarding Tasks
              </h3>
              <div className="mt-4 space-y-4">
                {employee.tasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-start space-x-3 rounded-lg border border-gray-200 p-4 hover:bg-gray-50"
                  >
                    <div className="flex h-6 items-center">
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => handleTaskToggle(task.id)}
                        className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-600"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-medium text-gray-900">
                        {task.title}
                      </div>
                      {task.isCustom && (
                        <span className="mt-1 inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
                          Custom Task
                        </span>
                      )}
                    </div>
                    {task.completed && (
                      <CheckCircleIcon
                        className="h-5 w-5 text-green-500"
                        aria-hidden="true"
                      />
                    )}
                  </div>
                ))}
              </div>

              <form onSubmit={handleAddTask} className="mt-6">
                <div className="flex gap-x-3">
                  <input
                    type="text"
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                    placeholder="Add a custom task..."
                    className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                  />
                  <button
                    type="submit"
                    className="rounded-md cursor-pointer text-black border border-gray-400 bg-primary-600 px-4 py-2 text-sm font-semibold shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
                  >
                    Add Task
                  </button>
                </div>
              </form>
            </div>
          </div>

          {!employee.isFullyOnboarded && (
            <div className="flex justify-end">
              <button
                onClick={handleMarkAsComplete}
                disabled={progress < 100}
                className={`inline-flex items-center rounded-md px-6 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
                  progress < 100
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-500 focus-visible:outline-green-600"
                }`}
              >
                <CheckCircleIcon className="mr-2 h-5 w-5" aria-hidden="true" />
                Mark as Fully Onboarded
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
