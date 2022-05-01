import type { NextPage } from "next";
import cookies from "next-cookies";
import { useEffect, useState } from "react";
import SellerLayout from "../../../components/layouts/SelletLayout";
import axios from "axios";

const ChangePage: NextPage = ({product, jwt}) => {
    const [responseMessage, setResponseMessage] = useState('')
    const [imageSrc, setImageSrc] = useState('')
    const [catName, setCatName] = useState('')

    const addCategory = async () => {
        if (!jwt) return;
        if (catName.length == 0) return;

        await axios({
            url: `/products/${product.id}/add/category`,
            method: "POST",
            data: {
                categoryName: catName
            },
            headers: {
                'Authorization': 'Bearer ' + jwt
            }
        })
            .then(response => setResponseMessage('Категория добавлена'))
            .catch((e) => {
                let errors = e.response.data
                if (typeof errors == 'object') errors = errors.join(' ')
                setResponseMessage(errors)
            })
    }

    const addImage = async () => {
        if (!jwt) return;
        if (imageSrc.length == 0) return;

        await axios({
            url: `/products/${product.id}/add/image`,
            method: "POST",
            data: {
                source: imageSrc
            },
            headers: {
                'Authorization': 'Bearer ' + jwt
            }
        })
            .then(response => setResponseMessage('Изображение добавлено'))
            .catch((e) => {
                let errors = e.response.data
                if (typeof errors == 'object') errors = errors.join(' ')
                setResponseMessage(errors)
            })
    }

    return (
        <SellerLayout>
            <h1>Панель управления товаром</h1>
            <div className="product-change">
                <div className="product-change-line">
                    <strong>Название</strong>
                    <p>{product.title}</p>
                </div>
                <div className="product-change-line">
                    <strong>ID</strong>
                    <p>{product.id}</p>
                </div>

                <div className="product-change-line">
                    <strong>Описание</strong>
                    <p>{product.description}</p>
                </div>
                <div className="product-change-line">
                    <strong>Цена на данный момент (включая скидку)</strong>
                    <p>{product.price}</p>
                </div>
                <div className="product-change-line">
                    <strong>Старая цена (0 - если нет)</strong>
                    <p>{product.oldprice}</p>
                </div>
            </div>

            <h3>Изображения: </h3>
            <p>{product.images.map(el => <p>{el.source}</p>)}</p>

            <h3>Категории: </h3>
            <p>{product.cats.map(el => <p>{el.name}</p>)}</p>


            <h1>Панель управления</h1>

            <p>Добавить картинку (введите ссылку)</p>
            <input type="text" value={imageSrc} onChange={e => setImageSrc(e.target.value)}/>
            <button className='add-button' onClick={addImage}>Добавить</button>

            <p>Добавить категорию (введите точное название категории)</p>
            <input type="text" value={catName} onChange={e => setCatName(e.target.value)}/>
            <button className='add-button' onClick={addCategory}>Добавить</button>

            <p className="response-message">{responseMessage}</p>
        </SellerLayout>
    );
};

export default ChangePage;

export async function getServerSideProps(context) {
    let { jwt } = cookies(context)
    let productId = context.query.id
    let owner = false

    let product = await axios({
        url: '/products/' + productId
    })
        .then(response => response.data)
        .catch(() => {})

    return {
        props: {product, jwt},
    };
}
