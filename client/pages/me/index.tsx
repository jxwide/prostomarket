import type { NextPage } from "next";
import MainLayout from "../../components/layouts/MainLayout";
import cookies from "next-cookies";
import { useRouter } from "next/router";
import { useEffect } from "react";

const MePage: NextPage = ({ authed }) => {
    let router = useRouter();

    useEffect(() => {
        if (!authed) router.push("/me/singup");
    }, [authed]);

    return (
        <MainLayout>
            <div className="page">
                <h1>Аккаунт</h1>
            </div>
        </MainLayout>
    );
};

export default MePage;

export async function getServerSideProps(context) {
    const { jwt } = cookies(context);
    let authed = false;

    if (jwt) authed = true;

    return {
        props: { authed },
    };
}
