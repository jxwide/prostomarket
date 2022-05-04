import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import store from "../store/index";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:5000/"

function MyApp({ Component, pageProps }: AppProps) {


    return (
        <Provider store={store}>
            <Component {...pageProps} />
        </Provider>
    );
}

export default MyApp;
