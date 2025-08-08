import { useMutation, useQuery } from "@tanstack/react-query";

interface LoginCredentials {
  email: string;
  password: string;
}

interface LoginResponse {
  success: boolean;
  user?: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
  error?: string;
}

interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
}

const login = async (credentials: LoginCredentials): Promise<LoginResponse> => {
  const response = await fetch("/api/admin/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Login failed");
  }

  // Store user info in session storage
  if (data.success && data.user) {
    sessionStorage.setItem("userInfo", JSON.stringify(data.user));
  }

  return data;
};

const changePassword = async (
  userId: string,
  data: ChangePasswordData
): Promise<{ success: boolean }> => {
  const response = await fetch(`/api/admin/users/${userId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to change password");
  }

  return response.json();
};

export function useLogin() {
  return useMutation({
    mutationFn: login,
  });
}

export function useChangePassword(userId: string) {
  return useMutation({
    mutationFn: (data: ChangePasswordData) => changePassword(userId, data),
  });
}

export function useCurrentUser() {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: () => {
      const userInfo = sessionStorage.getItem("userInfo");
      if (!userInfo) return null;
      return JSON.parse(userInfo);
    },
  });
}
