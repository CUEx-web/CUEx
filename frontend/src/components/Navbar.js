import "../App.css";
import CUExLogo from "../images/WebsiteLogo.JPG"
import SearchIcon from '@mui/icons-material/Search';

const Navbar = () => {
  return (
    <div className="navbar">
        <div className="topBar">
            <div className="leftSide">
                <div className="buttonsCat">
                    <button>Books</button>
                    <button>Fashion</button>
                    <button>Living</button>
                    <button>Hobbies & Games</button>
                    <button>Electronics & Technology</button>
                    <button>Jobs & Services</button>
                </div>
            </div>

            <div className="rightSide">
                <div className="buttonsReg">
                    <button>Register</button>
                    <button>Login</button>
                </div>
            </div>
        </div>

        <div className="bottomBar">
            <div className="websiteNameBox">
                <img src={CUExLogo} />
                CUEx
            </div>

            <div className="searchBarBox">
                <input className="searchBar" type="text" placeholder="Search for anything"/>
                <button><SearchIcon/></button>
            </div>

            <div className="sellButtonBox">
                <button>Sell</button>
            </div>
        </div>
    </div>
  )
}

export default Navbar