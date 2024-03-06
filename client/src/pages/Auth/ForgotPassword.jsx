import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/AuthStyles.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [answer, setAnswer] = useState("");

  const navigate = useNavigate();

  // CREATING FORGOT PASSWORD FUNCTION
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8080/api/auth/forgot-password",
        {
          email,
          newPassword,
          answer,
        }
      );
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        navigate("/login"); // here we are checking the user search history from location state where he wanted to go before login from spinner component
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log("error in forgot-password page in catch", error);
      toast.error("error in forgot-password page in catch");
    }
  };
  return (
    // <Layout title={"Forgot Password - Ecommerce APP"}>
    <div className="body">
      <div className="box">
        <form onSubmit={handleSubmit}>
          <h1>RESET PASSWORD</h1>
          <div className="inputBx">
            <span></span>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="Email"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              required
            />
          </div>
          <div className="inputBx">
            <span></span>
            <input
              onChange={(e) => setNewPassword(e.target.value)}
              value={newPassword}
              type="password"
              placeholder="New Password"
              id="exampleInputPassword1"
              required
            />
          </div>
          <div className="inputBx">
            <span></span>
            <input
              onChange={(e) => setAnswer(e.target.value)}
              value={answer}
              type="text"
              placeholder="What is Your Favourite Game"
              id="exampleInputAnswer1"
              required
            />
          </div>
          <div className="inputBx">
            <button type="submit" className="btn btn-primary">
              Reset
            </button>
          </div>
          <div className="group">
            <Link to={"/login"} className="link1 loginForgot">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
    // </Layout>
  );
};

export default ForgotPassword;
