import { Message } from "@mui/icons-material";

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
type Followers = {
  id: number;
  follower: User;
  following: User;
};
type Folllowings = {
  id: number;
  following: User;
  follower: User;
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

type UserWithoutProductsRelation = Omit<User, "products">;

export type ProductWithImageAndUser = {
  id: number;
  brand: string;
  category: "men" | "women";
  title: string;
  description: string;
  price: number;
  images: Image[];
  user: UserWithoutProductsRelation;
};

export type UserWithFollows = User & {
  followers?: Followers[];
  followings?: Folllowings[];
};

export type Brand =
  | "Zara"
  | "Reserved"
  | "Nike"
  | "House"
  | "Adidas"
  | "4F"
  | "Calvin Klein"
  | "";

export type Message = {
  id: number;
  content: string;
  author: User;
};

export type Conversation = {
  id: number;
  creator: User;
  recipient: User;
  messages: Message[];
  lastMessageSent: Message;
  lastMessageSentAt: Date;
};

export type RecipientOfSidebarConversation = Omit<User, "products"> & {
  lastMessageSent: Message;
};
