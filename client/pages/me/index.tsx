import type { NextPage } from "next";
import MainLayout from "../../components/layouts/MainLayout";
import cookies from "next-cookies";
import { useRouter } from "next/router";
import { useEffect } from "react";
import jwt_decode from "jwt-decode";
import { removeCookies } from "cookies-next";

const MePage: NextPage = ({ authed, user }) => {
    let router = useRouter();

    useEffect(() => {
        if (!authed) router.push("/me/singup");
    }, [authed]);

    return (
        <MainLayout>
            <div className="page">
                <h1>Аккаунт</h1>
                <h2>{user.email}</h2>
                <a href="" onClick={() => removeCookies("jwt")}>
                    Выйти
                </a>
            </div>
        </MainLayout>
    );
};

export default MePage;

export async function getServerSideProps(context) {
    const { jwt } = cookies(context);
    let authed = false;
    let user = {};

    if (jwt) {
        authed = true;
        user = jwt_decode(jwt);
    }

    return {
        props: { authed, user },
    };
}
