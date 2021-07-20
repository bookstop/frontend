import { useEffect, useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { UserContext } from '../../App';

const WishBook = (props) => {
    const [currentBook, setCurrentBook] = useState(null);
    const API_ENDPOINT = `http://localhost:4000/wish-lists/book/${props.match.params.bookId}`;
    const userContext = useContext(UserContext);
    const history = useHistory();

    const getBook = async () => {
        try {
            const response = await fetch(API_ENDPOINT);
            const data = await response.json();
            // console.log(data);
            setCurrentBook(data);
        } catch (err) {
            console.log(err);
        }
    }

    const _handleDelete = async (e) => {
        const API_ENDPOINT = `http://localhost:4000/wish-lists/${props.match.params.bookId}`;
        if (window.confirm('Are you sure you want to delete?')) {
            try {
                const deletedBook = await fetch(API_ENDPOINT, { method: 'DELETE'});
                if(deletedBook.status === 204) {
                    userContext.getUser();
                    history.push('/home');
                } else {
                    alert('Something went wrong. Please try again!');
                } 
            } catch (err) {
                console.log(err);
            }
        }
        return;
    };

    useEffect(() => {
        getBook();
    }, []);
    
    if (!currentBook) return <h1>Finding your book on the shelf!</h1>

    return (
        <div>
            <h1>{currentBook.title}</h1>
            <h2>{currentBook.author}</h2>
            <Link className='btn' to={`/wish-book/edit/${props.match.params.bookId}`}>Edit</Link>
            <button className='btn' onClick={_handleDelete}>Delete</button>
        </div>
    )
};

export default WishBook;