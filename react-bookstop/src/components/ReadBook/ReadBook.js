import { useContext, useEffect } from 'react';
import { UserContext } from '../../App';

const ReadBook = () => {
    const userContext = useContext(UserContext);

    const getBook = async () => {
        try {
            const API_ENDPOINT = `http://localhost:4000/read-books/${userContext.user.book._id}`;
            const response = await fetch(API_ENDPOINT);
            const data = await response.json();
            
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getBook();
    }, []);

    return (
        <h1>this is a book</h1>
    )
};

export default ReadBook;