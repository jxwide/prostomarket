import type {NextPage} from "next";
import MainLayout from "../../components/layouts/MainLayout";
import cookies from "next-cookies";
import Link from "next/link";
import {useState} from "react";
import axios from "axios";
import {setCookies} from "cookies-next";
import {useRouter} from "next/router";
import {newAlert} from "../../store/alertSlice";
import {useDispatch} from "react-redux";

const SingupPage: NextPage = ({authed}) => {
    let [email, setEmail] = useState("");
    let [pass, setPass] = useState("");
    let [pass2, setPass2] = useState("");
    let [errorMsg, setErrorMsg] = useState("");
    let dispatch = useDispatch()
    let router = useRouter();

    let nextButton = async () => {
        let payload = {
            email,
            password: pass,
        };

        await axios({
            url: "/users/auth/singup",
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
        setPass2("")
    };

    return (
        <MainLayout>
            <div className="page auth-page">
                <h1>Регистрация</h1>

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

                    <p className="auth-p">Повторите пароль</p>
                    <input
                        type="password"
                        className="normal-input"
                        value={pass2}
                        onChange={(e) => setPass2(e.target.value)}
                    />

                    <p className="error-msg">{errorMsg}</p>

                    <div className="auth-buttons">
                        <button className="auth-button" onClick={nextButton}>
                            Далее
                        </button>
                        <Link href="/me/login">Есть аккаунт?</Link>
                    </div>
                </div>
            </div>
        </MainLayout>
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
