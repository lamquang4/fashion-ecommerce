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
  variants: Inventory[];
  createdAt: string;
  totalSold?: number;
  totalQuantity?: number;
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
  city: string;
}

export interface Order {
  _id: string;
  orderCode: string;
  user: string;
  fullname: string;
  phone: string;
  speaddress: string;
  city: string;
  ward: string;
  paymethod: number;
  coupon?: string;
  status: number;
  total: number;
  createdAt: string;
}

export interface OrderFull {
  _id: string;
  orderCode: string;
  user: string;
  fullname: string;
  phone: string;
  speaddress: string;
  city: string;
  ward: string;
  paymethod: number;
  coupon?: {
    _id: string;
    code: string;
    discountValue: number;
    discountType: number;
    amount: number;
    limit: number;
    startDate: Date;
    expiryDate: Date;
    maxDiscountValue?: number;
    minOrderValue: number;
  };
  productsBuy: {
    product: {
      _id: string;
      name: string;
    };
    variant: {
      images: string[];
      size: {
        _id: string;
        namesize: string;
      };
      color: {
        _id: string;
        namecolor: string;
        codecolor: string;
      };
    };
    quantity: number;
    price: number;
    discount: number;
  }[];
  status: number;
  total: number;
  createdAt?: string;
}

export interface Revenue {
  month: number;
  totalRevenue: number;
  totalQuantity: number;
}
