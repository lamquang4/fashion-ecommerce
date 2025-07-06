export interface User {
  _id: string;
  fullname: string;
  email: string;
  phone: string;
  birthday: string;
  password: string;
  role: number;
  status: number;
  createdAt: string;
}

export interface Color {
  _id: string;
  namecolor: string;
  codecolor: string;
}

export interface Size {
  _id: string;
  namesize: string;
}

export interface Category {
  _id: string;
  namecategory: string;
  gender: number;
  image: string;
  slug: string;
  status: number;
  productCount?: number;
}

export interface Product {
  _id: string;
  name: string;
  price: number;
  discount: number;
  description: string;
  image: string[];
  slug: string;
  status: number;
  category: Category;
  inventories: Inventory[];
}

export interface Inventory {
  _id: string;
  product: string;
  color: Color;
  size: Size;
  quantity: number;
}

export interface Coupon {
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
  status: number;
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

export interface Banner {
  _id: string;
  image: string;
  type: number;
  status: number;
  createdAt: string;
}

export interface ProductInCart {
  _id: string;
  name: string;
  price: number;
  image: string[];
  slug: string;
  inventory: {
    size: Size;
    color: Color;
    quantity: number;
  };
}

export interface Cart {
  productsInCart: ProductInCart[];
  total: number;
}

export interface ProductWithColors extends Product {
  colors: Color[];
}

export interface ProductInWishlist {
  _id: string;
  name: string;
  price: number;
  image: string[];
  slug: string;
}

export interface Wishlist {
  productsInWishlist: ProductInWishlist[];
}

export type Ward = {
  name: string;
  mergedFrom: string[];
};

export type Province = {
  id: string;
  province: string;
  wards: Ward[];
};
