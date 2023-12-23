import { Toaster } from "react-hot-toast";
import { Login } from "./components/pages/Login";
import { Register } from "./components/pages/Register";

function App() {
  return (
    <>
      <Register />
      <Toaster />
    </>
  );
}

export default App;
