export type RegisterInput = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type LoginInput = {
  username: string;
  password: string;
};

export type User = {
  id: number;
  username: string;
  googleId?: string;
  email: string;
  role: "admin" | "user";
  avatar?: string;
  products?: Product[];
};

export type Product = {
  id: number;
  brand: string;
  category: "men" | "women";
  title: string;
  description: string;
  price: number;
};

export type LoginResponseData = {
  accessToken: string;
  user: User;
};

export type Image = {
  id: number;
  imageName: string;
  imageUrl: string;
};

export type ProductWithImage = {
  id: number;
  brand: string;
  category: "men" | "women";
  title: string;
  description: string;
  price: number;
  images: Image[];
};

type UserWithoutProductsRelation = Omit<User, 'products'>

export type ProductWithImageAndUser = {
  id: number;
  brand: string;
  category: "men" | "women";
  title: string;
  description: string;
  price: number;
  images: Image[];
  user: UserWithoutProductsRelation
}