import { useState } from "react";
import ReadBooks from "../ReadBooks";
import WishList from "../WishList";
import SearchForm from "../SearchForm";

const Home = () => {

const [haveNewBooks, setHaveNewBooks] = useState(false);

    return (
        <div>
            <ReadBooks />
            <WishList />
            <SearchForm  haveNewBooks={haveNewBooks} setHaveNewBooks={setHaveNewBooks} />
        </div>
    )
};

export default Home; 