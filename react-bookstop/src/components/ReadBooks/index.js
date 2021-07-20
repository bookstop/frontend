import CreateReadForm from "../CreateReadForm";
import { useContext, useEffect, useRef } from "react";
import { useLocation, Link } from "react-router-dom";
import { UserContext } from '../../App';
import { UserAuthStatusContext, UserAuthDispatchContext } from '../../App';

const ReadBooks = () => {

    const userContext = useContext(UserContext);
    const userAuth = useContext(UserAuthStatusContext);

    // The following code is used to scroll this component into view when the correct window location is loaded
    const location = useLocation();
    const compRef = useRef(null);
    useEffect( () => {
        if (location && location.pathname==="/readbooks") {
            compRef.current.scrollIntoView();
        }
        // eslint-disable-next-line
    }, [location.pathname]);

    return (
         <>
        <div ref={compRef} className="header-offset-div"></div> {/* Define a node reference to this component */}
          <div> 

            <CreateReadForm />

                {!userContext.user ? <h2>Not Logged In</h2> : 

 
                    userContext.user.readBook.map((book) => {
                        return (
                            <div key={book._id} className="book-list">
                                <Link to={`/read-books/${book._id}`}>
                                    <h2>{book.title}</h2>
                                </Link>
                                    <h3>{book.author}</h3>
                            </div>
                        )
                    })

                }    
            </div>

        </>
      )
}

  export default ReadBooks;
  