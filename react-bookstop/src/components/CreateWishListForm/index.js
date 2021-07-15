// import { useState } from 'react';

// const CreateWishListForm = () => {
//     const initialFormValues = {
//         title: '',
//         author: '',
//     };

//     const [values, setValues] = useState(initialFormValues);

//     // handle change function
//     const _handleChange = (e) => {
//         setValues((prevState) => {
//             return {
//                 ...prevState,
//                 [e.target.id]: e.target.value,
//             };
//         });
//     };

//     // create new wish list item function
//     const _createNewWishBook = async (e) => {
//         e.preventDefault();
//         try {

//         } catch (err) {
//             console.log(err)
//         }
//     };

//     return (
//         <form onSubmit={_createNewWishBook}>
//             <div>
//                 <label htmlFor='title'>Title</label>
//                     <input
//                         type='text'
//                         id='title'
//                         value={values.title}
//                         onChange={_handleChange}
//                         required
//                     />  
//             </div>
//             <div>
//                 <label htmlFor='author'>Author</label>
//                     <input
//                         type='text'
//                         id='author'
//                         value={values.author}
//                         onChange={_handleChange}
//                         unique
//                     />
//             </div>
//             <input type='submit' value='Add Book to Wish List' />
//         </form>
//     )
// };

// export default CreateWishListForm;