// eslint-disable-next-line
// import { Modal } from "bootstrap/dist/js/bootstrap.bundle";
import Modal from "../Modal";
import React, { useState } from "react";
import { Badge } from "react-bootstrap"; // This is for badge on My Cart Button
import { Link, useNavigate } from "react-router-dom";
import Cart from "../screens/Cart";
import { useCart } from "./ContextReducer";
{
  /* This component and Footer component both are reusable so I created them in the separate components folder. Both of these will be used multiple times. */
}
function Navbar() {
  let data = useCart();
  const [cartView, setCartView] = useState(false);
  const navigate = useNavigate();
  function handleLogOut() {
    localStorage.removeItem("authToken");
    navigate("/login");
  }

  const loadCart = () => {
    setCartView(true)
}



  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-danger navbar-dark">
        <div className="container-fluid">
          <Link className="navbar-brand fs-1" to="/">
            Eat24
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              {localStorage.getItem("authToken") ? (
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/myOrderData">
                    My Orders
                  </Link>
                </li>
              ) : (
                ""
              )}
            </ul>
            <div>
              {!localStorage.getItem("authToken") ? (
                <div>
                  <Link className="btn bg-white text-danger me-2" to="/login">
                    Login
                  </Link>
                  <Link
                    className="btn bg-white text-danger me-2"
                    to="/createuser"
                  >
                    SignUp
                  </Link>
                </div>
              ) : (
                <div>
                  <div className="btn bg-white text-success me-2" onClick={loadCart}>
                    My Cart {" "}
                    {data.length !== 0 ? <Badge pill bg="danger">{data.length}</Badge> : null}
                  </div>
                  {
                    cartView?<Modal onClose={()=>setCartView(false)}><Cart /></Modal>:null
                  }
                  <div
                    className="btn bg-white text-danger me-2"
                    onClick={handleLogOut}
                  >
                    LogOut
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
