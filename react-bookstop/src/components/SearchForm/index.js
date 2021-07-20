import { useContext, useState, useEffect, useRef } from 'react';
import { useLocation } from "react-router-dom";
import { UserContext } from '../../App';
import { UserAuthStatusContext, UserAuthDispatchContext } from '../../App';
import axios from 'axios'

export default function SearchForm(props){
  const [book, setBook] = useState('');
  const [result,setResult]= useState([]);
  const [apiKey, setApiKey]= useState('AIzaSyAFH6VcFGFwnoVaO-ER32twGdgCa86v8Dw');

  const userContext = useContext(UserContext);
  const userAuth = useContext(UserAuthStatusContext);  
 
    // The following code is used to scroll this component into view when the correct window location is loaded
    const location = useLocation();
    const compRef = useRef(null);
    const searchResultsRef = useRef(null);

    useEffect( () => {
        if (location && location.pathname==="/searchbooks") {
            compRef.current.scrollIntoView();
        }
        // eslint-disable-next-line
    }, [location.pathname]);


   function handleChange(event){
       event.preventDefault()
        const book= event.target.value;
        setBook(book);
   }

   function handleSubmit(event){
     event.preventDefault();
     try {
     axios.get(`https://www.googleapis.com/books/v1/volumes?q=${book}&key=${apiKey}&maxResults=30`)
     .then(data =>{
         /* console.log(data.data.items); */
         setResult(data.data.items);
         props.setHaveNewBooks(true);
     })
    }
    catch(error) {
        console.error(error);
    }

   }

   useEffect(()=>{
    if (props.haveNewBooks) {
        searchResultsRef.current.scrollIntoView();
        props.setHaveNewBooks(false);
    }
   },[props.haveNewBooks]);

    return(
         <>
          <div ref={compRef} className="header-offset-div"></div> {/* Define a node reference to this component */}

          <div className=''> 
            <div className='search-book'>
            <h1 className='heading-list wish-list-heading'>Search Book</h1>
            <p className='heading-p '>Search For Your FAV Book</p>
            <form onSubmit={handleSubmit}>
                <div className='searchTerm form-group'>
                    <input type='text' onChange={handleChange} className='input-control mt-10 search-option ' placeholder='Search for books' />
                </div>
                <button type='submit' className='btn btn-danger btn-lg'>Search Books</button>
            </form>
            </div>

            <div ref={searchResultsRef} className="header-offset-div"></div> {/* Define a node reference to this component */}

            <section className='box-area' >
            {result.map((booked, index)=>{
                return(
                    <article  className='single-box' key={booked.id} >
                         <div className='img-area'>
                         <img className='bookThumb' src={booked.volumeInfo.imageLinks.thumbnail} alt={booked.volumeInfo.title}/>
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
        </>
    )
}