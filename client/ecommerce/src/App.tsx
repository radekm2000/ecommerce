import { Toaster } from "react-hot-toast";
import { Login } from "./components/pages/Login";
import { Register } from "./components/pages/Register";
import { Redirect, Route, Switch } from "wouter";
import { MainPage } from "./components/pages/MainPage";
import { useEffect } from "react";
function App() {
  return (
    <>
      <Switch>
        <Route path="/" component={MainPage}></Route>
        <Route path="/login" component={Login}></Route>
        <Route path="/register" component={Register}></Route>
        <Route path="/:rest*">{() => <Redirect to="/" />}</Route>
      </Switch>

      <Toaster />
    </>
  );
}

export default App;
