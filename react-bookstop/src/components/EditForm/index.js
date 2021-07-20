import { useContext, useState } from "react";
import { UserContext } from "../../App";
import { useHistory } from "react-router-dom";


const EditForm = ({ currentBook }) => {
    const API_ENDPOINT = `https://bookstop-api.herokuapp.com/read-books/${currentBook._id}`;

    const [values, setValues] = useState(currentBook);
    
    const userContext = useContext(UserContext);
  
    const history = useHistory();
    
    const _handleChange = (e) => {
        setValues((prevState) => {
            return {
                ...prevState,
                [e.target.id]: e.target.value,
            };
        });
    };

    const _updateBook = async (e) => {
        e.preventDefault();
        console.log('values:' , values);
        try {
            const newValues = {};
            if (values.author !== '') {
                newValues.author = values.author;
            };
            if (values.title !== '') {
                newValues.title = values.title
            };
            if (values.author === '' && values.title === ''){
                return;
            };
            if (values.review !== '') {
                newValues.review = values.review;
            }
            const response = await fetch(API_ENDPOINT, {
                method: 'PUT',
                body: JSON.stringify({
                    title: values.title,
                    author: values.author,
                    review: values.review,
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            if (response.status === 201) {
                userContext.getUser();
                setValues(values);
                userContext.setUserUpdates=(userContext.userUpdates+1);
                history.push(`/read-books/${currentBook._id}`);
            } else {
                alert('Something went wrong. Please try again');
            }
        } catch (err) {
            console.log(err)
        }
    };

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
                <label htmlFor='review'>Review</label>
                <input
                    type='text'
                    id='review'
                    value={values.review}
                    onChange={_handleChange}
                />
                <input type='submit' value='Update book' />
            </form>
        </div>
    )
};

export default EditForm;

