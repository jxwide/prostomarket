import React, {useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import {newAlert} from "../store/alertSlice";
import axios from "axios";
import {getCookie} from "cookies-next";
import {useRouter} from "next/router";

interface UserInfoProps {
    user: object
}

const UserInfo: React.FC<UserInfoProps> = ({user}) => {
    const [name, setName] = useState(user.name || 'Не указано')
    const [city, setCity] = useState(user.city || 'Не указано')
    const [address, setAddress] = useState(user.address || 'Не указано')
    const dispatch = useDispatch()
    let router = useRouter()
    const jwt = getCookie('jwt')
    useEffect(() => {
        if (!jwt) router.push('/me')

        axios({
            url: '/users/info',
            headers: {
                'Authorization': 'Bearer ' + jwt
            }
        })
            .then((response) => {
                let data = response.data
                setName(data.name)
                setCity(data.city)
                setAddress(data.address)
            })
            .catch(e => router.push('/me'))
    }, [jwt])

    const changeInfo = async () => {
        let newData = await axios({
            url: '/users/update/info',
            method: 'POST',
            data: {name, city, address},
            headers: {
                'Authorization': 'Bearer ' + jwt
            }
        })
            .then(response => response.data)
            .catch((e) => {
                let error = e.response
                if (typeof error == 'object') {
                    dispatch(newAlert({text: '' + error.message}))
                } else dispatch(newAlert({text: 'Ошибка!'}))
            })

        if (newData) {
            setName(newData.name)
            setCity(newData.city)
            setAddress(newData.address)
            dispatch(newAlert({text: 'Успех!'}))
        }
    }

    return (
        <div className="user-info-block margin-top">
            <div className="user-info">
                <strong>Имя: </strong>
                <input type="text" className='inv-input' value={name} onChange={e => setName(e.target.value)}/>
            </div>
            <div className="user-info">
                <strong>Город: </strong>
                <input type="text" className='inv-input' value={city} onChange={e => setCity(e.target.value)}/>
            </div>
            <div className="user-info">
                <strong>Адрес: </strong>
                <input type="text" className='inv-input' value={address} onChange={e => setAddress(e.target.value)}/>
            </div>

            <button className='small-button margin-top' onClick={changeInfo}>Сохранить</button>
        </div>
    );
};

export default UserInfo;