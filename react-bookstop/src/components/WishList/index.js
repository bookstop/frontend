import CreateWishListForm from "../CreateWishListForm";
import { useContext } from 'react';
import { UserContext } from "../../App";
import { Link } from 'react-router-dom';

const WishList = () => {
   const userContext = useContext(UserContext);

      return (
          <div>
            <CreateWishListForm />
                {!userContext.user ? <h2>Not logged in</h2> : 
                    userContext.user.wishList.map((book) => {
                        return (
                            <div key={book._id} className="book-list">
                                <Link to={`/book/${book._id}`}>
                                    <h2>{book.title}</h2>
                                </Link>
                                <h3>{book.author}</h3>
                            </div>
                        )
                    })

                }    
            </div>
      )
}

export default WishList;