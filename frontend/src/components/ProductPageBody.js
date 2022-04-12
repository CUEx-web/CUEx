import React from "react";
import "../ProductBody.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
function ProductBody(props) {

  const product=props.product;
  const userid=props.userid;
  const date=props.postDate
  const [CurrentUserId,setCurrentUserId]=useState("")
  const [CurrentUserType,setCurrentUserType]=useState("")

  /*To check is the current user a admin or the product owner */
    let url_user = "http://localhost:3001/api/loggedinuser";
    let method_user = "GET";

    console.log(url_user);

    fetch(url_user, { method: method_user, credentials: 'include' })
    .then((res) => {
    if (res.status !== 200) {
        //If there is any error, statusCode will not be 200 and will throw error
        throw new Error("Failed to fetch users.");
    }
    //Return response data to the next then block
    return res.json();
    })
    //.catch((error) => alert("", error))

    .catch((error) => alert("Error:", error))
    .then((resData) => {
    console.log(JSON.stringify(resData));
    //Log the return data in the terminal, Frontend team can update things here

    // alert(JSON.stringify(resData));
        const useridvalue = resData._id.substr(0, resData._id.length);
        const usertype=resData.userType;
        setCurrentUserId(useridvalue);
        setCurrentUserType(usertype)
    })
  /*if the user is an Admin or the owner of the product, he can edit or delete the product*/
  useEffect(function isAdmin() {
    if (CurrentUserType==="Admin" || CurrentUserId===userid._id) {
      document.getElementById("Edit_Button").style.visibility = "visible";
      document.getElementById("Delete_Button").style.visibility = "visible";
    }
  });
  function editproduct() {
    var x = document.getElementById("Edit_Product");
    if (x.style.visibility === "visible") {
      x.style.visibility = "hidden";
      x.style.display='none'
    } else {
      x.style.visibility = "visible";
      x.style.display='block'
    }
    return null;
  }
  function deleteproduct(){
     const answer=window.confirm("Are you sure to delete?");
     console.log(answer)
     if(answer){
       
      let url = "http://localhost:3001/products";
      let method = "DELETE";
      const queryParams = "/";
      const queryValue = product._id;
      url = url + queryParams + queryValue;
      console.log(url);
     
        fetch(url, { method: method, credentials: 'include'})
        .then((res) => {
          if (res.status !== 200) {
            //If there is any error, statusCode will not be 200 and will throw error
            throw new Error("Failed to fetch products.");
          }
          //Return response data to the next then block
          return res.json();
        })
     alert("Delete Success! Now return to the Home Page")
     window.location.href = "/"
     }

  }
  /* If the user want to edit the profile, he need the Image handler to handle the Image.*/ 
  const uploadedImage = React.useRef();
  const ImageHandler = (e) => {
    const [file] = e.target.files;
    if (file) {
      const reader = new FileReader();
      const { current } = uploadedImage;
      current.file = file;
      setproductPicture(file);
      console.log(productPicture)
      reader.onload = (e) => {
        current.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  };
  useEffect(()=>{
    setname(product.productName)
    setcategory(product.category)
    setcondition(product.condition)
    setproduct_description(product.description)
    setprice(product.price)
    setdate(date)
    setlike(product.like)
    setSellStatus(product.sellStatus)
    setPayment_Type(product.paymentType)
    setproductPicture("http://localhost:3001/"+product.productPicture) 
    fetch("http://localhost:3001/"+product.productPicture).then((resData=>console.log(resData)))
  },[product])
  const [productName, setname] = useState("")
  const [category, setcategory] = useState();
  const [condition, setcondition] = useState();
  const [description, setproduct_description] = useState("");
  const [price, setprice] = useState();
  const [user,setuser]=useState([]);
  const [postDate, setdate] = useState(Date());
  const [like, setlike] = useState();
  const [sellStatus, setSellStatus] = useState("");
  const [productPicture, setproductPicture] = useState([])
  const [Payment_Type,setPayment_Type]=useState("")
  const email="mailto:"+user.email

    /*This is the method to get the product owner Information*/
    const user_id=userid._id
    let url = "http://localhost:3001/users";
    let method = "GET";
    const queryParams = "?userId=";
   const queryValue  =user_id;
    url = url + queryParams + queryValue;
    console.log(url);
   useEffect(()=>{
    fetch(url, { method: method })
    .then((res) => {
      if (res.status !== 200) {
        //If there is any error, statusCode will not be 200 and will throw error
        throw new Error("Failed to fetch users.");
      }
      //Return response data to the next then block
      return res.json();
    })
    .then((resData) => {
      setuser(resData[0])
    })
  },[url])
  /*Product will be updated when clicked the submit form. */
  const submitted = (e) => {
    e.preventDefault();
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
    let edit_url = "http://localhost:3001/products/"+product._id;
    fetch(edit_url, {
      method: "PUT", 
      credentials: 'include',
      body:(formdata) 
    })
      .then((res) => res.json())
      .catch((error) => console.error("Error:", error))
      .then((response) => console.log("Success:", response));
      alert("Editted! You can now check the latest item on the product page!!!");
      window.location.href = "/product/"+product._id
  };
  return (
    <div className="postpage" stlye={{ width: "100%" }}>
      <div className="title">{product.name}</div>
      <div className="product_body">
        <div className="body_image">
            <img src={"http://localhost:3001/"+product.productPicture} alt="user picture" id="product_img"/>
        </div>
        <div className="body_about">
          <div className="productTitle">{product.productName}</div>
          <p><div className="priceHeading">Price: ${product.price}</div></p>
          <p>
            Condition: <var>{product.condition}</var>
          </p>
          <p>
            Category: <var>{product.category}</var>
          </p>
          <p>
            Likes: <var>{product.like}</var>
          </p>
          <p>
            Post date: {date.slice(0,10)}
          </p>
          <p>Product description: <var>{product.description}</var></p>  
          <a  href ={email}>
            <button className="buttonProductPage">Chat</button>
          </a>
          <button
            className="Edit_Button buttonProductPage"
            id="Edit_Button"
            onClick={editproduct}
          >
            Edit
          </button>
          <button
            className="Delete_Button buttonProductPage"
            id="Delete_Button"
            onClick={deleteproduct}
          >
            Delete
          </button>
        </div>
        
        <div className="EditFormBox" id="Edit_Product">
          <form className="form" onSubmit={submitted}>
          <label>Product Image</label>
          <input
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
          <label id="ProductDescription">Product Description:</label>
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

      <div
        className="seller_title"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <h1>About {user.userName}</h1>
      </div>
      <div className="sellerinfo ">
        <div className="Seller_text ">
          <p>Grade: <var>{user.grade}</var></p>
          <p>
            Email: <var>{user.email}</var><br />
            Student ID: <var>{user.studentId}</var>
          </p>
        </div>
        <Link to={{pathname:"/PersonalProfile", 
                        state:{
                            userIDID: user_id
                    }}}>
          <img src={"http://localhost:3001/"+user.profilePicture} className="Seller_icon " alt="sellericon" id="user_img" />
        </Link>
      </div>
    </div>
  );
}

export default ProductBody;
