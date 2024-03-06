import React from "react";
import Layout from "./../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { useAuth } from "../../context/auth";
import "../../styles/Admin-Dashboard.css";

const AdminDashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout>
      <div className=" adminD-body">
        <div className="adminD-container">
          <div className=" AdminPanel">
            <AdminMenu />
          </div>
          <div className="vLine"></div>
          <div className="AdminDetails-container">
            <h1>Admin details</h1>
            <div className="card AdminDetails w-75 p-3">
              <h3>Admin Name : {auth?.user?.name}</h3>
              <h3>Admin Email : {auth?.user?.email}</h3>
              <h3>Admin Contact : {auth?.user?.phone}</h3>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
