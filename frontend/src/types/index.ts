export type UserRole = 'admin' | 'client';

export interface User {
  username: string;
  role: UserRole;
  userId: string;
}

export interface AuthResponse {
  token: string;
}

export interface RegisterRequest {
  username: string;
  password: string;
  role: UserRole;
}

export interface LoginRequest {
  username: string;
  password: string;
}

// Product Types
export interface Product {
  itemId: string;
  title: string;
  price: number;
  imgUrl: string;
  stars: number;
  boughtInLastMonth: number;
  isBestSeller: boolean;
}

export interface CreateProductRequest {
  title: string;
  price: number;
  imgUrl: string;
  stars: number;
  boughtInLastMonth: number;
  isBestSeller: boolean;
}

export interface UpdateProductRequest extends CreateProductRequest {
  itemId: string;
}

// Cart Types
export interface CartItem {
  itemId: string;
  qty: number;
}

export interface Cart {
  products: CartItem[];
}

export interface AddToCartRequest {
  itemId: string;
  userId: string;
}

// API Response Types
export interface ApiResponse {
  message: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  lastKey?: string;
}

// API Error Types
export interface ApiError {
  status: number;
  message: string;
}

// Request Parameter Types
export interface PaginationParams {
  limit: number;
  lastKey?: string;
}

// State Types
export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface CartState {
  items: CartItem[];
  isLoading: boolean;
  error: string | null;
}

export interface ProductState {
  products: Product[];
  selectedProduct: Product | null;
  lastKey?: string;
  isLoading: boolean;
  error: string | null;
}