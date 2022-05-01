import type { NextPage } from "next";
import MainLayout from "../../components/layouts/MainLayout";
import axios from "axios";
import cookies from "next-cookies";
import Product from "../../components/Product";
import React from "react";
import RightBanners from "../../components/RightBanners";

const SearchPage: NextPage = ({query, products, cartProducts, jwt}) => {
    return (
        <MainLayout>
            <div className="page">
                <h1>Поиск по запросу: {query}</h1>

                <div className="query-page">
                    <div className="found-block goods-list">
                        {products.map((el, i) => (
                            <Product
                                id={el.id}
                                key={el.id}
                                title={el.title}
                                description={el.description}
                                price={el.price}
                                oldprice={el.oldprice}
                                images={el.images}
                                incart={cartProducts[i] == el.id}
                                jwt={jwt}
                            />
                        ))}
                    </div>
                    <div className="banners-block">
                        <RightBanners />
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default SearchPage;

export async function getServerSideProps(context) {
    let cartProducts = [];
    const q = context.query.query
    let { jwt } = cookies(context);

    let products = await axios({
        url: '/products/q/' + q
    }).then(response => response.data)

    if (jwt) {
        let cart = await axios({
            url: "/users/cart",
            headers: {
                Authorization: "Bearer " + jwt,
            },
        }).then((response) => response.data);

        for (let i = 0; i < cart.length; i++) {
            cartProducts.push(cart[i].productId);
        }
    } else jwt = ''

    return {
        props: { query: q, products, cartProducts, jwt },
    };
}
