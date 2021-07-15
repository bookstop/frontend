import {useState, useEffect} from 'react';
import axios from 'axios'

export default function SearchForm(){
  const [book, setBook] = useState('');
  const [result,setResult]= useState([]);
  const [apiKey, setApiKey]= useState('AIzaSyAFH6VcFGFwnoVaO-ER32twGdgCa86v8Dw');




  
   function handleChange(event){
       event.preventDefault()
        const book= event.target.value;
        setBook(book);
   }

   function handleSubmit(event){
     event.preventDefault();
     axios.get(`https://www.googleapis.com/books/v1/volumes?q=${book}&key=${apiKey}&maxResults=30`)
     .then(data =>{
         console.log(data.data.items);
         setResult(data.data.items)
     })
   }

   useEffect(()=>{
//    handleChange();
},[]);

    return(
        <div className='container'>
            <h1>Search For Your FAV Book</h1>
            <form onSubmit={handleSubmit}>
                <div className='form-group'>
                    <input type='text' onChange={handleChange} className='input-control mt-10' placeholder='Search for books' />
                </div>
                <button type='submit' className='btn btn-danger'>Search</button>
            </form>
            {result.map(book=>{
                <img src={book.volumeInfo.imageLinks.thumbnail} alt='books'/>
            })}
        </div>
    )
}