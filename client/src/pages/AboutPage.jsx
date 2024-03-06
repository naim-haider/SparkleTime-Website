import React from "react";
import Layout from "../components/Layout/Layout";
import "../styles/footerItem.css";

const AboutPage = () => {
  return (
    <Layout title={"About us - Ecommerce app"}>
      <div className="row contactus footerItem-background">
        <div className="col-md-6 ">
          <img
            src="/images/about.jpeg"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4 aboutus-text contactUs-div">
          <h1 className=" p-2  text-center">About Us</h1>
          <span className="text-justify mt-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus
            officiis obcaecati esse tempore unde ratione, eveniet mollitia,
            perferendis eius temporibus dicta blanditiis doloremque explicabo
            quasi sunt vero optio cum aperiam vel consectetur! Laborum enim
            accusantium atque, excepturi sapiente amet! Tenetur ducimus aut
            commodi illum quidem neque tempora nam.
          </span>
        </div>
      </div>
    </Layout>
  );
};

export default AboutPage;
