import { FilterCenterFocus } from "@material-ui/icons";
import { ReplayCircleFilled } from "@mui/icons-material";
import "../ExploreSection.css";
import bookIcon from "../images/BookIcon.png"
import { useState } from "react";

const ExploreSection = () => {
    const [isMove, barIsMove] = useState(false);

  return (
    <div className="ExploreSection">
        <div className="heading">
            Explore
        </div>

        <button className={isMove ? "rightButton disappear" : "rightButton"} onClick={() => barIsMove(!isMove)}>Click me</button>

        <button className={isMove ? "leftButton" : "leftButton disappear"} onClick={() => barIsMove(!isMove)}>leftButton</button>

        <div className="box">

        
        <div className={isMove ? "exploreBar move" : "exploreBar"}>

            <a className="exploreBox" href="http://www.google.com"> 
                <img src={bookIcon} />
                <div className="Name">Academic books</div>
            </a>

            <a className="exploreBox" href="http://www.google.com"> 
                <img src={bookIcon} />
                <div className="Name">Academic books</div>
            </a>

            <a className="exploreBox" href="http://www.google.com"> 
                <img src={bookIcon} />
                <div className="Name">Academic books</div>
            </a>

            <a className="exploreBox" href="http://www.google.com"> 
                <img src={bookIcon} />
                <div className="Name">Academic books</div>
            </a>

            <a className="exploreBox" href="http://www.google.com"> 
                <img src={bookIcon} />
                <div className="Name">Academic books</div>
            </a>

            <a className="exploreBox" href="http://www.google.com"> 
                <img src={bookIcon} />
                <div className="Name">Academic books</div>
            </a>

            <a className="exploreBox" href="http://www.google.com"> 
                <img src={bookIcon} />
                <div className="Name">Academic books</div>
            </a>

            <a className="exploreBox" href="http://www.google.com"> 
                <img src={bookIcon} />
                <div className="Name">Academic books</div>
            </a>

            <a className="exploreBox" href="http://www.google.com"> 
                <img src={bookIcon} />
                <div className="Name">Academic books</div>
            </a>

            <a className="exploreBox" href="http://www.google.com"> 
                <img src={bookIcon} />
                <div className="Name">Academic books</div>
            </a>

            <a className="exploreBox" href="http://www.google.com"> 
                <img src={bookIcon} />
                <div className="Name">Academic books</div>
            </a>

            <a className="exploreBox" href="http://www.google.com"> 
                <img src={bookIcon} />
                <div className="Name">Academic books</div>
            </a>

            <a className="exploreBox" href="http://www.google.com"> 
                <img src={bookIcon} />
                <div className="Name">Academic books</div>
            </a>

            <a className="exploreBox" href="http://www.google.com"> 
                <img src={bookIcon} />
                <div className="Name">Academic books</div>
            </a>

            <a className="exploreBox" href="http://www.google.com"> 
                <img src={bookIcon} />
                <div className="Name">Academic books</div>
            </a>

            <a className="exploreBox" href="http://www.google.com"> 
                <img src={bookIcon} />
                <div className="Name">Academic books</div>
            </a>

            <a className="exploreBox" href="http://www.google.com"> 
                <img src={bookIcon} />
                <div className="Name">Academic books</div>
            </a>

            <a className="exploreBox" href="http://www.google.com"> 
                <img src={bookIcon} />
                <div className="Name">Academic books</div>
            </a>

            <a className="exploreBox" href="http://www.google.com"> 
                <img src={bookIcon} />
                <div className="Name">Academic books</div>
            </a>

            <a className="exploreBox" href="http://www.google.com"> 
                <img src={bookIcon} />
                <div className="Name">Academic books</div>
            </a>

                             

        </div>

        </div>
        
    </div>
  )
}

export default ExploreSection