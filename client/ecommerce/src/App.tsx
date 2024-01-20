import { Toaster } from "react-hot-toast";
import { Login } from "./components/pages/Login";
import { Register } from "./components/pages/Register";
import { Redirect, Route, Switch } from "wouter";
import { MainPage } from "./components/pages/MainPage";
import { UserProvider } from "./contexts/UserContext";
import { AddProduct } from "./components/pages/AddProduct";
import { Navbar } from "./components/Navbar";
import { Product } from "./components/pages/Product";
import { Member } from "./components/pages/Member";
import { Followers } from "./components/pages/Followers";
import { Followings } from "./components/pages/Followings";
import { MenCatalog } from "./components/pages/MenCatalog";
import { WomenCatalog } from "./components/pages/WomenCatalog";
import { Inbox } from "./components/pages/Inbox";
function App() {
  return (
    <>
      <UserProvider>
        <Switch>
          <Route path="/register" component={Register}></Route>
          <Route path="/login" component={Login}></Route>
          <Route path="/">
            <Navbar />
            <MainPage />
          </Route>
          <Route path="/products/:productId-:productTitle">
            <Navbar />
            <Product />
          </Route>
          <Route path="/members/:userId">
            <Navbar />
            <Member />
          </Route>
          <Route path="/products/new">
            <Navbar />
            <AddProduct />
          </Route>
          <Route path="/members/:userId/followers">
            <Navbar />
            <Followers />
          </Route>
          <Route path="/catalog/men">
            <Navbar />
            <MenCatalog />
          </Route>
          <Route path="/catalog/women">
            <Navbar />
            <WomenCatalog />
          </Route>
          <Route path="/inbox/:userId*">
            <Navbar />
            <Inbox />
          </Route>
          <Route path="/members/:userId/followings">
            <Navbar />
            <Followings />
          </Route>
          <Route path="/:rest*">{() => <Redirect to="/" />}</Route>
        </Switch>
        <Toaster />
      </UserProvider>
    </>
  );
}

export default App;
