import type { NextPage } from "next";
import MainLayout from "../../components/layouts/MainLayout";
import Option from "../../components/Option";
import ProductImagesView from "../../components/ProductImagesView";

const ProductViewPage: NextPage = () => {
    const test = [
        { source: "https://wallpaperaccess.com/full/2096686.jpg" },
        {
            source: "https://files.wallpaperpass.com/2019/10/outer%20space%20wallpaper%20002%20-%201000x1000-768x768.jpg",
        },
        { source: "https://wallpaperaccess.com/full/2472408.jpg" },
    ];

    return (
        <MainLayout>
            <div className="page">
                <p className="categories-list">PC, Computers, Lenovo</p>
                <h2 className="view-product-title">
                    15.6" Ноутбук Lenovo Legion 515ACH6 (1920x1080, AMD Ryzen 5
                    3.3 ГГц, RAM 8 ГБ, SSD 512 ГБ, GeForce RTX 3050, Windows 11
                    Home), 82JW00CGRU, Phantom Blue
                </h2>
                <div className="product-main-block">
                    <div className="product-images-block">
                        <ProductImagesView images={test} />
                    </div>
                    <div className="product-options-block">
                        <p className="bold">Коротко о товаре</p>
                        <div className="product-options">
                            <Option
                                title="Экран"
                                value="15.6 (1920x1080) IPS, 165 Гц"
                            />
                            <Option
                                title="Экран"
                                value="15.6 (1920x1080) IPS, 165 Гц"
                            />
                            <Option
                                title="Экран"
                                value="15.6 (1920x1080) IPS, 165 Гц"
                            />
                        </div>
                    </div>
                    <div className="product-price-block">
                        <p className="price-block-price">100000 ₽</p>
                        <button className="product-price-cart">
                            Добавить в корзину
                        </button>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default ProductViewPage;
