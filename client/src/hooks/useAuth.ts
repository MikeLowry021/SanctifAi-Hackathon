/**
 * useAuth hook for accessing authentication state
 *
 * FUTURE WORK - POST HACKATHON: Implement actual authentication
 * Original implementation would use useQuery to fetch from /api/auth/user
 */
import type { User } from "@shared/schema";

export function useAuth() {
  // Authentication is currently disabled (guest mode)
  const user: User | null = null;
  const isLoading = false;
  const isAuthenticated = false;

  return {
    user,
    isLoading,
    isAuthenticated,
  };
}
