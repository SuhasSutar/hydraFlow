import { create } from 'zustand';
import api from '../api/axios';

export const useProductStore = create((set, get) => ({
  models: [],
  categories: [],
  isLoading: false,
  error: null,
  pagination: { page: 1, limit: 50, total: 0, pages: 0 },

  // ── Fetch all product models ──
  fetchModels: async (params = {}) => {
    set({ isLoading: true, error: null });
    try {
      const res = await api.get('/products/models', { params });
      set({
        models: res.data.data,
        pagination: res.data.pagination || { page: 1, limit: 50, total: 0, pages: 0 },
        isLoading: false,
      });
      return { success: true };
    } catch (error) {
      set({ isLoading: false, error: error.response?.data?.message || 'Failed to load products' });
      return { success: false, error: error.response?.data?.message || 'Failed to load products' };
    }
  },

  // ── Create a new product model ──
  createModel: async (modelData) => {
    set({ isLoading: true, error: null });
    try {
      const res = await api.post('/products/models', modelData);
      const created = res.data.data;
      set((state) => ({
        models: [created, ...state.models],
        isLoading: false,
      }));
      return { success: true, data: created };
    } catch (error) {
      set({ isLoading: false, error: error.response?.data?.message || 'Failed to create model' });
      return { success: false, error: error.response?.data?.message || 'Failed to create model' };
    }
  },

  // ── Update an existing product model ──
  updateModel: async (id, modelData) => {
    set({ isLoading: true, error: null });
    try {
      const res = await api.put(`/products/models/${id}`, modelData);
      const updated = res.data.data;
      set((state) => ({
        models: state.models.map((m) => (m.id === id ? updated : m)),
        isLoading: false,
      }));
      return { success: true, data: updated };
    } catch (error) {
      set({ isLoading: false, error: error.response?.data?.message || 'Failed to update model' });
      return { success: false, error: error.response?.data?.message || 'Failed to update model' };
    }
  },

  // ── Delete a product model ──
  deleteModel: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await api.delete(`/products/models/${id}`);
      set((state) => ({
        models: state.models.filter((m) => m.id !== id),
        isLoading: false,
      }));
      return { success: true };
    } catch (error) {
      set({ isLoading: false, error: error.response?.data?.message || 'Failed to delete model' });
      return { success: false, error: error.response?.data?.message || 'Failed to delete model' };
    }
  },

  // ── Fetch categories ──
  fetchCategories: async () => {
    try {
      const res = await api.get('/products/categories');
      set({ categories: res.data.data });
      return { success: true };
    } catch (error) {
      return { success: false };
    }
  },

  clearError: () => set({ error: null }),
}));
