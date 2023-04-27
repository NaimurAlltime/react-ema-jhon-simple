import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../providers/AuthProviders";
import "./SignUp.css";

const SignUp = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  //  usePasswordToggle
  const [visible, setVisible] = useState(false);

  const { createUser } = useContext(AuthContext);

  const handleSignUp = (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;
    console.log(email, password, confirmPassword);

    // password validation with regular expression
    if (!/(?=.*[A-Z])/.test(password)) {
      setError("Please add at least one uppercase");
      return;
    } else if (!/(?=.*[0-9].*[0-9])/.test(password)) {
      setError("Please add at least two numbers");
      return;
    } else if (!/(?=.*[!@#$&*])/.test(password)) {
      setError("Please add at least one special character");
      return;
    } else if (password.length < 6) {
      setError("Please add at least 6 characters in your password");
      return;
    } else if (password !== confirmPassword) {
      setError("Password and confirm Password does not match");
      return;
    }

    // createUserWithEmailAndPassword
    createUser(email, password)
      .then((result) => {
        const loggedUser = result.user;
        console.log(loggedUser);
        setSuccess("User has been created successful!");
        form.reset();
      })
      .catch((error) => {
        console.log(error.message);
        setError(error.message);
      });
  };

  return (
    <div className="form-container sign-up-container">
      <h2 className="form-title">Sign Up</h2>
      <form onSubmit={handleSignUp}>
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
        </div>
        <div className="form-control">
          <label htmlFor="">Confirm Password</label>
          <input
            type={visible ? "text" : "password"}
            name="confirmPassword"
            id="confirmPassword"
            required
          />
          <span
            onClick={() => setVisible(!visible)}
            // className="password-toggle-icon2"
          >
            {visible ? <p>Hide Password</p> : <p>Show Password</p>}
          </span>
        </div>
        <p className="text-error">{error}</p>
        <p className="text-success">{success}</p>
        <div className="form-control">
          {/* <input className="login-btn" type="submit" value="Login" /> */}
          <button className="login-btn">Sign Up</button>
        </div>
      </form>
      <p className="new-account">
        Already have an account? <Link to="/login">Login</Link>{" "}
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

export default SignUp;
