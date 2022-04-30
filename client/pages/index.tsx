import type { NextPage } from "next";
import MainLayout from "../components/layouts/MainLayout";
import BigBanner from "../components/BigBanner";
import MiniBanners from "../components/MiniBanners";
import RightBanners from "../components/RightBanners";
import axios from "axios";
import OneCategory from "../components/OneCategory";

const Home: NextPage = ({ superCats }) => {
    return (
        <MainLayout>
            <div className="page">
                <div className="big-banner">
                    <BigBanner />
                </div>
                <div className="main-page">
                    <div className="main-page-main">
                        <div className="mini-banners">
                            <MiniBanners />
                        </div>

                        <h1 className="margin-top">Категории</h1>
                        <div className="index-cat-list">
                            {superCats.map((el) => (
                                <OneCategory
                                    key={el.key}
                                    href={"/category/" + el.name}
                                    image={el.image}
                                    name={el.name}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="main-page-banners">
                        <RightBanners />
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default Home;

export async function getServerSideProps(context) {
    if (!axios.defaults.baseURL) return;

    let superCats = [];

    await axios({
        url: "/cats",
    }).then((response) => {
        let data = response.data;

        for (let i = 0; i < data.length; i++) {
            if (data[i].superCatId == null) {
                if (data[i].image != null && data[i].image != "last")
                    superCats.push(data[i]);
            }
        }
    });

    superCats.sort(() => Math.random() - 0.5);
    let shuffledCats = superCats.slice(0, 4);

    return {
        props: { superCats },
    };
}
