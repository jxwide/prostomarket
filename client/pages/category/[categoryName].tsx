import type { NextPage } from "next";
import MainLayout from "../../components/layouts/MainLayout";
import Product from "../../components/Product";
import axios from "axios";
import cookies from "next-cookies";

const CategoryPage: NextPage = ({ categoryName, products, cartProducts }) => {
    console.log(cartProducts);

    return (
        <MainLayout>
            <div className="page">
                <h1>{categoryName}</h1>
                <div className="page-list">
                    <div className="options-list">
                        <p>Хар-ки</p>
                    </div>
                    <div className="goods-list">
                        {products.map((el, i) => (
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

    return {
        props: { categoryName, products, cartProducts },
    };
}
