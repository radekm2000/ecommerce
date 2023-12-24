import { Toaster } from "react-hot-toast";
import { Login } from "./components/pages/Login";
import { Register } from "./components/pages/Register";
import { Redirect, Route, Switch } from "wouter";

function App() {
  return (
    <>
      <Switch>
        <Route path="/" component={Login}></Route>
        <Route path="/register" component={Register}></Route>
        <Route path="/:rest*">{() => <Redirect to="/" />}</Route>
      </Switch>

      <Toaster />
    </>
  );
}

export default App;
