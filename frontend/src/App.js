import React from "react";
import Home from "./screens/Home";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import { CartProvide } from "./components/ContextReducer";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import "../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import MyOrder from "./screens/MyOrder";


function App() {
  return (
    <CartProvide>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/createuser" element={< Signup/>} />
            <Route path="/myOrderData" element={< MyOrder/>} />
          </Routes>
        </div>
      </Router>
    </CartProvide>
  );
}

export default App;
