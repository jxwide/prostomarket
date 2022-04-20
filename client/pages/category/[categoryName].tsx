import type { NextPage } from "next";
import MainLayout from "../../components/layouts/MainLayout";
import Product from "../../components/Product";
import axios from "axios";

const CategoryPage: NextPage = ({ categoryName, products }) => {
    console.log(products);

    return (
        <MainLayout>
            <div className="page">
                <h1>{categoryName}</h1>
                <div className="page-list">
                    <div className="options-list">
                        <p>Хар-ки</p>
                    </div>
                    <div className="goods-list">
                        {products.map((el) => (
                            <Product
                                id={el.id}
                                key={el.id}
                                title={el.title}
                                description={el.description}
                                price={el.price}
                                images={el.images}
                            />
                        ))}
                        {/*<Product image, title, description, price, id/>*/}
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default CategoryPage;

export async function getServerSideProps(context) {
    let products = [];
    let categoryName = context.query.categoryName;

    products = await axios({
        url: "/products/cat/" + categoryName,
    }).then((response) => response.data);

    return {
        props: { categoryName, products },
    };
}
