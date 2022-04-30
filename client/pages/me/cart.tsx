import type { NextPage } from "next";
import MainLayout from "../../components/layouts/MainLayout";
import axios from "axios";
import React, { useEffect, useState } from "react";
import cookies from "next-cookies";
import Product from "../../components/Product";
import { useRouter } from "next/router";

const CartPage: NextPage = ({ cart, jwt }) => {
    let [fullPrice, setFullPrice] = useState(0);

    const router = useRouter();
    useEffect(() => {
        if (jwt == "") router.push("/me");

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
    let { jwt } = cookies(context);

    if (jwt) {
        cart = await axios({
            url: "/users/cart",
            headers: {
                Authorization: "Bearer " + jwt,
            },
        }).then((response) => response.data);
    } else jwt = "";

    for (let i = 0; i < cart.length; i++) {
        let prod = await axios({
            url: "/products/" + cart[i].productId,
        }).then((response) => response.data);

        products.push(prod);
    }

    return {
        props: { cart: products, jwt },
    };
}
