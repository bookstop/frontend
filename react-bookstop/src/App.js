import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';   //minimizing bootstrap use 
import Navbar from './components/NavBar';
import SearchForm from './components/SearchForm';
import Review from './components/Reviews';


function App() {
  return (
    <div className="App">
      <Navbar/>
      <Review/>

      

    </div>
  );
}

export default App;
