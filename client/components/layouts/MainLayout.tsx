import Header from "../Header";
import Banner from "../Banner";

export default function MainLayout({ children }: any) {
    return (
        <>
            <Banner />
            <Header />
            <main>{children}</main>
        </>
    );
}
