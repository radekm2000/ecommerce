import { Toaster } from "react-hot-toast";
import { UserProvider } from "./contexts/UserContext";
import { ProductProvider } from "./contexts/ProductContext";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { ChatNotificationsProvider } from "./contexts/ChatNotificationsContext";
import { ProductNotificationProvider } from "./contexts/ProductNotificationContext";
import { Routes } from "./routes/Routes";
import { ScrollToTop } from "./components/ScrollToTop";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

function App() {
  return (
    <>
      <UserProvider>
        <ProductProvider>
          <ChatNotificationsProvider>
            <ProductNotificationProvider>
              <Elements stripe={stripePromise}>
                <ScrollToTop />
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
