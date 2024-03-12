import React from "react";
import { NavLink } from "react-router-dom";
import "../../styles/Admin-Dashboard.css";

const UserMenu = () => {
  return (
    <>
      <div className="text-center">
        <div className="adminpanel-body">
          <h1>Dashboard</h1>
          <div className="adminpanel-body-container">
            <NavLink
              to="/dashboard/user/profile"
              className="list-group-item Navlink list-group-item-action"
            >
              Profile
            </NavLink>
            <NavLink
              to="/dashboard/user/orders"
              className="list-group-item Navlink list-group-item-action"
            >
              Orders
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserMenu;
