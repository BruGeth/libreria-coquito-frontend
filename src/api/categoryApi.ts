import { http } from '../utils/http';
import type { Category, CreateCategoryDTO, UpdateCategoryDTO } from '../types/category';
import type { PaginatedResponse } from '../types';
import { API_ENDPOINTS } from '../utils/constants';

const CATEGORY_ENDPOINT = API_ENDPOINTS.CATEGORIES;

/**
 * Get all categories with pagination
 */
export const getCategories = async (
  page: number = 0,
  size: number = 10
): Promise<PaginatedResponse<Category>> => {
  return http.get<PaginatedResponse<Category>>(CATEGORY_ENDPOINT, {
    params: { page, size },
  });
};

/**
 * Get category by ID
 */
export const getCategoryById = async (id: number): Promise<Category> => {
  return http.get<Category>(`${CATEGORY_ENDPOINT}/${id}`);
};

/**
 * Create new category
 */
export const createCategory = async (
  category: CreateCategoryDTO
): Promise<Category> => {
  return http.post<Category>(CATEGORY_ENDPOINT, category);
};

/**
 * Update existing category
 */
export const updateCategory = async (
  id: number,
  category: UpdateCategoryDTO
): Promise<Category> => {
  return http.put<Category>(`${CATEGORY_ENDPOINT}/${id}`, category);
};

/**
 * Delete category
 */
export const deleteCategory = async (id: number): Promise<void> => {
  return http.delete<void>(`${CATEGORY_ENDPOINT}/${id}`);
};

/**
 * Get all active categories (without pagination)
 */
export const getActiveCategories = async (): Promise<Category[]> => {
  return http.get<Category[]>(`${CATEGORY_ENDPOINT}/active`);
};
