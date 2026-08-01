import { create } from 'zustand';
import api from '../api/axios';

export const useAuthStore = create((set, get) => ({
  user: null,
  accessToken: null,
  isAuthenticated: false,
  isLoading: true,

  setUser: (user) => set({ user, isAuthenticated: !!user }),
  setAccessToken: (token) => set({ accessToken: token }),
  setLoading: (isLoading) => set({ isLoading }),

  login: async (email, password) => {
    set({ isLoading: true });
    try {
      const res = await api.post('/auth/login', { email, password });
      const { user, accessToken } = res.data.data;
      set({ user, accessToken, isAuthenticated: true, isLoading: false });
      return { success: true };
    } catch (error) {
      set({ isLoading: false });
      return {
        success: false,
        error: error.response?.data?.message || 'Login failed',
      };
    }
  },

  register: async (registerData) => {
    set({ isLoading: true });
    try {
      const res = await api.post('/auth/register', registerData);
      const { user, accessToken } = res.data.data;
      set({ user, accessToken, isAuthenticated: true, isLoading: false });
      return { success: true };
    } catch (error) {
      set({ isLoading: false });
      return {
        success: false,
        error: error.response?.data?.message || 'Registration failed',
      };
    }
  },

  checkAuth: async () => {
    set({ isLoading: true });
    try {
      // First try refreshing token silently to get an access token
      const refreshRes = await api.post('/auth/refresh-token');
      const { accessToken } = refreshRes.data.data;
      set({ accessToken });

      // Then get current user profile
      const userRes = await api.get('/auth/me');
      set({ user: userRes.data.data.user, isAuthenticated: true, isLoading: false });
    } catch (error) {
      // Not logged in or expired refresh token
      set({ user: null, accessToken: null, isAuthenticated: false, isLoading: false });
    }
  },

  logout: async () => {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      // Silently catch logout errors
    } finally {
      set({ user: null, accessToken: null, isAuthenticated: false, isLoading: false });
    }
  },
}));
