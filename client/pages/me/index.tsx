import type {NextPage} from "next";
import MainLayout from "../../components/layouts/MainLayout";
import cookies from "next-cookies";
import {useRouter} from "next/router";
import {useEffect} from "react";
import jwt_decode from "jwt-decode";
import {removeCookies} from "cookies-next";
import Link from "next/link";
import UserInfo from "../../components/userInfo";

const MePage: NextPage = ({authed, user}) => {
    let router = useRouter();

    useEffect(() => {
        if (!authed) router.push("/me/singup");

        console.log('us', user)
    }, [authed]);

    return (
        <MainLayout>
            <div className="page">
                <h1>Аккаунт</h1>
                <span className='info-span'><strong>{user.email}</strong>
                    {user.admin ?
                        <Link href='/admin'>
                            <div className="tag">Администратор</div>
                        </Link> : null}
                    {user.seller ?
                        <Link href='/seller'>
                            <div className="tag">Продавец</div>
                        </Link> : null}
                </span>
                <UserInfo user={user}/>
                <a href="" className='margin-top' onClick={() => removeCookies("jwt")}>
                    Выйти
                </a>
            </div>
        </MainLayout>
    );
};

export default MePage;

export async function getServerSideProps(context) {
    const {jwt} = cookies(context);
    let authed = false;
    let user = {};

    if (jwt) {
        authed = true;
        user = jwt_decode(jwt);
    }

    return {
        props: {authed, user},
    };
}
