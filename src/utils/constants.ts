// API Configuration
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';
export const API_VERSION = 'v1';

// Application Routes
export const ROUTES = {
  HOME: '/',
  DASHBOARD: '/dashboard',
  PRODUCTS: '/products',
  CATEGORIES: '/categories',
  SALES: '/sales',
  INVENTORY: '/inventory',
  STOCK: '/stock',
  STORE_SERVICES: '/store-services',
} as const;

// API Endpoints
export const API_ENDPOINTS = {
  PRODUCTS: `${API_VERSION}/products`,
  CATEGORIES: `${API_VERSION}/categories`,
  SALES: `${API_VERSION}/sales`,
  INVENTORY_MOVEMENTS: `${API_VERSION}/inventory-movements`,
  STOCK_MOVEMENTS: `${API_VERSION}/stock-movements`,
  STORE_SERVICES: `${API_VERSION}/store-services`,
} as const;

// Pagination
export const DEFAULT_PAGE_SIZE = 10;
export const PAGE_SIZE_OPTIONS = [10, 20, 50, 100];

// Date Formats
export const DATE_FORMAT = 'DD/MM/YYYY';
export const DATETIME_FORMAT = 'DD/MM/YYYY HH:mm';

// Toast/Notification durations (in milliseconds)
export const NOTIFICATION_DURATION = 3000;
