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
  chest: [number, number];
  waist: [number, number];
  hip: [number, number];
  height: [number, number];
  weight: [number, number];
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

export interface Variant {
  _id: string;
  product: {
    _id: string;
    name: string;
  };
  images: string[];
  color: {
    _id: string;
    namecolor: string;
    codecolor: string;
  };
  inventories: {
    size: {
      _id: string;
      namesize: string;
    };
    quantity: number;
  }[];
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
  category: {
    _id: string;
    namecategory: string;
    gender: number;
  };
  variants: Variant[];
  createdAt: string;
  totalSold?: number;
  totalQuantity?: number;
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
  paymethod: string;
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
  paymethod: string;
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

export interface Blog {
  _id: string;
  title: string;
  slug: string;
  image: string;
  summary: string;
  content: string;
  status: number;
  createdAt?: string;
}

export interface Revenue {
  month: number;
  totalRevenue: number;
  totalQuantity: number;
}

export interface Banner {
  _id: string;
  image: string;
  type: number;
  status: number;
  createdAt?: string;
}
