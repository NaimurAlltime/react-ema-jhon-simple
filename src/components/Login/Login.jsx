import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProviders";
import "./Login.css";

const Login = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  //  usePasswordToggle
  const [visible, setVisible] = useState(false);

  const { loginUser } = useContext(AuthContext);

  const from = location.state?.from?.pathname || "/";

  const handleLogin = (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);

    // sign in user
    loginUser(email, password)
      .then((result) => {
        const loggedUser = result.user;
        console.log(loggedUser);
        setSuccess("User has been created successful!");
        form.reset();
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.log(error.message);
        setError(error.message);
      });
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Login</h2>
      <form onSubmit={handleLogin}>
        <div className="form-control">
          <label htmlFor="">Email</label>
          <input type="email" name="email" id="email" required />
        </div>
        <div className="form-control">
          <label htmlFor="">Password</label>
          <input
            type={visible ? "text" : "password"}
            name="password"
            id="password"
            required
          />
          <span
            onClick={() => setVisible(!visible)}
            className="password-toggle-icon2"
          >
            {visible ? (
              <VisibilityOffOutlinedIcon />
            ) : (
              <VisibilityOutlinedIcon />
            )}
          </span>
        </div>
        <p className="text-error">{error}</p>
        <p className="text-success">{success}</p>
        <div className="form-control">
          {/* <input className="login-btn" type="submit" value="Login" /> */}
          <button className="login-btn">Login</button>
        </div>
      </form>
      <p className="new-account">
        New to Ema-john? <Link to="/sign-up">Create New Account</Link>{" "}
      </p>
      <div className="hr">
        <hr />
      </div>
      <div className="form-control signIn-container">
        {/* <input className="login-btn" type="submit" value="Login" /> */}
        <img
          className="icon"
          src="https://cdn.iconscout.com/icon/free/png-512/free-google-160-189824.png?f=avif&w=256"
          alt=""
        />
        <button className="google-signIn-btn">Continue with Google</button>
      </div>
    </div>
  );
};

export default Login;
