import CreateReadForm from "../CreateReadForm";
import { useContext } from "react";
import { UserContext } from '../../App';

const ReadBooks = () => {
    const userContext = useContext(UserContext);
    console.log('user context is:', userContext)
    // console.log(UserContext);
      return (
          <div>
            <CreateReadForm />
                {!userContext.user ? <h2>Not logged in</h2> : 
                    userContext.user.readBook.map((book) => {
                        return (
                            <div key={book._id}>
                                <h2>{book.title}</h2>
                                <h3>{book.author}</h3>
                            </div>
                        )
                    })

                }    
            </div>
      )
}

  export default ReadBooks;