import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import CategoryForm from "../../components/Form/CategoryForm";
import { Modal } from "antd";
import "../../styles/createCategory.css";
const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");

  // CREATE CATEGORY FUNCTION
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:8080/api/category/create-category",
        { name }
      );
      if (data?.success) {
        toast.success(`${name} is created`);
        getAllCategories();
      } else {
        toast.error("somthing wend wrong in fetching data");
      }
    } catch (error) {
      console.log("error in Category handleSubmit", error);
      toast.error("error in Category handleSubmit");
    }
  };

  // GET ALL CATEGORIES
  const getAllCategories = async () => {
    const res = await axios.get(
      "http://localhost:8080/api/category/all-categories"
    );
    console.log(res);
    if (res?.data?.success) {
      setCategories(res.data.category);
    }
    try {
    } catch (error) {
      console.log("error in getAllCategories -> ", error);
      toast.error("Somthing went wrong in getting category");
    }
  };

  //GETTING CATEGORY AT INITIAL TIME BY USEEFFECT
  useEffect(() => {
    getAllCategories();
  }, []);

  // UPDATE CATEGORY
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `http://localhost:8080/api/category/update-category/${selected._id}`,
        { name: updatedName }
      );
      if (data.success) {
        toast.success("category updated successfully");
        setSelected(null);
        setUpdatedName("");
        setVisible(false);
        getAllCategories();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log("error in submit update", error);
      toast.error("error in submit update");
    }
  };

  // DELETE CATEGORY
  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:8080/api/category/delete-category/${id}`
      );
      if (data.success) {
        toast.success("category deleted successfully");
        getAllCategories();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log("error in handledelete", error);
      toast.error("error in handledelete");
    }
  };

  return (
    <Layout title={"Dashboard - Create Category"}>
      <div className="container-fuild  create-cat-container">
        <div className="center">
          <div className="col-md-4">
            <AdminMenu />
          </div>
          <div className="col-md-8 create-cat-feild">
            <h1>Manage Category</h1>
            <div className="p-3 w-50">
              <CategoryForm
                handleSubmit={handleSubmit}
                value={name}
                setValue={setName}
              />
            </div>
            <div className=" category-box">
              <table className="cat-table">
                <thead className="cat-table-head">
                  <tr>
                    <th className="cat-table-name" scope="col">
                      Name
                    </th>
                    <th className="cat-table-action" scope="col">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {categories?.map((c) => (
                    <>
                      <tr>
                        <td className="cat-table-catName" key={c._id}>
                          {c.name}
                        </td>
                        <td className="btn-adjust">
                          <button
                            className="cat-table-btn"
                            onClick={() => {
                              setVisible(true);
                              setUpdatedName(c.name);
                              setSelected(c);
                            }}
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => {
                              handleDelete(c._id);
                            }}
                            className="cat-table-btn"
                          >
                            delete
                          </button>
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
            </div>
            <Modal
              onCancel={() => setVisible(false)}
              visible={visible}
              footer={null}
            >
              <CategoryForm
                value={updatedName}
                setValue={setUpdatedName}
                handleSubmit={handleUpdate}
              />
            </Modal>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
