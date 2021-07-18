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
        // <form onSubmit={_createNewWishBook}>
        //     <div>
        //         <label htmlFor='title'>Title</label>
        //             <input
        //                 type='text'
        //                 id='title'
        //                 value={values.title}
        //                 onChange={_handleChange}
        //                 required
        //             />  
        //     </div>
        //     <div>
        //         <label htmlFor='author'>Author</label>
        //             <input
        //                 type='text'
        //                 id='author'
        //                 value={values.author}
        //                 onChange={_handleChange}
        //             />
        //     </div>
        //     <input type='submit' value='Add Book to Wish List' />
        // </form>
         <div className='read-list wish-list'>
         <h1 className='heading-list wish-list-heading'>Wish List</h1>
         <p className='heading-p'>Add your Fav Books in your Wish List</p>
     <div className='container py-5'>
         <div className='row'>
         <div className='listforms col-lg-6 col-xm-12'>
     <form onSubmit={_createNewWishBook}>
         
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
         <input className='btn-read btn btn-danger btn-lg ' type='submit' value='Add Book' />
     </form>
     </div>
     <div className='read-list-data col-lg-6 col-xm-12'>
         <h3>Title & Author</h3>
         <p>All the reviews should go here</p>
     </div>
     </div>
     </div>
     </div>
    )
};

export default CreateWishListForm;