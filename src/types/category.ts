import type { BaseEntity } from './index';

export interface Category extends BaseEntity {
  name: string;
  description?: string;
  active: boolean;
}

export interface CreateCategoryDTO {
  name: string;
  description?: string;
  active?: boolean;
}

export interface UpdateCategoryDTO {
  name?: string;
  description?: string;
  active?: boolean;
}
