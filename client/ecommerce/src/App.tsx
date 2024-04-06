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
import { FeedbackNotifications } from "./components/AdminDashboard/FeedbackNotifications";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

function App() {
  // return (
  //   <>
  //     <UserProvider>
  //       <ProductProvider>
  //         <ChatNotificationsProvider>
  //           <ProductNotificationProvider>
  //             <Elements stripe={stripePromise}>
  //               <Switch>
  //                 <Route path="/register" component={Register}></Route>
  //                 <Route path="/login" component={Login}></Route>
  //                 <Route path="/">
  //                   <Navbar />
  //                   <MainPage />
  //                 </Route>
  //                 <Route path="/products/:productId-:productTitle">
  //                   <Navbar />
  //                   <Product />
  //                 </Route>
  //                 <Route path="/members/:userId">
  //                   <Navbar />
  //                   <Member />
  //                 </Route>
  //                 <Route path="/products/new">
  //                   <Navbar />
  //                   <AddProduct />
  //                 </Route>
  //                 <Route path="/members/:userId/followers">
  //                   <Navbar />
  //                   <Followers />
  //                 </Route>
  //                 <Route path="/settings/profile">
  //                   <Navbar />
  //                   <EditProfile />
  //                 </Route>
  //                 <Route path="/catalog/men">
  //                   <Navbar />
  //                   <MenCatalog />
  //                 </Route>
  //                 <Route path="/catalog/women">
  //                   <Navbar />
  //                   <WomenCatalog />
  //                 </Route>
  //                 <Route path="/q/:search_text?">
  //                   <Navbar />
  //                   <SearchTextResults />
  //                 </Route>
  //                 <Route path="/inbox/:userId*">
  //                   <Navbar />
  //                   <Inbox />
  //                 </Route>
  //                 <Route path="/success">
  //                   <PaymentSuccess />
  //                 </Route>
  //                 <Route path="/cancel">
  //                   <PaymentCancel />
  //                 </Route>

  //                 <Route path="/members/:userId/followings">
  //                   <Navbar />
  //                   <Followings />
  //                 </Route>
  //                 <Route path="/:rest*">{() => <Redirect to="/" />}</Route>
  //               </Switch>
  //               <Toaster />
  //             </Elements>
  //           </ProductNotificationProvider>
  //         </ChatNotificationsProvider>
  //       </ProductProvider>
  //     </UserProvider>
  //   </>
  // );
  return (
    <>
      <UserProvider>
        <ProductProvider>
          <ChatNotificationsProvider>
            <ProductNotificationProvider>
              <Elements stripe={stripePromise}>
                <Switch>
                  <Route path="/register" component={Register}></Route>
                  <Route path="/login" component={Login}></Route>
                  <Route path="/success">
                    <PaymentSuccess />
                  </Route>
                  <Route path="/cancel">
                    <PaymentCancel />
                  </Route>
                  <Layout>
                    <Route path="/">
                      <MainPage />
                    </Route>
                    <Route path="/products/:productId-:productTitle">
                      <Product />
                    </Route>
                    <Route path="/members/:userId">
                      <Member />
                    </Route>
                    <Route path="/products/new">
                      <AddProduct />
                    </Route>
                    <Route path="/members/:userId/followers">
                      <Followers />
                    </Route>
                    <Route path="/settings/profile">
                      <EditProfile />
                    </Route>
                    <Route path="/catalog/men">
                      <MenCatalog />
                    </Route>
                    <Route path="/catalog/women">
                      <WomenCatalog />
                    </Route>
                    <Route path="/q/:search_text?">
                      <SearchTextResults />
                    </Route>
                    <Route path="/inbox/:userId*">
                      <Inbox />
                    </Route>
                    <Route path="/dashboard/:tab">
                      <AdminDashboard />
                    </Route>

                    <Route path="/members/:userId/followings">
                      <Followings />
                    </Route>
                  </Layout>
                  <Route path="/:rest*">{() => <Redirect to="/" />}</Route>
                </Switch>
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
