import Link from "next/link";
import React from "react";

interface CategoryProps {
    name: string,
    href: string,
}

const Category: React.FC<CategoryProps> = ({name, href}) => {
    return (
        <div className="category">
            <Link href={href}>
                <p>{name}</p>
            </Link>
        </div>
    );
};

export default Category;
