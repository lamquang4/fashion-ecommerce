export interface User {
  _id?: string;
  fullname: string;
  email: string;
  phone: string;
  birthday: string;
  password?: string;
  role?: number;
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
  slug: string;
  status: number;
  category: Category;
  variants: Inventory[];
  createdAt?: string;
}

export interface Inventory {
  _id: string;
  product: string;
  images: string[];
  color: Color;
  inventories: {
    size: Size;
    quantity: number;
  }[];
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
  _id?: string;
  fullname: string;
  phone: string;
  speaddress: string;
  ward: string;
  city: string;
  user?: string;
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
      price: number;
      discount: number;
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
  createdAt: string;
}

export interface OrderAdd {
  fullname: string;
  phone: string;
  speaddress: string;
  city: string;
  ward: string;
  paymethod: number;
  coupon?: string;
  productsBuy: {
    product: string;
    size: string;
    color: string;
    quantity: number;
    price: number;
    discount?: number;
  }[];
  total: number;
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
  discount: number;
  slug: string;
  variant: {
    _id: string;
    images: string[];
    stock: number;
    color: Color;
    size: Size;
    quantity: number;
  };
}

export interface Cart {
  _id?: string;
  user?: string;
  productsInCart: ProductInCart[];
}

export interface ProductInWishlist {
  _id: string;
  name: string;
  slug: string;
  variant: {
    _id: string;
    images: string[];
    color: Color;
  };
}

export interface Wishlist {
  _id?: string;
  user?: string;
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
