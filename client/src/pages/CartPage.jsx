import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import { useAuth } from "../context/auth";
import { useCart } from "../context/cart";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import DropIn from "braintree-web-drop-in-react";
import "../styles/CartStyles.css";

const CartPage = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  var userId = auth?.user?._id;

  console.log(auth?.user?._id);
  const navigate = useNavigate();

  //TOTAL PRICE
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        if (item[1].uId === userId) {
          total = total + item[0].price;
        }
      });
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    } catch (error) {
      console.log("error in totalPrice/CartPage", error);
    }
  };
  // DELETE CART ITEM FUNCTION
  const removeCartItem = (id) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item[0]._id === id);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log("error in removeCartItem/CartPage", error);
    }
  };

  //GET PAYMENT GATEWAY TOKEN
  const getToken = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/product/braintree/token"
      );
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getToken();
  }, [auth?.token]);

  //HANDLE PAYMENT
  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post(
        "http://localhost:8080/api/product/braintree/payment",
        {
          nonce,
          cart,
        }
      );
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("Payment Completed Successfully ");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  console.log(userId);
  console.log(cart);
  let count = 0;
  const cartCount = () => {
    cart.map((c) => {
      if (c[1].uId === userId) {
        count += 1;
      }
      return count;
    });
  };
  cartCount();
  return (
    <Layout>
      <div className="cart-page mt-1">
        <div className="">
          <div className="col-md-12">
            <h1 className="text-center bg-light p-2 mb-1">
              {!auth?.user
                ? "Hello Guest"
                : `Hello  ${auth?.token && auth?.user?.name}`}
              <p className="text-center">
                {count > 0
                  ? `You Have ${count} items in your cart ${
                      auth?.token ? "" : "Please login to checkout"
                    }`
                  : "Your Cart Is Empty"}
              </p>
            </h1>
          </div>
        </div>
        <div className="container cart-container">
          <div className="row">
            <div className="col-md-7 cart-box p-0 m-0 ">
              {cart?.map((p) => (
                <>
                  {p[1]?.uId === userId ? (
                    <div className="row mb-2 p-3 card cart-items flex-row">
                      <div className="col-md-4">
                        <img
                          src={`http://localhost:8080/api/product/product-photo/${p[0]._id}`}
                          className="card-img-top"
                          alt={p[0].name}
                        />
                      </div>
                      <div className="col-md-8 cart-items-details">
                        <h5>{p[0].name}</h5>
                        <h5>{p[0].description.substring(0, 30)}</h5>
                        <h5>Price : {p[0].price}</h5>
                        <button
                          className="cart-remove-btn"
                          onClick={() => removeCartItem(p._id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ) : null}
                </>
              ))}
            </div>
            <div className="col-md-5 cart-summary">
              <h2>Cart Summary</h2>
              <p>Total | Checkout | Payment</p>
              <hr />
              <h4>Total: {totalPrice()}</h4>
              {auth?.user?.address ? (
                <>
                  <div className="mb-3 cart-current-address">
                    <h4>Current Address</h4>
                    <h5>{auth?.user?.address}</h5>
                    <button
                      className="cart-update-address-btn"
                      onClick={() => navigate("/dashboard/user/profile")}
                    >
                      Update Address
                    </button>
                  </div>
                </>
              ) : (
                <div className="mb-3">
                  {auth?.token ? (
                    <button
                      className="btn btn-outline-warning"
                      onClick={() => navigate("/dashboard/user/profile")}
                    >
                      Update Address
                    </button>
                  ) : (
                    <button
                      className="cart-update-address-btn"
                      onClick={() =>
                        navigate("/login", {
                          state: "/cart",
                        })
                      }
                    >
                      Plase Login to checkout
                    </button>
                  )}
                </div>
              )}
              <div className="mt-2">
                {!clientToken || !auth?.token || !cart?.length ? (
                  ""
                ) : (
                  <div className="payment-div">
                    <p className="payment-text">Choose a way to pay</p>
                    <DropIn
                      options={{
                        authorization: clientToken,
                        paypal: {
                          flow: "vault",
                        },
                      }}
                      onInstance={(instance) => setInstance(instance)}
                    />
                    <button
                      className="make-payment-btn"
                      style={{ cursor: "pointer" }}
                      onClick={handlePayment}
                      disabled={loading || !instance || !auth?.user?.address}
                    >
                      {loading ? "Processing ...." : "Make Payment"}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
