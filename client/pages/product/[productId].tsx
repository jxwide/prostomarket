import type { NextPage } from "next";
import MainLayout from "../../components/layouts/MainLayout";
import Option from "../../components/Option";
import ProductImagesView from "../../components/ProductImagesView";
import axios from "axios";
import React, { useEffect, useState } from "react";
import cookies from "next-cookies";
import { useRouter } from "next/router";

const ProductViewPage: NextPage = ({ product, inCart, jwt }) => {
    let [incart, setIncart] = useState(Boolean(inCart));
    let [catsString, setCatsString] = useState("");
    let [options, setOptions] = useState([]);
    let router = useRouter();

    useEffect(() => {
        setCatsString("");
        let cats = product.cats;
        cats.map((el) => setCatsString(catsString + " " + el.name));

        setOptions(product.options.slice(0, 4));
    }, [product]);

    useEffect(() => setIncart(inCart), [inCart]);

    const toCartButton = async () => {
        if (!jwt) return router.push("/me");

        let productId = product.id;
        await axios({
            url: "/users/cart/add/product/" + productId,
            headers: {
                Authorization: "Bearer " + jwt,
            },
        }).then(() => setIncart(true));
    };

    return (
        <MainLayout>
            <div className="page">
                <p className="categories-list">{catsString}</p>
                <h2 className="view-product-title">{product.title}</h2>
                <div className="product-main-block">
                    <div className="product-images-block">
                        <ProductImagesView images={product.images} />
                    </div>
                    <div className="product-options-block">
                        <p className="bold">Коротко о товаре</p>
                        <div className="product-options">
                            {options.map((el) => (
                                <Option
                                    key={el.id}
                                    title={el.title}
                                    value={el.value}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="product-price-block">
                        <p className="product-price view-product-price">
                            {
                                product.oldprice == 0 ?
                                    null :
                                    <span className="old-price">
                                <span className="old-price-price">{product.oldprice.toLocaleString()} ₽</span>
                                <span className="sale">-{Math.floor((product.price / product.oldprice) * 100)}%</span>
                            </span>
                            }
                            <span className="new-price">{product.price.toLocaleString()} ₽</span>
                        </p>

                        {incart ? (
                            <button className="product-price-cart inCart">
                                Добавлено в корзину
                            </button>
                        ) : (
                            <button
                                className="product-price-cart"
                                onClick={toCartButton}
                            >
                                Добавить в корзину
                            </button>
                        )}
                    </div>
                </div>

                <h2 className="h2">Описание</h2>
                <p className="un-margin">{product.description}</p>

                <h2 className="h2">Характеристики</h2>
                {product.options.length > 0 ? (
                    <div className="product-options">
                        {product.options.map((el) => (
                            <Option
                                key={el.id}
                                title={el.title}
                                value={el.value}
                            />
                        ))}
                    </div>
                ) : (
                    <p>Характеристик нет</p>
                )}
            </div>
        </MainLayout>
    );
};

export default ProductViewPage;

export async function getServerSideProps(context) {
    let productId = context.query.productId;
    let cart = [];
    let cartProducts = [];
    let inCart = false;
    let { jwt } = cookies(context);

    let product = await axios({
        url: "/products/" + productId,
    }).then((response) => response.data);

    if (jwt) {
        cart = await axios({
            url: "/users/cart",
            headers: {
                Authorization: "Bearer " + jwt,
            },
        }).then((response) => response.data);

        for (let i = 0; i < cart.length; i++) {
            if (productId == cart[i].productId) inCart = true;
        }
    } else jwt = "";

    return {
        props: { product, inCart, jwt },
    };
}
