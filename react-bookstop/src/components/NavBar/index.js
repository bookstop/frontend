import { useContext } from 'react';
import { Link } from "react-router-dom";
import Logo from "../../Assets/logo_v2.png"
import { UserAuthStatusContext } from '../../App';


export default function Nav(){

  const userAuth = useContext(UserAuthStatusContext);

    return(

      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">

        <Link  className="navbar-brand myversion Link" to="/home"><img className='logo' src={Logo} alt="Logo"/> BOOKSTOP 📚</Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
        </button>
            
        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
        <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
        {/* <li className="nav-item active">
        <Link className="nav-link borderlight Link" to="/home">Home <span className="sr-only"></span></Link>
        </li> */}
        <li className="nav-item">
        <Link className="nav-link borderlight Link" to="/readbooks">Read Books</Link>
        </li>
        <li className="nav-item">
        <Link className="nav-link borderlight Link" to="/wishlist">Wish List</Link>
        </li>
        <li className="nav-item">
        <Link className="nav-link borderlight Link" to="/searchbooks">Search Books</Link>
        </li>

        { ((!userAuth) || (userAuth.status!=='active') || ((Date.now()-userAuth.lastAccess)>900000) ) ? (
          
          
          <li className="nav-item">
         
            <Link className="nav-link borderlight Link" to="/login">Log In</Link>
            </li>
          )  :  (
            <>
            <li className="nav-item">
            <Link className="nav-link borderlight Link" to="/">Welcome, {userAuth.firstName} {userAuth.lastName}</Link>
            </li>
            <li className="nav-item">
            <Link className="nav-link borderlight Link" to="/logout">Log Out</Link>
            </li>
            </>            
          )
        }
        
        <li className="nav-item">
        <Link className="nav-link borderlight Link" to="/register">Register</Link>
        </li> 
        </ul>
                
        </div>
      </nav>
  )
}



