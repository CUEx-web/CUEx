//Below import login page
import Navbar from './components/Navbar.js';
import ExploreSection from './components/ExploreSection.js';
import RecommendedSection from './components/RecommendedSection.js';
import Footer from './components/Footer.js';

function App() {
  return (
    <div className="App">
      <Navbar />
      <ExploreSection />
      <RecommendedSection />
      <Footer/>
    </div>
  );
}

export default App;
