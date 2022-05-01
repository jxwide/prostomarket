import Header from "../Header";
import Banner from "../Banner";
import axios from "axios";
import HeaderForSellers from "../HeaderForSellers";

export default function MainLayout({ children, seller }: any) {
    axios.defaults.baseURL = "http://localhost:5000/";

    return (
        <>
            {seller ? null : <Banner />}
            {seller ? <HeaderForSellers/> : <Header/>}
            <main>{children}</main>
        </>
    );
}