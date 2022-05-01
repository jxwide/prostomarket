import type { NextPage } from "next";
import SellerLayout from "../../components/layouts/SelletLayout";
import cookies from "next-cookies";
import axios from "axios";
import { useEffect } from "react";
import Link from "next/link";

const SellerPage: NextPage = ({userProducts}) => {
    useEffect(() => console.log(userProducts), [])

    return (
        <SellerLayout>
            <h1>Мои товары: </h1>
            <div className="my-products-list">
                <div className="table">
                    <div className='tr'>
                        <p className='td td-up'>id</p>
                        <p className='td td-up'>title</p>
                        <p className='td td-up'>description</p>
                        <p className='td td-up'>price</p>
                        <p className='td td-up'>old price</p>
                        <p className='td td-up'>addedAt</p>
                    </div>
                    {
                        userProducts.map(el =>
                            <div key={el.key} className='tr'>
                                <span className='td'>{el.id}</span>
                                <span className='td'>{el.title}</span>
                                <span className='td'>{el.description}</span>
                                <span className='td'>{el.price}</span>
                                <span className='td'>{el.oldprice}</span>
                                <span className='td'>{el.createdAt}</span>
                                <span className='td'>
                                    <Link href={"/seller/change/" + el.id}>Изменить</Link>
                                </span>
                            </div>
                        )
                    }
                </div>
            </div>
        </SellerLayout>
    );
};

export default SellerPage;

export async function getServerSideProps(context) {
    let { jwt } = cookies(context)

    let products = await axios({
        url: '/users/products',
        headers: {
            'Authorization': 'Bearer ' + jwt
        }
    })
        .then(response => response.data)
        .catch(() => [])

    return {
        props: { userProducts: products },
    };
}
