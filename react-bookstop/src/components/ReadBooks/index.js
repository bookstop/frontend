import CreateReadForm from "../CreateReadForm";
import { useContext, useEffect, useRef } from "react";
import { useLocation, Link } from "react-router-dom";
import { UserContext } from '../../App';

const ReadBooks = () => {

    const userContext = useContext(UserContext);
    // console.log('user context is:', userContext)
    // console.log(UserContext);

    // The following code is used to croll this component into view when the correct window location is loaded
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
                {!userContext.user ? <h2 className='titles-author'>Not logged in</h2> : 
                    userContext.user.readBook.map((book) => {
                        
                        return (
                            <div key={book._id} className="book-list">
                                
                                <p className=' readbook-heading'>Title:</p>
                                <Link to={`/read-books/${book._id}`}>
                                    
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

  export default ReadBooks;
  