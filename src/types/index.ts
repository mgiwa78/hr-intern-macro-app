export interface Employee {
  id: string;
  fullName: string;
  email: string;
  jobRole: string;
  department: string;
  startDate?: string;
  tasks: Task[];
  isFullyOnboarded: boolean;
}

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  employeeId: string;
  isCustom?: boolean;
}

export type OnboardingStatus = "not_started" | "in_progress" | "completed";

export const DEFAULT_TASKS = [
  { title: "Sign NDA" },
  { title: "Submit ID documents" },
  { title: "Set up email" },
  { title: "Complete HR orientation" },
  { title: "Access company tools (GitHub, Slack, etc.)" },
  { title: "Book intro meeting with manager" },
];
