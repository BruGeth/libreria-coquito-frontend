// Common Types
export interface BaseEntity {
  id: number;
  createdAt?: string;
  updatedAt?: string;
}

// API Response Types
export interface PaginatedResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

// Product Types
export interface Product extends BaseEntity {
  name: string;
  description?: string;
  price: number;
  stock: number;
  categoryId: number;
  categoryName?: string;
  barcode?: string;
  sku?: string;
  active: boolean;
}

// Category Types
export interface Category extends BaseEntity {
  name: string;
  description?: string;
  active: boolean;
}

// Sale Types
export interface Sale extends BaseEntity {
  saleDate: string;
  totalAmount: number;
  customerName?: string;
  customerDocument?: string;
  items: SaleItem[];
}

export interface SaleItem {
  id?: number;
  productId: number;
  productName?: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

// Movement Types
export type MovementType = 'IN' | 'OUT' | 'ADJUSTMENT';

export interface InventoryMovement extends BaseEntity {
  productId: number;
  productName?: string;
  movementType: MovementType;
  quantity: number;
  movementDate: string;
  reason?: string;
  reference?: string;
}

export interface StockMovement extends BaseEntity {
  productId: number;
  productName?: string;
  movementType: MovementType;
  quantity: number;
  previousStock: number;
  newStock: number;
  movementDate: string;
  notes?: string;
}

// Store Service Types
export interface StoreService extends BaseEntity {
  name: string;
  description?: string;
  price: number;
  active: boolean;
}

// Form Types
export type FormMode = 'create' | 'edit' | 'view';

// Filter Types
export interface FilterOptions {
  search?: string;
  page?: number;
  size?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}
