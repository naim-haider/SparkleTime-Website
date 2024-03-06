import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate, useLocation, Link } from "react-router-dom";
// import "../../styles/AuthStyles.css";
import "../../styles/ModifiedStyle.css";
import { useAuth } from "../../context/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  // CREATING LOGIN USER FUNCTION
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/api/auth/login", {
        email,
        password,
      });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/"); // here we are checking the user search history from location state where he wanted to go before login from spinner component
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log("error in register page in catch", error);
      toast.error("error in register page in catch");
    }
  };
  return (
    // <Layout title={"Register - Ecommerce App"}>
    <div className="body">
      <div className="box">
        <form onSubmit={handleSubmit}>
          <h1>LOGIN FORM</h1>
          <div className="inputBx">
            <span></span>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="Email"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="inputBx">
            <span></span>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              placeholder="Password"
              id="exampleInputPassword1"
            />
          </div>
          <div className="inputBx">
            <button type="submit">Login</button>
          </div>
          <div className="group">
            <Link to={"/forgot-password"} className="link1">
              Forgot Password
            </Link>
            <Link to={"/register"} className="link1">
              Signup
            </Link>
          </div>
        </form>
      </div>
    </div>
    // </Layout>
  );
};

export default Login;
