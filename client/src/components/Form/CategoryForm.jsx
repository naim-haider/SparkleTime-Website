import React from "react";
import "../../styles/createCategory.css";

const CategoryForm = ({ handleSubmit, value, setValue }) => {
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-3 create-cat-form">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Create Category
          </label>
          {/* <div className="box"> */}
          <div className="inputBx">
            <span></span>
            <input
              type="text"
              placeholder="Category Name"
              className=" create-cat-input"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </div>
        </div>
        {/* </div> */}
        <button type="submit" className="catSubmit-btn">
          Submit
        </button>
      </form>
    </>
  );
};

export default CategoryForm;
