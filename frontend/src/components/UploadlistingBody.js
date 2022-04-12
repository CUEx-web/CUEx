import React, { Component } from "react";
import "../UploadlistingBody.css";
import ListingBox from "../components/ListingBox.js";
import { useState, useEffect } from "react";
import { Identity } from "@mui/base";
import { Task } from "@mui/icons-material";

const UploadlistingBody = () => {
  const uploadedImage = React.useRef(null);
  const ImageHandler = (e) => {
    const [file] = e.target.files;
    if (file) {
      const reader = new FileReader();
      const { current } = uploadedImage;
      current.file = file;
      setproductPicture(file);
      reader.onload = (e) => {
        current.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  };
  const [productName, setname] = useState("");
  const [category, setcategory] = useState(1);
  const [condition, setcondition] = useState("New");
  const [Payment_Type,setPayment_Type]=useState("Monetary")
  const [description, setproduct_description] = useState("");
  const [price, setprice] = useState("");
  const [postDate, setdate] = useState(Date());
  const [like, setlike] = useState(0);
  const [sellStatus, setSellStatus] = useState("available");
  const [productPicture, setproductPicture] = useState([])
  const submitted = (e) => {
    e.preventDefault();
    setdate(Date());
   
    const formdata= new FormData();
    formdata.append("productName",productName);
    formdata.append("price",price);
    formdata.append("condition",condition);
    formdata.append("category",category);
    formdata.append("description",description);
    formdata.append("postDate",postDate);
    formdata.append("like",like);
    formdata.append("sellStatus",sellStatus);
    formdata.append("productPicture", productPicture);
    formdata.append("event",'products');
    formdata.append("paymentType",Payment_Type)
    console.log(Object.fromEntries(formdata)) 
    let url = "http://localhost:3001/products"; 
    fetch(url, {
      method: "POST", credentials: 'include',  // or 'PUT'
      //mode: 'no-cors', //seems no need this
      // headers: new Headers({
      //   "Content-Type": "multipart/form-data;"
      // }),
      body:(formdata) // data can be `string` or {object}!
    })
      .then((res) => res.json())
      .catch((error) => console.error("Error:", error))
      .then((response) => console.log("Success:", response));
    alert("Submitted! You can now check your product on the product page!!!");
   window.location.href = "/homepage"
  };
  return (
    <div className="Upload_Page">
      <div className="Upload_Heading">
        <h1>Upload Your Product Here!!</h1>

        <form className="form" onSubmit={submitted}>
          <label>Product Image</label>
          <input
            required
            type="file"
            accept="image/jpeg, image/png,  image/jpg"
            onChange={ImageHandler}
            multiple={false}
            className="Uploadimagebutton"
          />
          <div>
            <img
              ref={uploadedImage}
              className="imagecontainer"
              alt="uploaded_image"
            />
          </div>
          <label>Product Name:</label>
          <input
            type="text"
            required
            className="productname"
            value={productName}
            onChange={(e) => setname(e.target.value)}
          />
          <br />
          <div className="category">
            <label>Category:</label>
            <select
              className="category_selector"
              required
              value={category}
              onChange={(e) => setcategory(e.target.value)}
            >
              <option value="1">Academic books   </option>
              <option value="2">Fiction books </option>
              <option value="3"> Non-fiction books </option>
              <option value="4">Women's fashion </option>
              <option value="5">Men's fashion </option>
              <option value="6">Luxury </option>
              <option value="7">Food & Drinks </option>
              <option value="8">Beauty & Personal Care </option>
              <option value="9">Furniture & Home Living </option>
              <option value="10"> Pet supplies </option>
              <option value="11">Music accessories </option>
              <option value="12">Video games </option>
              <option value="13"> Photography </option>
              <option value="14"> Sports equipment </option>
              <option value="15">Computer hardware </option>
              <option value="16">Mobile phones </option>
              <option value="17">Electronic accessories </option>
              <option value="18"> Jobs </option>
              <option value="19">Services </option>
              <option value="20"> Free items </option>

            </select>
          </div>
          <div className="Condition">
            <label>Condition:</label>
            <select
              className="condition_selector"
              required
              value={condition}
              onChange={(e) => setcondition(e.target.value)}
            >
              <option value="New">New </option>
              <option value="Well used">Well Used</option>
              <option value="Heavily used">Heavily Used</option>
            </select>
          </div>
          <div className="Condition">
            <label>Payment Type:</label>
            <select
              className="payment_selector"
              required
              value={Payment_Type}
              onChange={(e) => setPayment_Type(e.target.value)}
            >
              <option value="Monetary">Monetary </option>
              <option value="goods">Goods</option>
              <option value="Monetary and goods">Monetary and goods </option>
            </select>
          </div>
          <br />
          <label>Product Description:</label>
          <textarea
            required
            className="textarea"
            value={description}
            onChange={(e) => setproduct_description(e.target.value)}
          ></textarea>
          <br />
          <div>
            <label>Price(number only):</label>
            <input
              type="number"
              required
              value={price}
              className="Price"
              onChange={(e) => setprice(e.target.value)}
            />
          </div>
          <button className="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default UploadlistingBody;