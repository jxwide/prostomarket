import type { NextPage } from "next";
import MainLayout from "../../components/layouts/MainLayout";
import Product from "../../components/Product";
import axios from "axios";
import cookies from "next-cookies";
import BackButton from "../../components/BackButton";
import React, { useEffect, useState } from "react";
import Option from "../../components/Option";

const CategoryPage: NextPage = ({
    categoryName,
    products,
    cartProducts,
    allOptions,
}) => {
    let [allProducts, setAllProducts] = useState([]);
    let [optionsList, setOptionsList] = useState([]);
    let [newOptionSelect, setNewOptionSelect] = useState("");
    let [optionValue, setOptionValue] = useState("");

    useEffect(() => setAllProducts(products), [products]);

    const newOption = () => {
        if (newOptionSelect == "" || optionValue == "") return;
        let newoption = { title: newOptionSelect, value: optionValue };
        setOptionsList([...optionsList, newoption]);
    };

    const optionsSearch = async () => {
        if (optionsList.length == 0) return;

        let newProducts = await axios({
            url: "/products/by/options",
            method: "POST",
            data: optionsList,
        }).then((response) => response.data);

        console.log("newprod", newProducts);

        if (newProducts) setAllProducts(newProducts);
    };

    return (
        <MainLayout>
            <div className="page">
                <BackButton />

                <h1>
                    {categoryName} ({allProducts.length})
                </h1>
                <div className="page-list">
                    <div className="options-list">
                        <p>Характеристики</p>

                        <div className="options-list-list">
                            {optionsList.map((el, i) => (
                                <div className="one-option">
                                    <p className="option-title">{el.title}</p>
                                    <p className="option-value">{el.value}</p>
                                </div>
                            ))}

                            <button
                                className="options-list-add"
                                onClick={optionsSearch}
                            >
                                Поиск
                            </button>
                        </div>

                        <div className="option-list-option">
                            <p>Добавить опцию</p>

                            <select
                                value={newOptionSelect}
                                onChange={(e) =>
                                    setNewOptionSelect(e.target.value)
                                }
                            >
                                {allOptions.map((el, i) => (
                                    <option value={el} key={i}>
                                        {el}
                                    </option>
                                ))}
                            </select>
                            <input
                                type="text"
                                className="options-list-input"
                                value={optionValue}
                                onChange={(e) => setOptionValue(e.target.value)}
                            />
                            <button
                                className="options-list-add"
                                onClick={newOption}
                            >
                                +
                            </button>
                        </div>
                    </div>
                    <div className="goods-list">
                        {allProducts.map((el, i) => (
                            <Product
                                id={el.id}
                                key={el.id}
                                title={el.title}
                                description={el.description}
                                price={el.price}
                                images={el.images}
                                incart={cartProducts[i] == el.id}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default CategoryPage;

export async function getServerSideProps(context) {
    let products = [];
    let cart = [];
    let cartProducts = [];
    let allOptions = [];
    let categoryName = context.query.categoryName;
    const { jwt } = cookies(context);

    products = await axios({
        url: "/products/cat/" + categoryName,
    }).then((response) => response.data);

    if (jwt) {
        cart = await axios({
            url: "/users/cart",
            headers: {
                Authorization: "Bearer " + jwt,
            },
        }).then((response) => response.data);

        for (let i = 0; i < cart.length; i++) {
            cartProducts.push(cart[i].productId);
        }
    }

    allOptions = await axios({
        url: "/options",
    })
        .then((response) => response.data)
        .catch(() => (allOptions = []));

    console.log(allOptions);

    return {
        props: { categoryName, products, cartProducts, allOptions },
    };
}
