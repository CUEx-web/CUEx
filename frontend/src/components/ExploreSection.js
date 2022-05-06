import { FilterCenterFocus } from "@material-ui/icons";
import { ReplayCircleFilled } from "@mui/icons-material";
import "../ExploreSection.css";
import graduation from "../Images/graduation.png"
import magicBook from "../Images/magic-book.png"
import worldBook from "../Images/world-book-day.png"
import dressIcon from "../Images/dress.png"
import tunicIcon from "../Images/tunic.png"
import diamondNecklace from "../Images/diamond-necklace.png"
import burger from "../Images/burger.png"
import makeup from "../Images/make-up.png"
import sofa from "../Images/sofa.png"
import pawprint from "../Images/pawprint.png"
import dj from "../Images/dj.png"
import gameController from "../Images/game-controller.png"
import photography from "../Images/photography.png"
import basketball from "../Images/basketball.png"
import computer from "../Images/computer.png"
import smartphone from "../Images/smartphone.png"
import chip from "../Images/chip.png"
import jobOffer from "../Images/job-offer.png"
import services from "../Images/technical-support.png"
import free from "../Images/free.png"
import { useState } from "react";
import { Link } from 'react-router-dom';
import SearchResultPage from "./SearchResultPage";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';


const ExploreSection = () => {
    const [isMove, barIsMove] = useState(false);

  return (

    <div className="ExploreSection">
        <div className="heading">
            Explore
        </div>

        {/* Buttons to move the icons right and left in explore section*/}
        <button className={isMove ? "rightButton disappear" : "rightButton"} onClick={() => barIsMove(!isMove)}><ChevronRightIcon /></button>

        <button className={isMove ? "leftButton" : "leftButton disappear"} onClick={() => barIsMove(!isMove)}><ChevronLeftIcon /></button>

        <div className="box">

        {/* Explore boxes which will navigate to search page with corresponding tags and queries*/}
        <div className={isMove ? "exploreBar move" : "exploreBar"}>
            <Link className="exploreBox" to={{pathname:"/search", 
            state:{
                tag: "1",
                tag1: "",
                tag2: "",
                tag3: "",
                tag4: "",
                query: ""
            }}}> 
                <img src={graduation} />
                <div className="Name">Academic books</div>
            </Link>

            <Link className="exploreBox" to={{pathname:"/search", 
            state:{
                tag: "2",
                tag1: "",
                tag2: "",
                tag3: "",
                tag4: "",
                query: ""
            }}}> 
                <img src={magicBook} />
                <div className="Name">Fiction books</div>
            </Link>

            <Link className="exploreBox" to={{pathname:"/search", 
            state:{
                tag: "3",
                tag1: "",
                tag2: "",
                tag3: "",
                tag4: "",
                query: ""
            }}}> 
                <img src={worldBook} />
                <div className="Name">Non-fiction books</div>
            </Link>

            <Link className="exploreBox" to={{pathname:"/search", 
            state:{
                tag: "4",
                tag1: "",
                tag2: "",
                tag3: "",
                tag4: "",
                query: ""
            }}}> 
                <img src={dressIcon}/>
                <div className="Name">Women's fashion</div>
            </Link>

            <Link className="exploreBox" to={{pathname:"/search", 
            state:{
                tag: "5",
                tag1: "",
                tag2: "",
                tag3: "",
                tag4: "",
                query: ""
            }}}> 
                <img src={tunicIcon} />
                <div className="Name">Men's fashion</div>
            </Link>

            <Link className="exploreBox" href="http://www.google.com" to={{pathname:"/search", 
            state:{
                tag: "6",
                tag1: "",
                tag2: "",
                tag3: "",
                tag4: "",
                query: ""
            }}}> 
                <img src={diamondNecklace} />
                <div className="Name">Luxury</div>
            </Link>

            <Link className="exploreBox" href="http://www.google.com" to={{pathname:"/search", 
            state:{
                tag: "7",
                tag1: "",
                tag2: "",
                tag3: "",
                tag4: "",
                query: ""
            }}}> 
                <img src={burger} />
                <div className="Name">Food & drinks</div>
            </Link>

            <Link className="exploreBox" href="http://www.google.com" to={{pathname:"/search", 
            state:{
                tag: "8",
                tag1: "",
                tag2: "",
                tag3: "",
                tag4: "",
                query: ""
            }}}> 
                <img src={makeup} />
                <div className="Name">Beauty & Personal Care</div>
            </Link>

            <Link className="exploreBox" href="http://www.google.com" to={{pathname:"/search", 
            state:{
                tag: "9",
                tag1: "",
                tag2: "",
                tag3: "",
                tag4: "",
                query: ""
            }}}> 
                <img src={sofa} />
                <div className="Name">Furniture & Home Living</div>
            </Link>

            <Link className="exploreBox" href="http://www.google.com" to={{pathname:"/search", 
            state:{
                tag: "10",
                tag1: "",
                tag2: "",
                tag3: "",
                tag4: "",
                query: ""
            }}}> 
                <img src={pawprint} />
                <div className="Name">Pet supplies</div>
            </Link>

            <Link className="exploreBox" href="http://www.google.com" to={{pathname:"/search", 
            state:{
                tag: "11",
                tag1: "",
                tag2: "",
                tag3: "",
                tag4: "",
                query: ""
            }}}> 
                <img src={dj} />
                <div className="Name">Music accessories</div>
            </Link>

            <Link className="exploreBox" href="http://www.google.com" to={{pathname:"/search", 
            state:{
                tag: "12",
                tag1: "",
                tag2: "",
                tag3: "",
                tag4: "",
                query: ""
            }}}> 
                <img src={gameController} />
                <div className="Name">Video games</div>
            </Link>

            <Link className="exploreBox" href="http://www.google.com" to={{pathname:"/search", 
            state:{
                tag: "13",
                tag1: "",
                tag2: "",
                tag3: "",
                tag4: "",
                query: ""
            }}}> 
                <img src={photography} />
                <div className="Name">Photography</div>
            </Link>

            <Link className="exploreBox" href="http://www.google.com" to={{pathname:"/search", 
            state:{
                tag: "14",
                tag1: "",
                tag2: "",
                tag3: "",
                tag4: "",
                query: ""
            }}}> 
                <img src={basketball} />
                <div className="Name">Sports equipment</div>
            </Link>

            <Link className="exploreBox" href="http://www.google.com" to={{pathname:"/search", 
            state:{
                tag: "15",
                tag1: "",
                tag2: "",
                tag3: "",
                tag4: "",
                query: ""
            }}}> 
                <img src={computer} />
                <div className="Name">Computer hardware</div>
            </Link>

            <Link className="exploreBox" href="http://www.google.com" to={{pathname:"/search", 
            state:{
                tag: "16",
                tag1: "",
                tag2: "",
                tag3: "",
                tag4: "",
                query: ""
            }}}> 
                <img src={smartphone} />
                <div className="Name">Mobile phones</div>
            </Link>

            <Link className="exploreBox" href="http://www.google.com" to={{pathname:"/search", 
            state:{
                tag: "17",
                tag1: "",
                tag2: "",
                tag3: "",
                tag4: "",
                query: ""
            }}}> 
                <img src={chip} />
                <div className="Name">Electronic accessories</div>
            </Link>

            <Link className="exploreBox" href="http://www.google.com" to={{pathname:"/search", 
            state:{
                tag: "18",
                tag1: "",
                tag2: "",
                tag3: "",
                tag4: "",
                query: ""
            }}}> 
                <img src={jobOffer} />
                <div className="Name">Jobs</div>
            </Link>

            <Link className="exploreBox" href="http://www.google.com" to={{pathname:"/search", 
            state:{
                tag: "19",
                tag1: "",
                tag2: "",
                tag3: "",
                tag4: "",
                query: ""
            }}}> 
                <img src={services} />
                <div className="Name">Services</div>
            </Link>

            <Link className="exploreBox" href="http://www.google.com" to={{pathname:"/search", 
            state:{
                tag: "20",
                tag1: "",
                tag2: "",
                tag3: "",
                tag4: "",
                query: ""
            }}}> 
                <img src={free} />
                <div className="Name">Free items</div>
            </Link>    

        </div>

        </div>
        
    </div>

  )
}

export default ExploreSection