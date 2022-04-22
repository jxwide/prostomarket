import type { NextPage } from "next";
import MainLayout from "../../components/layouts/MainLayout";
import axios from "axios";
import React, { useEffect, useState } from "react";
import cookies from "next-cookies";
import Product from "../../components/Product";

const CartPage: NextPage = ({ cart }) => {
    let [fullPrice, setFullPrice] = useState(0);

    useEffect(() => {
        let price = 0;
        for (let i = 0; i < cart.length; i++) {
            price += cart[i].price;
        }
        setFullPrice(price);
    }, [cart]);

    return (
        <MainLayout>
            <div className="page">
                <h1>Моя корзина ({cart.length}): </h1>
                {cart.map((el) => (
                    <Product
                        title={el.title}
                        description={el.description}
                        price={el.price}
                        id={el.id}
                        key={el.id}
                        images={el.images}
                        incart={true}
                    />
                ))}

                <div className="to-pay-buttons">
                    <input type="email" placeholder="email" />
                    <button className="to-pay-button">
                        К оплате {fullPrice} ₽
                    </button>
                </div>
            </div>
        </MainLayout>
    );
};

export default CartPage;

export async function getServerSideProps(context) {
    let cart = [];
    let products = [];
    const { jwt } = cookies(context);

    if (jwt) {
        cart = await axios({
            url: "/users/cart",
            headers: {
                Authorization: "Bearer " + jwt,
            },
        }).then((response) => response.data);
    }

    for (let i = 0; i < cart.length; i++) {
        let prod = await axios({
            url: "/products/" + cart[i].productId,
        }).then((response) => response.data);

        products.push(prod);
    }

    return {
        props: { cart: products },
    };
}
