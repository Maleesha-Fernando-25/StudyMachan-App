import { apiClient } from "./client";

export interface ConversationSummary {
  id: string;
  tutor_id: string;
  student_id: string;
  other_party_name?: string | null;
  other_party_avatar?: string | null;
  last_message?: string | null;
  last_message_at?: string | null;
  created_at: string;
}

export interface ChatMessage {
  id: string;
  conversation_id: string;
  sender_id: string;
  sender_role: "student" | "tutor";
  content: string;
  created_at: string;
}

export interface NotificationAlert {
  id: string;
  user_id: string;
  title: string;
  message: string;
  notification_type: "booking" | "payment" | "chat" | "system";
  is_read: boolean;
  created_at: string;
}

export const messagingService = {
  getConversations: () => apiClient<ConversationSummary[]>("/conversations/"),

  getMessages: (conversation_id: string) =>
    apiClient<ChatMessage[]>(`/conversations/${conversation_id}/messages`),

  sendMessage: (conversation_id: string, content: string) =>
    apiClient<ChatMessage>(`/conversations/${conversation_id}/messages`, {
      method: "POST",
      body: JSON.stringify({ content }),
    }),

  getNotifications: () => apiClient<NotificationAlert[]>("/notifications/"),

  markNotificationRead: (id: string) =>
    apiClient<NotificationAlert>(`/notifications/${id}/read`, {
      method: "PATCH",
    }),
};
