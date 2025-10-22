import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { User } from '@shared/types';
import { api } from '@/lib/api-client';
interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  setUser: (user: User | null) => void;
}
export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      login: async (email, password) => {
        const response = await api<{ user: User; token: string }>('/api/auth/login', {
          method: 'POST',
          body: JSON.stringify({ email, password }),
        });
        if (response.user && response.token) {
          set({ user: response.user, token: response.token, isAuthenticated: true });
        } else {
          throw new Error('Login failed: No user or token returned');
        }
      },
      logout: () => {
        set({ user: null, token: null, isAuthenticated: false });
        // Use window.location.href for a hard redirect to clear all application state
        window.location.href = '/';
      },
      setUser: (user) => {
        set({ user, isAuthenticated: !!user });
      },
    }),
    {
      name: 'auth-storage', // unique name
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);