import React from "react";
import Link from "next/link";

const SearchInput = () => {
    return (
        <div className="search-input">
            <Link href="/categories">
                <button>Каталог</button>
            </Link>
            <input type="text" className="search-input-input" />
            <button className="search-button">Search</button>
        </div>
    );
};

export default SearchInput;
