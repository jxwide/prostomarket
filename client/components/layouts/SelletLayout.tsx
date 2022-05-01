import MainLayout from "./MainLayout";
import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import jwt_decode from "jwt-decode";

export default function SellerLayout({ children }: any) {
    let jwt = getCookie('jwt')
    let router = useRouter()

    useEffect(() => {
        if (!jwt) router.push('/me')
        let user = jwt_decode(jwt)
        if (!user.seller) router.push('/me')
    }, [jwt])

    return (
        <MainLayout seller={true}>
            <div className="page">
                <main>{children}</main>
            </div>
        </MainLayout>
    );
}