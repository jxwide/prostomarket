import type {NextPage} from "next";
import cookies from "next-cookies";
import {useState} from "react";
import SellerLayout from "../../../components/layouts/SelletLayout";
import axios from "axios";
import Link from "next/link";
import {useRouter} from "next/router";
import {newAlert} from "../../../store/alertSlice";
import {useDispatch} from "react-redux";

const ChangePage: NextPage = ({product, jwt}) => {
    let router = useRouter()
    let dispatch = useDispatch()
    const [imageSrc, setImageSrc] = useState('')
    const [catName, setCatName] = useState('')
    const [newPrice, setNewPrice] = useState(product.price)

    const addCategory = async () => {
        if (!jwt) return;
        if (catName.length == 0) return;
        if (catName.length < 3) return dispatch(newAlert({text: 'Название должно быть не меньше 3 символов'}))

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
            .then(response => dispatch(newAlert({text: 'Категория добавлена'})))
            .catch((e) => {
                let errors = e.response.data;
                let errorsArray = []
                let errorMessage = ''

                if (errors.length == undefined) errorMessage = errors.message
                if (errors.length > 0 && typeof errors == 'object') {
                    for (let i = 0; i < errors.length; i++) {
                        errorsArray.push(...errors[i])
                    }
                    if (errorsArray[0].length) errorMessage = errorsArray[0]
                }
                if (errors.length > 0 && typeof errors == 'string') errorMessage = errors

                dispatch(newAlert({text: errorMessage}))
            })
    }

    const addImage = async () => {
        if (!jwt) return;
        if (imageSrc.length == 0) return;
        if (imageSrc.length < 3) return dispatch(newAlert({text: 'Ссылка должна быть не меньше 3 символов'}))

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
            .then(response => dispatch(newAlert({text: 'Изображение добавлено'})))
            .catch((e) => {
                let errors = e.response.data;
                let errorsArray = []
                let errorMessage = ''

                if (errors.length == undefined) errorMessage = errors.message
                if (errors.length > 0 && typeof errors == 'object') {
                    for (let i = 0; i < errors.length; i++) {
                        errorsArray.push(...errors[i])
                    }
                    if (errorsArray[0].length) errorMessage = errorsArray[0]
                }
                if (errors.length > 0 && typeof errors == 'string') errorMessage = errors

                dispatch(newAlert({text: errorMessage}))
            })
    }

    const addSale = async () => {
        if (!jwt) return;
        if (newPrice == product.price || newPrice < 1) return;

        await axios({
            url: `/products/${product.id}/add/sale`,
            method: "POST",
            data: {newPrice},
            headers: {
                'Authorization': 'Bearer ' + jwt
            }
        })
            .then((response) => {
                dispatch(newAlert({text: 'Скидка установлена'}))
                router.push(router.asPath)
            })
            .catch((e) => {
                let errors = e.response.data;
                let errorsArray = []
                let errorMessage = ''

                if (errors.length == undefined) errorMessage = errors.message
                if (errors.length > 0 && typeof errors == 'object') {
                    for (let i = 0; i < errors.length; i++) {
                        errorsArray.push(...errors[i])
                    }
                    if (errorsArray[0].length) errorMessage = errorsArray[0]
                }
                if (errors.length > 0 && typeof errors == 'string') errorMessage = errors

                dispatch(newAlert({text: errorMessage}))
            })
    }

    const removeSale = async () => {
        if (!jwt) return;
        if (product.oldprice == 0) return dispatch(newAlert({text: 'Скидка не установлена'}));

        await axios({
            url: `/products/${product.id}/remove/sale`,
            method: "POST",
            headers: {
                'Authorization': 'Bearer ' + jwt
            }
        })
            .then((response) => {
                dispatch(newAlert({text: 'Скидка удалена'}))
                router.push(router.asPath)
            })
            .catch((e) => {
                let errors = e.response.data;
                let errorsArray = []
                let errorMessage = ''

                if (errors.length == undefined) errorMessage = errors.message
                if (errors.length > 0 && typeof errors == 'object') {
                    for (let i = 0; i < errors.length; i++) {
                        errorsArray.push(...errors[i])
                    }
                    if (errorsArray[0].length) errorMessage = errorsArray[0]
                }
                if (errors.length > 0 && typeof errors == 'string') errorMessage = errors

                dispatch(newAlert({text: errorMessage}))
            })
    }

    return (
        <SellerLayout>
            <h1>Панель управления товаром</h1>
            <Link href={'/product/' + product.id}>link</Link>
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
            <div>{product.images.map(el => <a href={el.source} id={el.id}>{el.source}</a>)}</div>

            <h3>Категории: </h3>
            <div>{product.cats.map(el => <a href={"/category/" + el.name} id={el.id}>{el.name}</a>)}</div>


            <h1>Панель управления</h1>

            <h3>Добавить картинку (введите ссылку)</h3>
            <input className='simple-input' type="text" value={imageSrc} onChange={e => setImageSrc(e.target.value)}/>
            <button className='add-button' onClick={addImage}>Добавить</button>

            <h3>Добавить категорию (введите точное название категории)</h3>
            <input className='simple-input' type="text" value={catName} onChange={e => setCatName(e.target.value)}/>
            <button className='add-button' onClick={addCategory}>Добавить</button>

            <h3>Добавить скидку (введите новую цену в рублях)</h3>
            <input className='simple-input' type="number" value={newPrice}
                   onChange={e => setNewPrice(+e.target.value)}/>
            <button className='add-button' onClick={addSale}>Добавить</button>
            <button className='add-button' onClick={removeSale}>Убрать</button>

            <h3>Добавить хар-ку</h3>
            <input className='simple-input' placeholder='Название' type="text" onChange={e => (e.target.value)}/><br/>
            <input className='simple-input' placeholder='Значение' type="text" onChange={e => (e.target.value)}/>
            <button className='add-button' onClick={() => {
            }}>Добавить
            </button>
        </SellerLayout>
    );
};

export default ChangePage;

export async function getServerSideProps(context) {
    let {jwt} = cookies(context)
    let productId = context.query.id
    let owner = false

    let product = await axios({
        url: '/products/' + productId
    })
        .then(response => response.data)
        .catch(() => new Object())

    return {
        props: {product, jwt},
    };
}
