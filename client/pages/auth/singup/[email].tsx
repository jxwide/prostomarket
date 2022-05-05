import type {NextPage} from "next";
import cookies from "next-cookies";
import Head from "next/head";
import Link from "next/link";
import AlertHeader from "../../../components/AlertHeader";
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {useRouter} from "next/router";
import axios from "axios";
import {newAlert} from "../../../store/alertSlice";
import {setCookies} from "cookies-next";

const SingupPage: NextPage = ({authed, email, busyemail}) => {
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    const dispatch = useDispatch()
    const router = useRouter()

    useEffect(() => {
        if (authed) router.push('/me')
        if (busyemail) {
            dispatch(newAlert({text: 'Аккаунт с таким email уже существует'}))
            router.push('/auth/singup')
        }
    }, [busyemail])

    const enterButton = async () => {
        if (password != password2 || password.length == 0 || name.length == 0) return dispatch(newAlert({text: 'Проверьте введенные данные'}))

        await axios({
            url: "/users/auth/singup",
            method: "POST",
            data: {email, password, name},
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
        setPassword2('')
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
                    <h3 className='auth-form-h'>Создание Prosto ID</h3>
                    <input type="text" className="auth-input" placeholder='Имя' value={name}
                           onChange={e => setName(e.target.value)}/>
                    <input type="password" className="auth-input" placeholder='Пароль' value={password}
                           onChange={e => setPassword(e.target.value)}/>
                    <input type="password" className="auth-input" placeholder='Повторите пароль' value={password2}
                           onChange={e => setPassword2(e.target.value)}/>
                    <button className="auth-button" onClick={enterButton}>Далее</button>
                    <Link href='/auth/singup'>
                        <button className="auth-button auth-button-gray">Назад</button>
                    </Link>

                </div>
            </div>
        </div>
    );
};

export default SingupPage;

export async function getServerSideProps(context) {
    const {jwt} = cookies(context);
    const {email} = context.query
    let authed = false;
    if (jwt) authed = true;
    let busyemail = false

    let username = await axios({
        url: '/users/name/' + email
    })
        .then(() => busyemail = true)
        .catch(() => busyemail = false)

    return {
        props: {authed, email, busyemail},
    };
}
