import type {NextPage} from "next";
import MainLayout from "../../components/layouts/MainLayout";
import cookies from "next-cookies";
import Link from "next/link";
import {useEffect, useState} from "react";
import axios from "axios";
import {setCookies} from "cookies-next";
import {useRouter} from "next/router";
import {newAlert} from "../../store/alertSlice";
import {useDispatch} from "react-redux";

const LoginPage: NextPage = ({authed}) => {

    // redirect to new auth page
    let router = useRouter();
    useEffect(() => {
        router.push('/auth/login')
    })

    let [email, setEmail] = useState("");
    let [pass, setPass] = useState("");
    let [errorMsg, setErrorMsg] = useState("");
    let dispatch = useDispatch()

    let nextButton = async () => {
        let payload = {
            email,
            password: pass,
        };

        await axios({
            url: "/users/auth/login",
            method: "POST",
            data: payload,
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

        setEmail("");
        setPass("");
    };

    return (
        <MainLayout>
            <div className="page auth-page">
                <h1>Авторизация</h1>

                <div className="form">
                    <p className="auth-p">Email</p>
                    <input
                        type="text"
                        className="normal-input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <p className="auth-p">Пароль</p>
                    <input
                        type="password"
                        className="normal-input"
                        value={pass}
                        onChange={(e) => setPass(e.target.value)}
                    />

                    <p className="error-msg">{errorMsg}</p>

                    <div className="auth-buttons">
                        <button className="auth-button" onClick={nextButton}>
                            Далее
                        </button>
                        <Link href="/me/singup">Нет аккаунта?</Link>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default LoginPage;

export async function getServerSideProps(context) {
    const {jwt} = cookies(context);
    let authed = false;

    if (jwt) authed = true;

    return {
        props: {authed},
    };
}
