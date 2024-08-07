import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import axios from "axios";
import moment from "moment";
import { useAuth } from "../../context/auth";
import "../../styles/adminOrder.css";

const UserOrders = () => {
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();
  const getOrders = async () => {
    try {
      const { data } = await axios.get("http://localhost:8080/api/auth/orders");
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(orders);

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);
  return (
    <Layout title={"Your Orders - Ecommerce App"}>
      <div className="adminOrderContainer">
        <div className="col-md-3">
          <UserMenu />
        </div>
        <div className="col-md-8 adminOrder-section">
          <h1 className="text-center">All Orders</h1>
          {orders?.map((o, i) => {
            return (
              <div className="border shadow">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Status</th>
                      <th scope="col">Buyer</th>
                      <th scope="col"> date</th>
                      <th scope="col">Payment</th>
                      <th scope="col">Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{i + 1}</td>
                      <td>{o?.status}</td>
                      <td>{o?.buyer?.name}</td>
                      <td>{moment(o?.createAt).fromNow()}</td>
                      <td>{o?.payment.success ? "Success" : "Failed"}</td>
                      <td>{o?.products?.length}</td>
                    </tr>
                  </tbody>
                </table>
                <div className="container">
                  {o?.products?.map((p, i) => (
                    <div
                      className="row adminOrderProductdetail  p-3 card flex-row"
                      key={p._id}
                    >
                      <div className="col-md-4 adminOrderProductImage">
                        <img
                          src={`http://localhost:8080/api/product/product-photo/${p._id}`}
                          className="card-img-top"
                          alt={p.name}
                          width="80px"
                          height={"100px"}
                        />
                      </div>
                      <div className="adminAllProductDetail col-md-8">
                        <p>{p.name}</p>
                        <p>{p.description.substring(0, 30)}</p>
                        <p>Price : {p.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default UserOrders;
