
export type UserRole = 'admin' | 'client' | 'vip';

/** Statut d'une commande — cycle de vie linéaire (sauf 'canceled'). */
export type OrderStatus =
  | 'pending'    // créée, pas payée
  | 'paid'       // paiement validé
  | 'shipped'    // expédiée
  | 'delivered'  // livrée
  | 'canceled';  // annulée (peut intervenir avant 'shipped')

/** Devises supportées par la boutique. */
export type Currency = 'EUR' | 'USD' | 'GBP' | 'JPY' | 'CAD';

/** Catégories produits affichées dans le menu. */
export type ProductCategory = 'electronics' | 'clothing' | 'home' | 'books';


/** Utilisateur enregistré sur ZotoShop. */
export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  createdAt: string;        // ISO 8601 → format API REST standard, pas Date
  lastLoginAt?: string;     // ? = optionnel (peut être absent de la réponse API)
}

/** Produit du catalogue ZotoShop. */
export interface Product {
  id: number;
  sku: string;              // référence unique humaine, ex: "MBP-M4-2024"
  name: string;
  description: string;
  price: number;
  currency: Currency;
  category: ProductCategory;
  inStock: boolean;
  stockQuantity: number;
  imageUrl: string | null;  // null = produit sans image (cas réel API). On creuse en L1.5.
}

/** Une ligne du panier — produit + quantité. */
export interface CartItem {
  product: Product;
  quantity: number;
  addedAt: string;
}

/** Le panier d'un utilisateur (avant transformation en Order). */
export interface Cart {
  id: string;
  userId: number;
  items: CartItem[];
  totalAmount: number;
  currency: Currency;
  updatedAt: string;
}

/** Commande validée — issue d'un Cart payé. */
export interface Order {
  id: number;
  userId: number;
  status: OrderStatus;
  items: CartItem[];
  totalAmount: number;
  currency: Currency;
  createdAt: string;
  shippedAt: string | null;    // null tant que pas expédiée
  deliveredAt: string | null;  // null tant que pas livrée
}


/** Identifiants de connexion — passés à `loginAs()`. */
export interface LoginCredentials {
  email: string;
  password: string;
}

/** Format standard d'erreur retournée par l'API ZotoShop. */
export interface ApiError {
  message: string;
  code: number;
  details?: Record<string, string>;  // dictionnaire flexible (champ → message)
}
