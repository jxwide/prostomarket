import Link from "next/link";
import React from "react";
import Image from "next/image";

const OneCategory = ({ href, image, name }) => {
    return (
        <Link href={href || "/"}>
            <div className="index-category">
                <Image
                    src={image || "/green.png"}
                    width="170px"
                    height="170px"
                />
                <p className="index-cat-name">{name}</p>
            </div>
        </Link>
    );
};

export default OneCategory;
