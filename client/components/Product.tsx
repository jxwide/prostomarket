import Link from "next/link";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {useRouter} from "next/router";
import {newAlert} from "../store/alertSlice";
import {useDispatch} from "react-redux";

interface ProductProps {
    title: string,
    description: string,
    price: number,
    oldprice: number,
    id: number,
    images: object,
    incart: boolean,
    jwt: string
}

const Product: React.FC<ProductProps> = ({title, description, price, oldprice, id, images, incart, jwt}) => {
    let [inCart, setInCart] = useState(false);
    let router = useRouter();
    useEffect(() => setInCart(incart), [incart]);
    let dispatch = useDispatch()

    let preview_image = "none_image";
    if (images.length) preview_image = images[0].source;

    const toCartButton = async () => {
        if (jwt == "") return router.push("/me");

        await axios({
            url: "/users/cart/add/product/" + id,
            headers: {
                Authorization: "Bearer " + jwt,
            },
        }).then(() => {
            setInCart(true)
            dispatch(newAlert({text: 'Товар добавлен в корзину'}))
        });
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
                    {
                        oldprice == 0 ?
                            null :
                            <span className="old-price">
                                <span className="old-price-price">{oldprice.toLocaleString()} ₽</span>
                                <span className="sale">-{Math.floor((price / oldprice) * 100)}%</span>
                            </span>
                    }
                    <span className="new-price">{price.toLocaleString()} ₽</span>
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
