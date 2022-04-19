import Link from "next/link";
import React from "react";

const Category = ({ name, href }) => {
    return (
        <div className="category">
            <Link href={href}>
                <p>{name}</p>
            </Link>
        </div>
    );
};

export default Category;
