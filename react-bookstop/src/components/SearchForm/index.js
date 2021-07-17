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
            <section className='box-area'>
            {result.map((booked)=>{
                return(
                   
                 <article  className='single-box' key={booked.volumeInfo.id}>
                     <div className='img-area'>
                         <img className='' src={booked.volumeInfo.imageLinks.thumbnail} alt={booked.volumeInfo.title}/>
                     </div>
                     <div>
                         <h3 className='inner-box'>{booked.volumeInfo.title}</h3>
                         {/* <p className='overflow-auto'>{booked.volumeInfo.description}</p> */}
                         <p>
                         <span className='font-bold'>Author: </span>
                         {booked.volumeInfo.authors}</p>
                     </div>
                     <ul>
                         
                         <li><span className='font-bold'> Publisher :</span> {booked.volumeInfo.publisher}</li>
                         <span></span>
                         <li><span className='font-bold '> Published Date : </span> {booked.volumeInfo.publishedDate}</li>
                         <span></span>
                         <li><span className='font-bold'> Categories : </span>{booked.volumeInfo.categories}</li>
                     </ul>
                     <a target='_blank' rel="noreferrer" href={booked.volumeInfo.previewLink} className=' item-center btn btn-danger'>Buy Book</a>
                 </article>
                 
                )
            })}
            </section>
        </div>
    )
}