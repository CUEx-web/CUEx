import "../Navbar.css";
import CUExLogo from "../Images/WebsiteLogo.JPG"
import SearchIcon from '@mui/icons-material/Search';
import { Link, useHistory} from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
    const [query, setQuery] = useState();

    const [currentUserId, setCurrentUserId] = useState();

    function getQuery(event){
        setQuery(event.target.value)
        console.log(event.target.value)
    }

    let history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault()
        history.push({pathname:"/search", 
        state:{
            query: query,
            tag: ''
        }});        
    }

    const getUserId = (e) => {
        let url = "http://localhost:3001/api/loggedinuser";
        let method = "GET";

        console.log(url);

        fetch(url, { method: method, credentials: 'include' })
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

            setCurrentUserId(useridvalue);
        })
    }

    const logOut = (e) => {
        let url = "http://localhost:3001/api/auth/signout";

        fetch(url, {
            method: "POST", credentials: 'include' 
                })
        .then((res) => res.json())
        .catch((error) => console.error("Error:", error))
        .then((response) => console.log("Success:", response));
    }

  return (
    <div className="navbar">
        <div className="topBar">
            <div className="leftSide">
                <div className="buttonsCat">
                    <Link className="leftButtons" to={{pathname:"/search", 
                        state:{
                            tag: "21",
                            tag1: "Academic books",
                            tag2: "Fiction books",
                            tag3: "Non-fiction books",
                            tag4: "",
                            query: ''
                    }}}>Books</Link>
                    <Link className="leftButtons" to={{pathname:"/search", 
                        state:{
                            tag: "22",
                            tag1: "Women's fashion",
                            tag2: "Men's fashion",
                            tag3: "Luxury",
                            tag4: "",
                            query: ''
                    }}}>Fashion</Link>
                    <Link className="leftButtons" to={{pathname:"/search", 
                        state:{
                            tag: "23",
                            tag1: "Food & drinks",
                            tag2: "Beauty & Personal Care",
                            tag3: "Furniture & Home Living",
                            tag4: "Pet supplies",
                            query: ''
                    }}}>Living</Link>
                    <Link className="leftButtons" to={{pathname:"/search", 
                        state:{
                            tag: "24",
                            tag1: "Music accessories",
                            tag2: "Video games",
                            tag3: "Photography",
                            tag4: "Sports equipment",
                            query: ''
                    }}}>Hobbies & Games</Link>
                    <Link className="leftButtons" to={{pathname:"/search", 
                        state:{
                            tag: "25",
                            tag1: "Computer hardware",
                            tag2: "Mobile phones",
                            tag3: "Electronic accessories",
                            tag4: "",
                            query: ''
                    }}}>Electronics & Technology</Link>
                    <Link className="leftButtons" to={{pathname:"/search", 
                        state:{
                            tag: "26",
                            tag1: "Jobs",
                            tag2: "Services",
                            tag3: "Free items",
                            tag4: "",
                            query: ''
                    }}}>Jobs & Services</Link>
                </div>
            </div>

            <div className="rightSide">
                <div className="buttonsReg">
                    <Link className="rightButtons" onClick={getUserId()} to={{pathname:"/PersonalProfile", 
                        state:{
                            userIDID: currentUserId
                    }}}>Profile</Link>
                    {/* <button className="rightButtons" onClick={() => {getUserId(); history.push({
                        pathname: "/PersonalProfile",
                        state:{ userIDID: currentUserId }
                    })}}>New</button> */}
                    <Link className="rightButtons" onClick={logOut} to={{pathname:"/loginPage"}}>Log out</Link>
                </div>
            </div>
        </div>

        <div className="bottomBar">
            <Link className="websiteNameBox" to={{pathname:"/"}} style={{ textDecoration: 'none', color:'black'}}>
                <img src={CUExLogo} />
                CUEx
            </Link>

            <form className="searchBarBox" onSubmit={handleSubmit}>
                <input className="searchBar" type="text" placeholder="Search for anything" onChange={getQuery}/>
                <Link className="searchButton" to={{pathname:"/search", 
            state:{
                query: query,
                tag: ''
            }}}><SearchIcon/></Link>
            </form>

            <div className="sellButtonBox">
                <Link to="/upload"> 
                <button>Sell</button>
                </Link>
            </div>
        </div>
    </div>
  )
}

export default Navbar