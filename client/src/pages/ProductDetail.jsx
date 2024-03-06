import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/ProductDetails.css";
import { useCart } from "../context/cart";

const ProductDetail = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [cart, setCart] = useCart();

  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);

  console.log(product);

  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/product/get-product/${params.slug}`
      );
      console.log(data);
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log("error in getProduct/ProductDetail", error);
    }
  };

  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/product/related-product/${pid}/${cid}`
      );
      console.log(data);
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log("error in getSimilarProduct/ProductDetail", error);
    }
  };

  return (
    <Layout>
      <div className="more-details">
        <div className="row container product-details">
          <div className="product-img col-md-6">
            <img
              src={`http://localhost:8080/api/product/product-photo/${product._id}`}
              alt={product.name}
              className="card-img-top"
              height={"300"}
            />
          </div>
          <div className="col-md-6 product-details-info">
            <h1 className="text-center">Product Detail</h1>
            <h6>Name: {product.name}</h6>
            <h6>Description: {product.description}</h6>
            <h6>Price: {product.price}</h6>
            <button
              className="btn btn-dark ms-1 addtocart-btn"
              onClick={() => {
                setCart([...cart, product]);
                localStorage.setItem(
                  "cart",
                  JSON.stringify([...cart, product])
                );
                toast.success("Item Added to cart");
              }}
            >
              ADD TO CART
            </button>
          </div>
        </div>
        <hr />
        <div className="row container similar-products">
          <h6>Similar Products</h6>
          {relatedProducts.length < 1 && (
            <p className="text-center">No Similar Products found</p>
          )}
          <div className="d-flex flex-wrap">
            {relatedProducts?.map((p) => (
              <div className="  card m-2" style={{ width: "18rem" }}>
                <img
                  src={`http://localhost:8080/api/product/product-photo/${p?._id}`}
                  className="card-img-top"
                  alt={p.name}
                />
                <div className="card-body similar-cardbody">
                  <div className="card-name-price">
                    <h5 className="card-title card-heading">{p.name}</h5>
                    <h5 className="card-title card-price">
                      {p.price.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </h5>
                  </div>
                  <p className="card-text">
                    {p.description.substring(0, 20)}...
                  </p>
                  <div className="card-name-price">
                    <button
                      className="moredetail-btn ms-1"
                      onClick={() => navigate(`/product/${p.slug}`)}
                    >
                      More Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetail;
