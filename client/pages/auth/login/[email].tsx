import type {NextPage} from "next";
import cookies from "next-cookies";
import Head from "next/head";
import Link from "next/link";
import axios from "axios";
import AlertHeader from "../../../components/AlertHeader";
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {newAlert} from "../../../store/alertSlice";
import {useRouter} from "next/router";
import {setCookies} from "cookies-next";

const LoginPage: NextPage = ({authed, email, username}) => {
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    const router = useRouter()
    useEffect(() => {
        if (authed) router.push('/me')
        if (username == null) {
            dispatch(newAlert({text: 'Аккаунт не найден'}))
            router.push('/auth/login')
        }
    }, [username, authed])

    const enterButton = async () => {
        await axios({
            url: "/users/auth/login",
            method: "POST",
            data: {email, password},
        })
            .then((response) => {
                setCookies("jwt", response.data, {maxAge: 60 * 60 * 24});
                dispatch(newAlert({text: 'Вы успешно авторизовались'}))
                router.push("/me");
            })
            .catch((e) => {
                let errors = e.response.data;
                let errorsArray = []
                let errorMessage = ''
                if (errors.length != undefined) {
                    for (let i = 0; i < errors.length; i++) {
                        errorsArray.push(...errors[i])
                    }
                    errorMessage = errorsArray[0]
                } else errorMessage = errors.message

                dispatch(newAlert({text: errorMessage}))
            });

        setPassword('')
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
                    <h3 className='auth-form-h'>С возращением, {username}</h3>
                    <input type="password" className="auth-input" placeholder='Пароль' value={password}
                           onChange={e => setPassword(e.target.value)}/>
                    <Link href='/auth/forgot'>
                        <a className='auth-a'>Не помню</a>
                    </Link>
                    <button className="auth-button" onClick={enterButton}>Войти</button>
                    <Link href='/auth/login'>
                        <button className="auth-button auth-button-gray">Назад</button>
                    </Link>

                </div>
            </div>
        </div>
    );
};

export default LoginPage;

export async function getServerSideProps(context) {
    const {jwt} = cookies(context);
    const {email} = context.query
    let authed = false;
    if (jwt) authed = true;

    let username = await axios({
        url: '/users/name/' + email
    })
        .then(response => response.data)
        .catch(() => null)

    return {
        props: {authed, email, username},
    };
}
