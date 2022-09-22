import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/user/home/Home";
import Hotel from "./pages/user/hotel/Hotel";
import List from "./pages/user/list/List";
import Login from "./pages/user/login/Login";
import Signup from "./pages/user/signup/Signup";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hotels" element={<List />} />
        <Route path="/hotels/:id" element={<Hotel />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
