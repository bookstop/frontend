import { useEffect, useState } from "react";
import CreateReadForm from "../CreateReadForm";

const ReadBooks = () => {
    const [readBooks, setReadBooks] = useState([]);

    const getReadBooksData = async () => {
        const API_ENDPOINT = 'http://localhost:4000/read-books/:userId';
        try {
            const response = await fetch(API_ENDPOINT);
            const data = await res.json();
            setReadBooks(data);
        } catch (err) {
            console.log(err)
        }
      };

      useEffect(() => {
          getReadBooksData();
      }, []);

      return (
          <CreateReadForm />
      )
}

  export default ReadBooks;