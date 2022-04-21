import type { NextPage } from "next";
import MainLayout from "../../components/layouts/MainLayout";
import Option from "../../components/Option";
import ProductImagesView from "../../components/ProductImagesView";
import axios from "axios";
import { useEffect, useState } from "react";

const ProductViewPage: NextPage = ({ product }) => {
    let [catsString, setCatsString] = useState("");
    let [options, setOptions] = useState([]);

    useEffect(() => {
        setCatsString("");
        let cats = product.cats;
        cats.map((el) => setCatsString(catsString + " " + el.name));

        setOptions(product.options.slice(0, 4));
    }, [product]);

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
                        <p className="price-block-price">{product.price} ₽</p>
                        <button className="product-price-cart">
                            Добавить в корзину
                        </button>
                    </div>
                </div>

                <h2 className="h2">Описание</h2>
                <p className="un-margin">{product.description}</p>

                <h2 className="h2">Характеристики</h2>
                <div className="product-options">
                    {product.options.map((el) => (
                        <Option key={el.id} title={el.title} value={el.value} />
                    ))}
                </div>
            </div>
        </MainLayout>
    );
};

export default ProductViewPage;

export async function getServerSideProps(context) {
    let productId = context.query.productId;

    let product = await axios({
        url: "/products/" + productId,
    }).then((response) => response.data);

    return {
        props: { product },
    };
}
