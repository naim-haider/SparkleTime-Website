import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { Link } from "react-router-dom";
import "../../styles/allProduct.css";

const Products = () => {
  const [products, setProducts] = useState([]);

  // GET ALL PRODUCT
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/product/get-product"
      );
      console.log(data);
      setProducts(data.product);
    } catch (error) {
      console.log("error in getAllProduct/Products", error);
      toast.error("error in getAllProduct/Products");
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <Layout>
      <div className="allProduct-container">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9 card-section">
          <h1 className="text-center">All Products List</h1>
          <div className="d-flex flex-wrap ">
            {products?.map((p) => (
              <Link
                to={`/dashboard/admin/update-product/${p.slug}`}
                className="product-link"
              >
                <div
                  className="card m-2 card-itmes"
                  style={{ width: "18rem" }}
                  key={p._id}
                >
                  <img
                    src={`http://localhost:8080/api/product/product-photo/${p._id}`}
                    alt={p.name}
                    className="card-img-top"
                  />
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    <span className="card-text">
                      {p.description.substring(0, 20)}...
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
