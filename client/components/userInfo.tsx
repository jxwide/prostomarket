import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {newAlert} from "../store/alertSlice";

const UserInfo = ({user}) => {
    const [name, setName] = useState(user.name || 'Не указано')
    const [city, setCity] = useState(user.city || 'Не указано')
    const [address, setAddress] = useState(user.address || 'Не указано')
    const dispatch = useDispatch()

    const changeInfo = () => {
        dispatch(newAlert({text: 'Успех!'}))
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