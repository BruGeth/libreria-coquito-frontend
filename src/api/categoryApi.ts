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
  const response = await http.get<PaginatedResponse<Category>>(CATEGORY_ENDPOINT, {
    params: { page, size },
  });
  
  console.log('✅ Respuesta del backend recibida:', {
    esArray: Array.isArray(response),
    tipo: typeof response,
    primeraCategoria: Array.isArray(response) 
      ? response[0] 
      : response.content?.[0],
  });
  
  // Verificar si el campo 'active' viene del backend
  const firstCategory = Array.isArray(response) 
    ? response[0] 
    : response.content?.[0];
    
  if (firstCategory) {
    console.log('🔍 Verificación del campo "active":', {
      id: firstCategory.id,
      name: firstCategory.name,
      active: firstCategory.active,
      activeType: typeof firstCategory.active,
      activeDefined: firstCategory.active !== undefined,
      estado: firstCategory.active !== undefined ? 'Campo "active" presente ✅' : '❌ Campo "active" NO presente',
    });
  }
  
  // Handle both paginated and array responses
  if (Array.isArray(response)) {
    return response as any;
  }
  
  return response;
};

/**
 * Get category by ID
 */
export const getCategoryById = async (id: number): Promise<Category> => {
  const category = await http.get<Category>(`${CATEGORY_ENDPOINT}/${id}`);
  console.log('✅ Categoría obtenida por ID:', {
    id: category.id,
    name: category.name,
    active: category.active,
    activeType: typeof category.active,
  });
  return category;
};

/**
 * Create new category
 */
export const createCategory = async (
  category: CreateCategoryDTO
): Promise<Category> => {
  const created = await http.post<Category>(CATEGORY_ENDPOINT, category);
  console.log('✅ Categoría creada:', {
    id: created.id,
    name: created.name,
    active: created.active,
    activeType: typeof created.active,
  });
  return created;
};

/**
 * Update existing category
 */
export const updateCategory = async (
  id: number,
  category: UpdateCategoryDTO
): Promise<Category> => {
  const updated = await http.put<Category>(`${CATEGORY_ENDPOINT}/${id}`, category);
  console.log('✅ Categoría actualizada:', {
    id: updated.id,
    name: updated.name,
    active: updated.active,
    activeType: typeof updated.active,
  });
  return updated;
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
  const categories = await http.get<Category[]>(`${CATEGORY_ENDPOINT}/active`);
  console.log('✅ Categorías activas obtenidas:', {
    cantidad: categories.length,
    primeraCategoria: categories[0],
  });
  return categories;
};
