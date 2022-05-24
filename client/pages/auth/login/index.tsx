import type {NextPage} from "next";
import cookies from "next-cookies";
import Head from "next/head";
import Link from "next/link";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import AlertHeader from "../../../components/AlertHeader";

const LoginPage: NextPage = ({authed}) => {
    const router = useRouter()
    const [email, setEmail] = useState('')

    useEffect(() => {
        if (authed) router.push('/me')
    }, [authed])

    const nextButton = () => {
        if (email.length < 1) return;
        router.push({
            pathname: '/auth/login/[email]',
            query: {email}
        })
    }

    return (
        <div>
            <Head>
                <title>ProstoMarket - Авторизация</title>
                <body className='dbody'/>
            </Head>

            <AlertHeader/>

            <div className="auth-login-page">
                <div className="auth-form">
                    <h3>Войдите с Prosto ID</h3>
                    <input type="email" className="auth-input" placeholder='Email' value={email}
                           onChange={e => setEmail(e.target.value)}/>
                    <Link href='/auth/forgot'>
                        <a className='auth-a'>Не помню</a>
                    </Link>
                    <button className="auth-button" onClick={nextButton}>Войти</button>
                    <Link href='/auth/singup'>
                        <button className="auth-button auth-button-gray">Создать ID</button>
                    </Link>

                </div>
            </div>
        </div>
    );
};

export default LoginPage;

export async function getServerSideProps(context: any) {
    const {jwt} = cookies(context);
    let authed = false;

    if (jwt) authed = true;

    return {
        props: {authed},
    };
}
