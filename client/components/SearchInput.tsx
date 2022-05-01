import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const SearchInput = () => {
    let router = useRouter()
    const [search, setSearch] = useState('')

    return (
        <div className="search-input">
            <Link href="/categories">
                <button>Каталог</button>
            </Link>
            <input type="text" className="search-input-input" value={search} onChange={e => setSearch(e.target.value)}/>
            <button className="search-button" onClick={() => router.push('/search/' + search)}>Search</button>
        </div>
    );
};

export default SearchInput;
