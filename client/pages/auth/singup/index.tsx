import type {NextPage} from "next";
import cookies from "next-cookies";
import Head from "next/head";
import Link from "next/link";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import AlertHeader from "../../../components/AlertHeader";

const SingupPage: NextPage = ({authed}) => {
    const router = useRouter()
    const [email, setEmail] = useState('')

    useEffect(() => {
        if (authed) router.push('/me')
    }, [authed])

    const nextButton = () => {
        if (email.length < 1) return;
        router.push({
            pathname: '/auth/singup/[email]',
            query: {email}
        })
    }

    return (
        <div>
            <Head>
                <title>ProstoMarket - Регистрация</title>
                <body className='dbody'/>
            </Head>

            <AlertHeader/>

            <div className="auth-login-page">
                <div className="auth-form">
                    <h3>Создание Prosto ID</h3>
                    <input type="email" className="auth-input" placeholder='Email' value={email}
                           onChange={e => setEmail(e.target.value)}/>
                    <Link href='/auth/forgot'>
                        <a className='auth-a'>Не помню</a>
                    </Link>
                    <button className="auth-button" onClick={nextButton}>Далее</button>
                    <Link href='/auth/login'>
                        <button className="auth-button auth-button-gray">Уже есть аккаунт</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SingupPage;

export async function getServerSideProps(context) {
    const {jwt} = cookies(context);
    let authed = false;

    if (jwt) authed = true;

    return {
        props: {authed},
    };
}
