import React from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import { useAuth } from "../../context/auth";
import "../../styles/Admin-Dashboard.css";

const UserDashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout title={"Dashboard - Ecommerce App"}>
      <div className="adminD-body">
        <div className="adminD-container">
          <div className=" AdminPanel">
            <UserMenu />
          </div>
          <div className="vLine"></div>
          <div className="AdminDetails-container">
            <h1>User details</h1>
            <div className="card AdminDetails w-75 p-3">
              <h3>{auth?.user?.name}</h3>
              <h3>{auth?.user?.email}</h3>
              <h3>{auth?.user?.address}</h3>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserDashboard;
