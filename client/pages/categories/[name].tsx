import type { NextPage } from "next";
import MainLayout from "../../components/layouts/MainLayout";
import axios from "axios";
import Category from "../../components/Category";
import BackButton from "../../components/BackButton";
import Link from "next/link";

const SubCategoriesPage: NextPage = ({ cats, superCats, catName }) => {
    return (
        <MainLayout>
            <div className="page">
                <BackButton />
                <h1>Каталог</h1>
                <div className="cat-page">
                    <div className="super-cats">
                        {superCats.map((el) => (
                            <Category
                                key={el.id}
                                name={el.name}
                                href={"/categories/" + el.name}
                            />
                        ))}
                    </div>
                    <div className="sub-cats">
                        <Link href={"/category/" + catName}>
                            <p className="h">{catName}</p>
                        </Link>
                        {cats.map((el) => (
                            <Category
                                key={el.id}
                                name={el.name}
                                href={"/category/" + el.name}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default SubCategoriesPage;

export async function getServerSideProps(context) {
    let superCats = [];
    let cats = [];

    await axios({
        url: "/cats",
    }).then((response) => {
        let data = response.data;

        for (let i = 0; i < data.length; i++) {
            if (data[i].superCatId == null) superCats.push(data[i]);
        }
    });

    if (context.query.name && context.query.name != "all") {
        let superCat = await axios({
            url: "/cats/" + context.query.name,
        }).then((response) => response.data);

        let categories = await axios({
            url: "/cats/superCat/" + superCat.id,
        }).then((response) => (cats = response.data));
    }

    return {
        props: { cats, superCats, catName: context.query.name },
    };
}
