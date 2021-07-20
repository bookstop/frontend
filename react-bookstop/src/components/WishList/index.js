import CreateWishListForm from "../CreateWishListForm";
import { useContext, useEffect, useRef } from 'react';
import { useLocation, Link } from "react-router-dom";
import { UserContext } from "../../App";
import { UserAuthStatusContext, UserAuthDispatchContext } from '../../App';
import storage_log from "../../App";

const WishList = () => {
    const userContext = useContext(UserContext);
    const userAuth = useContext(UserAuthStatusContext);    

    // console.log('user context is:', userContext)
    // console.log(UserContext);  
    // console.log(userAuth);  

    // The following code is used to scroll this component into view when the correct window location is loaded
    const location = useLocation();
    const compRef = useRef(null);
    useEffect( () => {
        if (location && location.pathname==="/wishlist") {
            compRef.current.scrollIntoView();
        }
        // eslint-disable-next-line
    }, [location.pathname]);

      return (
          <>

          <div ref={compRef} className=" header-offset-div"></div> {/* Define a node reference to this component */}
          <div className='graywishlist' >  
            <CreateWishListForm />
                {!userContext.user ? <h2 className='titles-author'>Not logged in</h2> : 

                    userContext.user.wishList.map((book) => {
                        return (
                            <div key={book._id} className="book-list ">
                                {/* <Link to={`/wish-book/${book._id}`}>
                                    <h2>{book.title}</h2>
                                </Link>
                                <h3>{book.author}</h3> */}
                                <p className=' readbook-heading'>Title:</p>
                                <Link to={`/wish-books/${book._id}`}>
                                    
                                    <h2 className='titles-author'>{book.title}</h2>
                                </Link>
                                <p className=' readbook-heading'>Author:</p>
                                    <h2 className='titles-author'>{book.author}</h2>
                            </div>
                        )
                    })

                }    
            </div>
            </> 
            )            

}


export default WishList;


