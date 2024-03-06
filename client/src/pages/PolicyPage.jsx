import React from "react";
import Layout from "../components/Layout/Layout";

const PolicyPage = () => {
  return (
    <Layout title={"Privacy Policy"}>
      <div className="row contactus footerItem-background">
        <div className="col-md-6 ">
          <img
            src="/images/contactus.jpeg"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4 contactUs-div">
          <h1 className=" p-2  text-center">Privacy Policy</h1>
          <span>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus
            illum, assumenda temporibus, porro perferendis ipsa excepturi culpa,
            ab laborum amet nobis? Libero voluptatibus optio, quod dolore
            tenetur omnis deleniti animi ipsam nemo doloremque! Iste obcaecati
            illo rem incidunt autem! Vero earum laboriosam dolorem ad facere
            amet, magnam ex hic! Pariatur!
          </span>
        </div>
      </div>
    </Layout>
  );
};

export default PolicyPage;
