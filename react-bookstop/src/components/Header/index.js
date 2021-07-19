import { useContext } from 'react';
import { UserAuthStatusContext } from '../../App';

export default function Header(){

  const userAuth = useContext(UserAuthStatusContext);

    return(
        <div className='header-wrapper'>
          <div className='main-info'>

          { ((userAuth) && (userAuth.status==='active') && ((Date.now()-userAuth.lastAccess)<900) ) ? 
             (
               <>
              <h3 className='welcome-harry'>Welcome Back {userAuth.firstName}!</h3>
              <h1 className='header-heading'>Best Spot to Find Books  </h1>
              <h1 className='header-heading'> You Love  </h1>
              </>
             )
             :
             (
               <>
               <h1 className='header-heading'>Best Spot to Find Books</h1>
               <h1 className='header-heading'> You Love  </h1>
               <div className="header-button-box">
                 <div><a href='/login' className=' btn btn-danger btn-lg' alt="Log In">Log In</a></div>
                <div><a href='/register' className=' btn btn-danger btn-lg' alt="Register">Register</a></div>
               </div>
               </>
             )
          }

          </div>
        </div>
    )
}