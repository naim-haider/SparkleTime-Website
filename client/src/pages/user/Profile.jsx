import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import axios from "axios";
// import "../../styles/userProfile.css";
import "../../styles/createProduct.css";

const UserProfile = () => {
  //CONTEXT
  const [auth, setAuth] = useAuth();
  //STATE
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  //GET USER DATA
  useEffect(() => {
    const { email, name, phone, address } = auth?.user;
    setName(name);
    setPhone(phone);
    setEmail(email);
    setAddress(address);
  }, [auth?.user]);

  //  UPDATE PROFILE FUNCTION
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        "http://localhost:8080/api/auth/profile",
        {
          name,
          email,
          password,
          phone,
          address,
        }
      );
      if (data?.errro) {
        toast.error(data?.error);
      } else {
        setAuth({ ...auth, user: data?.updatedUser });
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success("Profile Updated Successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <Layout title={"Your Profile"}>
      <div className="container-fluid createProduct-container ">
        <div className="createProduct-flex row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9 createP-flex">
            <div className="m-1 w-75 createP-select-div ">
              <form onSubmit={handleSubmit}>
                <h1 className="title">USER PROFILE</h1>
                <div className="">
                  <div className="mb-3">
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="form-control email-input createP-input"
                      id="exampleInputEmail1"
                      placeholder="Enter Your Name"
                      autoFocus
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className=" email-input form-control  createP-input"
                      id="exampleInputEmail1"
                      placeholder="Enter Your Email "
                      disabled
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="form-control email-input createP-input"
                      id="exampleInputPassword1"
                      placeholder="Enter Your Password"
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="form-control email-input createP-input"
                      id="exampleInputEmail1"
                      placeholder="Enter Your Phone"
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="form-control email-input createP-input"
                      id="exampleInputEmail1"
                      placeholder="Enter Your Address"
                    />
                  </div>
                  <button type="submit" className="createProduct-btn">
                    UPDATE
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserProfile;
