//Below import login page
import Navbar from './components/Navbar.js';
import ExploreSection from './components/ExploreSection.js';
import RecommendedSection from './components/RecommendedSection.js';
import Footer from './components/Footer.js';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import SearchResultPage from './components/SearchResultPage.js';
import Homepage from './components/Homepage.js';
import UserProducts from './components/UserProducts.js';
import UploadlistingPage from './components/Uploadlistingpage.js'
import ProductPage from './components/ProductPage.js';

import LoginPage from './components/Login.js';
import RegisterNewUser from './components/RegisterNewUser.js';
import ForgotPassword from './components/ForgotPassword.js';
import ActiveAccount from './components/ActiveAccount.js';
import PersonalProfile from './components/PersonalProfile.js';
import OtherProfile from './components/OtherProfile.js';
import EditProfile from './components/EditProfile.js';

function App() {
  return (
    <Router>
    <div className="App">
      <Switch>
      <Route exact path='/'>
        <Homepage />
      </Route>

      <Route exact path='/search'>
        <SearchResultPage />
      </Route>

      <Route exact path='/userProducts'>
        <UserProducts />
      </Route>

      <Route exact path='/upload' >
        <UploadlistingPage />
      </Route>
      </Switch>

      <Route exact path='/product/:product_id' >
        <ProductPage />
      </Route>

      <Route exact path='/RegisterNewUser'>
        <RegisterNewUser />
      </Route>

      <Route exact path='/ForgotPassword' >
        <ForgotPassword />
      </Route>


      <Route exact path='/loginPage'>
        <LoginPage />
      </Route>

      <Route exact path='/ActiveAccount' >
        <ActiveAccount />
      </Route>

      <Route exact path='/PersonalProfile' >
        <PersonalProfile />
      </Route>

      <Route exact path='/OtherProfile' >
        <OtherProfile />
      </Route>

      <Route exact path='/EditProfile' >
        <EditProfile />
      </Route>


    </div>
    </Router>
  );
}

export default App;
