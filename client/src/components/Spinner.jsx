import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/auth";

const Spinner = ({ path = "login" }) => {
  const [count, setCount] = useState(3);
  const navigate = useNavigate();
  const location = useLocation();
  const [auth, setAuth] = useAuth();
  console.log(auth);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevValue) => --prevValue);
    }, 1000);
    count === -1 &&
      navigate(`/${path}`, {
        state: location.pathname, // this state is for directing the user to that page where he wanted to before login. and this is also used in login redirecting section.
      });
    return () => clearInterval(interval);
  }, [count, navigate, location, path]);
  return (
    <>
      <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <h1 className="Text-center">
          {auth?.token ? (
            <>Redirecting to Home Page in {count} seconds </>
          ) : (
            <>Redirecting to Login Page in {count} seconds</>
          )}
        </h1>
        <br />
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </>
  );
};

export default Spinner;
