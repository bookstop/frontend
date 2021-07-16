import {
  Link
} from "react-router-dom";
import logo from '../../Assets/logo5.png'
export default function Nav(){

    return(
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <Link  className="navbar-brand myversion Link" href="/home"><img className='newlogo ' src={logo} /></Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
        </button>
            
        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
        <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
        <li className="nav-item active">
        <Link className="nav-link borderlight Link" to="/home">Home <span className="sr-only"></span></Link>
        </li>
        <li className="nav-item">
        <Link className="nav-link borderlight Link" to="/read">Reads</Link>
        </li>
        <li className="nav-item">
        <Link className="nav-link borderlight Link" to="/wishlist">Wish List</Link>
        </li>
        <li className="nav-item">
        <Link className="nav-link borderlight Link" to="/login">Login</Link>
        </li>
        
        
        </ul>
                
        </div>
      </nav>
  )
}