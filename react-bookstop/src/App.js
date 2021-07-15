import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';   //minimizing bootstrap use 
import Navbar from './components/NavBar';
import SearchForm from './components/SearchForm';


function App() {
  return (
    <div className="App">
      <Navbar/>
      <SearchForm/>
      

    </div>
  );
}

export default App;
