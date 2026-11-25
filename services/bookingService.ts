import { apiClient } from "./client";

export interface BookingQuoteRequest {
  tutor_id: string;
  duration_minutes: number;
}

export interface BookingQuoteResponse {
  tutor_id: string;
  duration_minutes: number;
  hourly_rate: number;
  tutor_fee: number;
  platform_fee: number;
  total_amount: number;
}

export interface BookingCreateRequest {
  tutor_id: string;
  subject: string;
  scheduled_at: string;
  duration_minutes: number;
  notes?: string;
}

export interface BookingResponse {
  id: string;
  student_id: string;
  tutor_id: string;
  subject: string;
  scheduled_at: string;
  duration_minutes: number;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  meeting_link?: string | null;
  total_amount: number;
  platform_fee: number;
  tutor_fee: number;
  created_at: string;
}

export interface PayHereParams {
  merchant_id: string;
  return_url: string;
  cancel_url: string;
  notify_url: string;
  order_id: string;
  items: string;
  currency: string;
  amount: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  hash: string;
}

export interface PaymentHistoryItem {
  id: string;
  booking_id: string;
  amount: number;
  currency: string;
  status: string;
  created_at: string;
  subject?: string;
  tutor_name?: string;
}

export const bookingService = {
  getQuote: (payload: BookingQuoteRequest) =>
    apiClient<BookingQuoteResponse>("/sessions/quote", {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  createBooking: (payload: BookingCreateRequest) =>
    apiClient<BookingResponse>("/sessions/", {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  getSessions: (status?: string) => {
    const qs = status ? `?status=${encodeURIComponent(status)}` : "";
    return apiClient<BookingResponse[]>(`/sessions/${qs}`);
  },

  getSessionById: (id: string) => apiClient<BookingResponse>(`/sessions/${id}`),

  cancelSession: (id: string) =>
    apiClient<BookingResponse>(`/sessions/${id}/cancel`, {
      method: "PATCH",
    }),

  initiatePayment: (booking_id: string) =>
    apiClient<{ payment_id: string; payhere_params: PayHereParams }>("/payments/initiate", {
      method: "POST",
      body: JSON.stringify({ booking_id }),
    }),

  getPaymentHistory: () => apiClient<PaymentHistoryItem[]>("/payments/history"),
};
