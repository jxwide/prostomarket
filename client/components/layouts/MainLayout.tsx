import Header from "../Header";
import Banner from "../Banner";
import HeaderForSellers from "../HeaderForSellers";
import {useSelector} from "react-redux";
import {useEffect} from "react";
import AlertHeader from "../AlertHeader";

export default function MainLayout({children, seller}: any) {
    return (
        <div className='main-layout'>
            <AlertHeader/>
            {seller ? null : <Banner/>}
            {seller ? <HeaderForSellers/> : <Header/>}

            <main>{children}</main>

        </div>
    );
}