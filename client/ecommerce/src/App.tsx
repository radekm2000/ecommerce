import { Toaster } from "react-hot-toast";
import { Login } from "./components/pages/Login";
import { Register } from "./components/pages/Register";
import { Redirect, Route, Switch } from "wouter";
import { MainPage } from "./components/pages/MainPage";
import { UserProvider } from "./contexts/UserContext";
import { AddProduct } from "./components/pages/AddProduct";
import { Product } from "./components/pages/Product";
import { Member } from "./components/pages/Member";
import { Followers } from "./components/pages/Followers";
import { Followings } from "./components/pages/Followings";
import { MenCatalog } from "./components/pages/MenCatalog";
import { WomenCatalog } from "./components/pages/WomenCatalog";
import { Inbox } from "./components/pages/Inbox";
import SearchTextResults from "./components/pages/SearchTextResults";
import { EditProfile } from "./components/pages/EditProfile";
import { ProductProvider } from "./contexts/ProductContext";
import { PaymentSuccess } from "./components/pages/PaymentSuccess";
import { PaymentCancel } from "./components/pages/PaymentCancel";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { ChatNotificationsProvider } from "./contexts/ChatNotificationsContext";
import { ProductNotificationProvider } from "./contexts/ProductNotificationContext";
import { Layout } from "./components/Layout";
import { AdminDashboard } from "./components/pages/AdminDashboard";
import { RoutePath } from "./config/constants/navigation";
import { Routes } from "./routes/Routes";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

function App() {
  return (
    <>
      <UserProvider>
        <ProductProvider>
          <ChatNotificationsProvider>
            <ProductNotificationProvider>
              <Elements stripe={stripePromise}>
                <Routes />
                <Toaster />
              </Elements>
            </ProductNotificationProvider>
          </ChatNotificationsProvider>
        </ProductProvider>
      </UserProvider>
    </>
  );
}

export default App;
