import { apiClient } from "./client";

export interface DashboardUpcomingSession {
  id: string;
  tutor_name: string;
  subject: string;
  scheduled_at: string;
  duration_minutes: number;
  meeting_link?: string | null;
}

export interface StudentDashboardResponse {
  upcoming_session: DashboardUpcomingSession | null;
  weekly_goal_hours: number;
  completed_goal_hours: number;
  total_completed_sessions: number;
  total_upcoming_sessions: number;
  bookmarks: Array<{
    id: string;
    tutor_id: string;
    tutor_name: string;
    subject: string;
    hourly_rate: number;
  }>;
}

export interface FocusSessionPayload {
  duration_minutes: number;
  subject?: string;
  completed?: boolean;
}

export interface ScheduleBlock {
  id: string;
  student_id: string;
  title: string;
  start_time: string;
  end_time: string;
  day_of_week?: number | null;
  created_at: string;
}

export interface StudyFriend {
  id: string;
  friend_student_id: string;
  friend_name?: string | null;
  friend_avatar?: string | null;
  status: string;
  created_at: string;
}

export const studentService = {
  getDashboard: () => apiClient<StudentDashboardResponse>("/students/me/dashboard"),

  getBookmarks: () =>
    apiClient<Array<{ id: string; tutor_id: string; tutor_name: string; subject: string; hourly_rate: number }>>(
      "/students/me/bookmarks"
    ),

  addBookmark: (tutor_id: string) =>
    apiClient("/students/me/bookmarks", {
      method: "POST",
      body: JSON.stringify({ tutor_id }),
    }),

  removeBookmark: (tutor_id: string) =>
    apiClient(`/students/me/bookmarks/${tutor_id}`, {
      method: "DELETE",
    }),

  logFocusSession: (payload: FocusSessionPayload) =>
    apiClient("/students/me/focus-sessions", {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  getScheduleBlocks: () => apiClient<ScheduleBlock[]>("/students/me/schedule-blocks"),

  createScheduleBlock: (payload: { title: string; start_time: string; end_time: string; day_of_week?: number }) =>
    apiClient<ScheduleBlock>("/students/me/schedule-blocks", {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  deleteScheduleBlock: (id: string) =>
    apiClient(`/students/me/schedule-blocks/${id}`, {
      method: "DELETE",
    }),

  getFriends: () => apiClient<StudyFriend[]>("/students/me/friends"),

  addFriend: (friend_student_id: string) =>
    apiClient<StudyFriend>("/students/me/friends", {
      method: "POST",
      body: JSON.stringify({ friend_student_id }),
    }),
};
