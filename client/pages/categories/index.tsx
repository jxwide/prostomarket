import type { NextPage } from "next";
import MainLayout from "../../components/layouts/MainLayout";
import Category from "../../components/Category";
import axios from "axios";
import BackButton from "../../components/BackButton";

const CategoriesPage: NextPage = ({ superCats }) => {
    return (
        <MainLayout>
            <div className="page">
                <BackButton />
                <h1>Каталог</h1>
                <div className="cat-page">
                    <div className="super-cats">
                        {superCats.map((el) => (
                            <Category
                                name={el.name}
                                href={"/categories/" + el.name}
                            />
                        ))}
                    </div>
                    <div className="sub-cats"></div>
                </div>
            </div>
        </MainLayout>
    );
};

export default CategoriesPage;

export async function getServerSideProps(context) {
    let superCats = [];

    await axios({
        url: "/cats",
    }).then((response) => {
        let data = response.data;

        for (let i = 0; i < data.length; i++) {
            if (data[i].superCatId == null) superCats.push(data[i]);
        }

        console.log(response.data);
    });

    return {
        props: { superCats },
    };
}
