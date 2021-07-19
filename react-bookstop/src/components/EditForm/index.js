import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";
import { useHistory } from "react-router-dom";


const EditForm = ({ match }) => {
    const userContext = useContext(UserContext);
    const initialFormValues = {
        title: '',
        author: '',
    };

    const [values, setValues] = useState(initialFormValues);
    const history = useHistory();
    
    const _handleChange = (e) => {
        setValues((prevState) => {
            return {
                ...prevState,
                [e.target.id]: e.target.value,
            };
        });
    };

    const API_ENDPOINT = `http://localhost:4000/read-books/${match.params.bookId}`;

    const getBook = async () => {
        try {
            const book = await fetch(API_ENDPOINT);
            const data = await book.json();
            setValues({ title: data.title, author: data.title });
        } catch (err) {
            console.log(err)
        }
    };

    useEffect(() => {
        getBook();
    }, []);

    const _updateBook = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(API_ENDPOINT, {
                method: 'PUT',
                body: JSON.stringify(values),
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            if (response.status === 201) {
                userContext.getUser();
                history.push(`read-books/${match.params.bookId}`);
                setValues(initialFormValues);
                console.log('changing book')
            } else {
                alert('Something went wrong. Please try again');
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div>
            <form onSubmit={_updateBook}> 
                <label htmlFor='title'>Title</label>
                <input 
                    type='text'
                    id='title'
                    value={values.title}
                    onChange={_handleChange}
                />
                <label htmlFor='author'>Author</label>
                <input 
                    type='text'
                    id='author'
                    value={values.author}
                    onChange={_handleChange}
                />
                <input type='submit' value='Update book' />
            </form>
        </div>
    )
};

export default EditForm;