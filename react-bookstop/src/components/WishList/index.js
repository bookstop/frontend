import CreateWishListForm from "../CreateWishListForm";
import { useContext, useEffect, useRef } from 'react';
import { useLocation } from "react-router-dom";
import { UserContext } from "../../App";

const WishList = () => {
    const userContext = useContext(UserContext);
    
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
          <div ref={compRef} className="header-offset-div"></div> {/* Define a node reference to this component */}
          <div >  
            <CreateWishListForm />
                {!userContext.user ? <h2>Not logged in</h2> : 
                    userContext.user.wishList.map((book) => {
                        return (
                            <div key={book._id}>
                                <h2>{book.title}</h2>
                                <h3>{book.author}</h3>
                            </div>
                        )
                    })

                }    
            </div>
            </>
      )
}

export default WishList;