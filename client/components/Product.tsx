import Link from "next/link";
import React from "react";

const Product = ({ title, description, price, id, images }) => {
    let preview_image = "none_image";
    if (images.length) preview_image = images[0].source;

    return (
        <div className="product">
            <div className="product-block">
                <div className="image">
                    <img
                        className="product-image-in-list"
                        src={preview_image}
                        alt=""
                    />
                </div>
                <div className="info">
                    <Link href={"/product/" + id}>
                        <p className="product-title">{title}</p>
                    </Link>

                    <p className="product-description">{description}</p>
                </div>
            </div>
            <div className="price-block">
                <p className="product-price">{price} ₽</p>
                <button className="small-button">В корзину</button>
            </div>
        </div>
    );
};

export default Product;
