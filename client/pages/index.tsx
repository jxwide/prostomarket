import type { NextPage } from "next";
import MainLayout from "../components/layouts/MainLayout";
import BigBanner from "../components/BigBanner";

const Home: NextPage = () => {
    return (
        <MainLayout>
            <div className="page">
                <div className="big-banner">
                    <BigBanner />
                </div>
                <div className="main-page">
                    <div className="main-page-main">
                        <div className="mini-banners">
                            <div className="mini-banner"></div>
                            <div className="mini-banner"></div>
                            <div className="mini-banner"></div>
                            <div className="mini-banner"></div>
                        </div>
                    </div>
                    <div className="main-page-banners">
                        <div className="right-banners">
                            <div className="right-banner"></div>
                            <div className="right-banner"></div>
                            <div className="right-banner"></div>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default Home;
