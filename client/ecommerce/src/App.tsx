import { Toaster } from "react-hot-toast";
import { Login } from "./components/pages/Login";
import { Register } from "./components/pages/Register";
import { Redirect, Route, Switch } from "wouter";
import { MainPage } from "./components/pages/MainPage";
import { UserProvider } from "./contexts/UserContext";
import { AddProduct } from "./components/pages/AddProduct";
import { Navbar } from "./components/Navbar";
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
          <Route path="/products/new">
            <Navbar />
            <AddProduct />
          </Route>
          <Route path="/:rest*">{() => <Redirect to="/" />}</Route>
        </Switch>
        <Toaster />
      </UserProvider>
    </>
  );
}

export default App;
