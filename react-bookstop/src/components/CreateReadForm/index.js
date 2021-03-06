import { useState, useContext } from 'react';
import { UserContext } from '../../App';

const CreateReadForm = () => {
    const userContext = useContext(UserContext);

    const initialFormValues = {
        title: '',
        author: '',
        review: '',
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
    const _createNewReadBook = async (e) => {
        e.preventDefault();
        try {
            const API_ENDPOINT = 'https://bookstop-api.herokuapp.com/read-books';
            const response = await fetch(API_ENDPOINT, {
                method: 'POST',
                body: JSON.stringify({
                    title: values.title,
                    author: values.author,
                    review: values.review,
                    userId: userContext.user._id,
                }),
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            if (response.status === 201)
                userContext.getUser();
                setValues(initialFormValues);
        } catch (err) {
            console.log(err)
        }
    };

    return (
        <div className='read-list'>
            <h1 className='heading-list'>My Bookshelf</h1>
            <p className='heading-p'>Add the books you've already read to your bookshelf</p>
        <div className='container py-5'>
            <div className='row'>
            <div className='listforms'>
        <form onSubmit={_createNewReadBook}>
            
            <div className='txt_field'>
                <label className='heading-p' htmlFor='title'>Title</label>
                    <input
                        type='text'
                        id='title'
                        value={values.title}
                        onChange={_handleChange}
                        required
                    />  
            </div>
            <div className='txt_field'>
                <label className='heading-p' htmlFor='author'>Author</label>
                    <input
                        type='text'
                        id='author'
                        value={values.author}
                        onChange={_handleChange}
                        required
                    />
            </div>
            <div className='txt_field'>
                <label className='heading-p' htmlFor='review'>Review</label>
                    <input
                        type='text'
                        id='review'
                        value={values.review}
                        onChange={_handleChange}
                    />
            </div>
            <input className='btn-read btn btn-danger btn-lg ' type='submit' value='Add Book' />
        </form>
        </div>
        
        </div>
        </div>
        </div>
    )
};

export default CreateReadForm;