export interface User {
  _id?: string;
  fullname: string;
  email: string;
  phone: string;
  birthday: string;
  password: string;
  role?: number;
  status?: number;
  createdAt?: string;
}

export interface Color {
  _id?: string;
  namecolor: string;
  codecolor: string;
  createdAt?: string;
}

export interface Size {
  _id?: string;
  namesize: string;
  createdAt?: string;
}

export interface Coupon {
  _id?: string;
  code: string;
  discountValue: number;
  discountType: number;
  amount: number;
  limit: number;
  startDate: Date;
  expiryDate: Date;
  maxDiscountValue?: number;
  minOrderValue: number;
  status?: number;
}

export interface Category {
  _id?: string;
  namecategory: string;
  gender: number;
  image: string;
  slug: string;
  status?: number;
  totalProduct?: number;
  totalProductActive?: number;
  createdAt?: string;
}

export interface Banner {
  _id: string;
  image: string;
  type: number;
  status: number;
  createdAt?: string;
}

export interface Product {
  _id: string;
  name: string;
  price: number;
  discount: number;
  description: string;
  slug: string;
  status: number;
  category: Category;
  images: string[];
  createdAt: string;
  totalSold?: number;
  totalQuantity?: number;
}

export interface Product1 {
  name: string;
  price: number;
  discount: number;
  description: string;
  category: string;
  variants: InventoryItem[];
}

export interface InventoryItem {
  _id: string;
  images: string[];
  color: string;
  inventories: {
    size: string;
    quantity: number;
  }[];
}

export interface Inventory {
  _id: string;
  product: Product;
  images: string[];
  color: Color;
  inventories: {
    size: Size;
    quantity: number;
  }[];
  createdAt?: string;
}

export interface Address {
  fullname: string;
  phone: string;
  speaddress: string;
  ward: string;
  district: string;
  city: string;
}

export interface Order {
  _id: string;
  orderCode: string;
  user: string;
  address: {
    fullname: string;
    phone: string;
    speaddress: string;
    city: string;
    district: string;
    ward: string;
  };
  paymethod: number;
  coupon?: string;
  status: number;
  total: number;
  createdAt: string;
}

export interface BuyItems {
  product: Product;
  size: Size;
  color: Color;
  quantity: number;
  price: number;
  subtotal: number;
}

export interface OrderDetail {
  _id: string;
  order: Order;
  buy: BuyItems[];
}
