import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';

const ReadBook = (props) => {
    const userContext = useContext(UserContext);
    const [currentBook, setCurrentBook] = useState(null);

    const getBook = async () => {
        try {
            const API_ENDPOINT = `http://localhost:4000/read-books/book/${props.match.params.bookId}`;
            const response = await fetch(API_ENDPOINT);
            const data = await response.json();
            console.log(data);
            setCurrentBook(data);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getBook();
    }, []);

    return (
        <div>
            <h1>{currentBook.title}</h1>
            <h2>{currentBook.author}</h2>
        </div>

    )
};

export default ReadBook;