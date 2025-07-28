// Defines the structure of a single user profile object
export interface User {
  id: string;
  username: string | null;
  email: string | null;
  role: 'admin' | 'user' | null;
}

// Defines the structure of a single violation object from your database
export interface Violation {
  id: number;
  user_id: string | null;
  description: string;
  violation_type: string;
  location: string | null;
  date: string; // ISO 8601 date string
  resolved: boolean;
  created_at: string; // ISO 8601 date string
}

// Defines the shape of the statistics object for the main dashboard
export interface DashboardStats {
  reportedCount: number;
  confirmedCount: number;
  pendingCount: number;
  newCount: number;
  userCount: number;
}