import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
// import "../../styles/AuthStyles.css";
import "../../styles/ModifiedStyle.css";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");

  const navigate = useNavigate();

  // CREATING REGISTER USER FUNCTION
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/api/auth/register", {
        name,
        email,
        password,
        phone,
        address,
        answer,
      });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        navigate("/login");
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
          <h1>REGISTER FORM</h1>
          <div className="inputBx">
            <span></span>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              placeholder="Name"
              id="exampleInputName1"
              aria-describedby="emailHelp"
            />
          </div>
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
            <span></span>
            <input
              onChange={(e) => setPhone(e.target.value)}
              value={phone}
              type="Number"
              placeholder="Phone no."
              id="exampleInputNumber1"
            />
          </div>
          <div className="inputBx">
            <span></span>
            <input
              onChange={(e) => setAddress(e.target.value)}
              value={address}
              type="text"
              placeholder="Address"
              id="exampleInputAddress1"
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
            />
          </div>
          <div className="inputBx">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
          <div className="group">
            <Link to={"/login"} className="link1 AlreadyUser">
              Already a user
            </Link>
          </div>
        </form>
      </div>
    </div>
    // </Layout>
  );
};

export default RegisterPage;
