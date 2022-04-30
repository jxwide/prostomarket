import Link from "next/link";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const Product = ({ title, description, price, id, images, incart, jwt }) => {
    let [inCart, setInCart] = useState(false);
    let router = useRouter()
    useEffect(() => setInCart(incart), [incart]);

    let preview_image = "none_image";
    if (images.length) preview_image = images[0].source;

    const toCartButton = async () => {
        if (jwt == '') return router.push("/me");

        await axios({
            url: "/users/cart/add/product/" + id,
            headers: {
                Authorization: "Bearer " + jwt,
            },
        }).then(() => setInCart(true));
    };

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
                <p className="product-price">
                    <span className="green">{price}</span> ₽
                </p>
                {inCart ? (
                    <button className="small-button inCart">
                        Добавлено в корзину
                    </button>
                ) : (
                    <button className="small-button" onClick={toCartButton}>В корзину</button>
                )}
            </div>
        </div>
    );
};

export default Product;
