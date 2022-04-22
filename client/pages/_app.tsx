import "../styles/globals.css";
import type { AppProps } from "next/app";
import axios from "axios";
import { Provider } from "react-redux";
import store from "../store/index";

function MyApp({ Component, pageProps }: AppProps) {
    axios.defaults.baseURL = "http://localhost:5000/";

    return (
        <Provider store={store}>
            <Component {...pageProps} />
        </Provider>
    );
}

export default MyApp;
