import { apiClient } from "./client";

export interface TutorSummary {
  id: string;
  name: string;
  avatar_url?: string | null;
  headline?: string | null;
  bio?: string | null;
  subjects: string[];
  hourly_rate: number;
  average_rating: number;
  total_reviews: number;
  completed_sessions: number;
  district?: string | null;
  is_verified?: boolean;
}

export interface TutorSearchParams {
  subject?: string;
  district?: string;
  min_rate?: number;
  max_rate?: number;
  limit?: number;
  offset?: number;
}

export interface SlotAvailability {
  start_time: string;
  end_time: string;
  is_available: boolean;
}

export interface TutorDashboard {
  today_sessions: number;
  monthly_earnings: number;
  pending_requests: number;
  average_rating: number;
  is_active: boolean;
  total_reviews: number;
}

export interface TutorEarnings {
  available_balance: number;
  pending_balance: number;
  total_withdrawn: number;
  monthly_earnings: number;
  history: Array<{
    id: string;
    amount: number;
    description: string;
    date: string;
    type: "credit" | "payout";
  }>;
}

export interface BankAccount {
  id: string;
  account_holder_name: string;
  bank_name: string;
  branch_name: string;
  account_number_masked: string;
  is_primary: boolean;
}

export interface BankAccountCreate {
  account_holder_name: string;
  bank_name: string;
  branch_name: string;
  account_number: string;
  is_primary?: boolean;
}

export interface TutorReview {
  id: string;
  student_name: string;
  student_avatar?: string | null;
  rating: number;
  comment?: string | null;
  created_at: string;
  reply?: string | null;
  reply_at?: string | null;
}

export const tutorService = {
  searchTutors: (params: TutorSearchParams = {}) => {
    const q = new URLSearchParams();
    if (params.subject && params.subject !== "All Subjects") q.append("subject", params.subject);
    if (params.district && params.district !== "All Districts") q.append("district", params.district);
    if (params.min_rate !== undefined) q.append("min_rate", String(params.min_rate));
    if (params.max_rate !== undefined) q.append("max_rate", String(params.max_rate));
    if (params.limit) q.append("limit", String(params.limit));
    if (params.offset) q.append("offset", String(params.offset));
    const qs = q.toString();
    return apiClient<TutorSummary[]>(`/tutors/search${qs ? `?${qs}` : ""}`);
  },

  getFeaturedTutors: (limit = 6) => apiClient<TutorSummary[]>(`/tutors/featured?limit=${limit}`),

  getTutorById: (id: string) => apiClient<TutorSummary>(`/tutors/${id}`),

  getAvailableSlots: (tutor_id: string, date: string) =>
    apiClient<SlotAvailability[]>(`/tutors/${tutor_id}/slots?date=${encodeURIComponent(date)}`),

  // Tutor Self Endpoints
  getDashboard: () => apiClient<TutorDashboard>("/tutors/me/dashboard"),

  setStatus: (is_active: boolean) =>
    apiClient<{ message: string; is_active: boolean }>("/tutors/me/status", {
      method: "PATCH",
      body: JSON.stringify({ is_active }),
    }),

  getEarnings: () => apiClient<TutorEarnings>("/tutors/me/earnings"),

  getBankAccounts: () => apiClient<BankAccount[]>("/tutors/me/bank-accounts"),

  addBankAccount: (payload: BankAccountCreate) =>
    apiClient<BankAccount>("/tutors/me/bank-accounts", {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  deleteBankAccount: (id: string) =>
    apiClient(`/tutors/me/bank-accounts/${id}`, {
      method: "DELETE",
    }),

  getReviews: () => apiClient<TutorReview[]>("/tutors/me/reviews"),

  replyReview: (reviewId: string, reply: string) =>
    apiClient<TutorReview>(`/tutors/me/reviews/${reviewId}/reply`, {
      method: "POST",
      body: JSON.stringify({ reply }),
    }),
};
