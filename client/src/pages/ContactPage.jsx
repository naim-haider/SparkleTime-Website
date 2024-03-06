import React from "react";
import Layout from "../components/Layout/Layout";
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";

const ContactPage = () => {
  return (
    <Layout title={"Contact Us"}>
      <div className="row contactus footerItem-background">
        <div className="col-md-6 ">
          <img
            src="/images/contactus.jpeg"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4 contactUs-div">
          <h1 className=" p-2  text-center">CONTACT US</h1>
          <span className="text-justify mt-2">
            any query and info about product feel free to call anytime we 24X7
            available
          </span>
          <span className="mt-3">
            <BiMailSend /> : www.help@ecommerceapp.com
          </span>
          <span className="mt-3">
            <BiPhoneCall /> : 012-3456789
          </span>
          <span className="mt-3">
            <BiSupport /> : 1800-0000-0000 (toll free)
          </span>
        </div>
      </div>
    </Layout>
  );
};

export default ContactPage;
