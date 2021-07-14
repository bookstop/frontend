
export default function Nav(){
    return(
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand myversion" href="#"><img className='logo ' />BOOK STOP 📚</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
        </button>
            
        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
        <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
        <li className="nav-item active">
        <a className="nav-link borderlight" href="#">Home <span className="sr-only"></span></a>
        </li>
        <li className="nav-item">
        <a className="nav-link borderlight" href="#">Reads</a>
        </li>
        <li className="nav-item">
        <a className="nav-link borderlight" href="#">Wish List</a>
        </li>
        <li className="nav-item">
        <a className="nav-link borderlight" href="#">Login</a>
        </li>
        
        
        </ul>
                
        </div>
      </nav>
  )
}