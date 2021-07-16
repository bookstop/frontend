import { useState, useContext } from 'react';
import { UserContext } from '../../App';

const CreateWishListForm = () => {
    const userContext = useContext(UserContext);
   
    const initialFormValues = {
        title: '',
        author: '',
    };
    
    const [values, setValues] = useState(initialFormValues);


    // handle change function
    const _handleChange = (e) => {
        setValues((prevState) => {
            return {
                ...prevState,
                [e.target.id]: e.target.value,
            };
        });
    };

    // create new wish list item function
    const _createNewWishBook = async (e) => {
        e.preventDefault();
        try {
            const API_ENDPOINT = `http://localhost:4000/wish-lists`;
            const response = await fetch(API_ENDPOINT, {
                method: 'POST',
                body: JSON.stringify({
                    title: values.title,
                    author: values.author,
                    userId: userContext.user._id,
                }),
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            if (response.status === 201) {
                userContext.getUser();
                setValues(initialFormValues);
            }
        } catch (err) {
            console.log(err)
        }
    };

    return (
        <form onSubmit={_createNewWishBook}>
            <div>
                <label htmlFor='title'>Title</label>
                    <input
                        type='text'
                        id='title'
                        value={values.title}
                        onChange={_handleChange}
                        required
                    />  
            </div>
            <div>
                <label htmlFor='author'>Author</label>
                    <input
                        type='text'
                        id='author'
                        value={values.author}
                        onChange={_handleChange}
                    />
            </div>
            <input type='submit' value='Add Book to Wish List' />
        </form>
    )
};

export default CreateWishListForm;