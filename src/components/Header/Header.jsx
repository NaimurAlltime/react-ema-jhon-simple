import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import logo from "../../images/Logo.svg";
import { AuthContext } from "../providers/AuthProviders";
import "./Header.css";

const Header = () => {
  const { user, logOut } = useContext(AuthContext);
  console.log(user);

  const handleLogOut = () => {
    logOut()
      .then(() => {
        Swal.fire("Good job!", "Your Sign Out Successful!", "success");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <nav className="header">
      <Link to="/">
        <img src={logo} alt="" />
      </Link>
      <div className="menu">
        <Link to="/shop">Shop</Link>
        <Link to="/orders">Orders</Link>
        <Link to="/order_review">Order Review</Link>
        <Link to="/inventory">Manage Inventory</Link>
        <Link to="/sign-up">Sign Up</Link>
        {/* <Link to="/login">Login</Link> */}
        {user ? (
          <>
            <Link> {user.email} </Link>
            <button onClick={handleLogOut}>Sign Out</button>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Header;
