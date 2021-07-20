import { useState } from "react";
import ReadBooks from "../ReadBooks";
import WishList from "../WishList";
import SearchForm from "../SearchForm";

const Home = () => {

const [haveNewBooks, setHaveNewBooks] = useState(false);
const [refresh, setRefresh] = useState(false);

    return (
        <div>
            <ReadBooks refresh={refresh} setRefresh={setRefresh} />
            <WishList  refresh={refresh} setRefresh={setRefresh} />
            <SearchForm  haveNewBooks={haveNewBooks} setHaveNewBooks={setHaveNewBooks} />
        </div>
    )
};

export default Home; 