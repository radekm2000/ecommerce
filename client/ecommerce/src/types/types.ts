import { Message } from "@mui/icons-material";
import { z } from "zod";

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

export type ProductWithImage = {
  id: number;
  brand: string;
  category: "men" | "women";
  title: string;
  description: string;
  price: number;
  images: Image[];
};

export type UserWithoutProductsRelation = Omit<User, "products">;

export type ProductWithImageAndUser = {
  id: number;
  brand: string;
  category: "Men" | "Women";
  title: string;
  description: string;
  price: number;
  images: Image[];
  user: UserWithoutProductsRelation;
};
export type UserProfile = {
  country: string;
  aboutYou: string;
};

export type ExtendedUserWithProfile = UserWithFollows & {
  profile?: UserProfile;
};

export type SingleProduct = {
  id: number;
  brand: string;
  category: "Men" | "Women" | "Unisex";
  title: string;
  description: string;
  price: number;
  images: Image[];
  user: User;
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
  lastMessageSentAt: string;
};

export type RecipientOfSidebarConversation = Omit<User, "products"> & {
  lastMessageSent: Message;
  lastMessageSentAt: string;
};
export type Image = {
  id: number;
  imageName: string;
  imageUrl: string;
};
export type FetchedNotifications = {
  isRead: boolean;
  sender: { id: number };
  receiver: { id: number };
  date?: string;
};

export type Notification = {
  isRead: boolean;
  senderId: number;
  receiverId: number;
  date?: string;
};
export type SimpleNotification = Omit<Notification, "receiverId" | "senderId">;

export const imageSchema = z.object({
  id: z.number(),
  imageName: z.string(),
  imageUrl: z.string(),
});
export const userSchema = z.object({
  id: z.number(),
  role: z.literal("admin").or(z.literal("user")),
  username: z.string(),
  googleId: z.string().or(z.undefined()).optional().nullable(),
  email: z.string(),
  avatar: z.string().or(z.undefined()).optional().nullable(),
});
const imagesSchema = z.array(imageSchema);

export const ProductWithImageAndUserSchema = z.object({
  id: z.number(),
  brand: z.string(),
  category: z.literal("Men").or(z.literal("Women")),
  title: z.string(),
  description: z.string(),
  price: z.number(),
  images: imagesSchema,
  user: userSchema,
});

export type ProductType = z.infer<typeof ProductWithImageAndUserSchema>;
