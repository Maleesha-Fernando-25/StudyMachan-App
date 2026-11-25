import { BACKEND_URL } from "@/constants/api/api";
import { supabase } from "@/supabase/supabaseClient";

export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public code?: string,
  ) {
    super(message);
  }
}

async function parseBackendError(res: Response): Promise<ApiError> {
  const body = await res.json().catch(() => null);
  const detail = body?.detail;
  const msg = Array.isArray(detail)
    ? detail.map((d: { msg?: string }) => String(d.msg ?? "")).join("\n")
    : typeof detail === "string"
      ? detail
      : `Request failed with status ${res.status}`;
  return new ApiError(msg, res.status);
}

export async function apiClient<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const url = `${BACKEND_URL}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;

  try {
    const res = await fetch(url, {
      ...options,
      headers,
    });

    if (!res.ok) {
      throw await parseBackendError(res);
    }

    if (res.status === 204) {
      return {} as T;
    }

    return (await res.json()) as T;
  } catch (err: any) {
    if (err instanceof ApiError) throw err;
    throw new ApiError(
      err?.message || "Cannot connect to server. Check your network or backend URL.",
      0,
      "network_error"
    );
  }
}
