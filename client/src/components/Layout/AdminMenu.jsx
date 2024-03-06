import React from "react";
import { NavLink } from "react-router-dom";
import "../../styles/Admin-Dashboard.css";
const AdminMenu = () => {
  return (
    <>
      <div className="text-center ">
        <div className="adminpanel-body">
          <h1>Admin Panel</h1>
          <div className="adminpanel-body-container">
            <NavLink
              to="/dashboard/admin/create-category"
              className="list-group-item Navlink list-group-item-action"
            >
              Create Category
            </NavLink>
            <NavLink
              to="/dashboard/admin/create-product"
              className="list-group-item Navlink list-group-item-action"
            >
              Create Product
            </NavLink>
            <NavLink
              to="/dashboard/admin/products"
              className="list-group-item Navlink list-group-item-action"
            >
              Products
            </NavLink>
            <NavLink
              to="/dashboard/admin/orders"
              className="list-group-item Navlink list-group-item-action"
            >
              Orders
            </NavLink>
            {/* <NavLink
            to="/dashboard/admin/users"
            className="list-group-item list-group-item-action"
          >
            Users
          </NavLink> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminMenu;
