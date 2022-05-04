import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {newAlert} from "../store/alertSlice";

const AlertHeader = () => {
    let alertId = useSelector(state => state.alert.id)
    let alertText = useSelector(state => state.alert.alertText)
    let alertType = useSelector(state => state.alert.alertType)
    let dispatch = useDispatch()

    useEffect(() => {
        try {
            let aleftel = document.querySelector('.alert')
            if (alertText.length == '') {
                aleftel.className = 'alert no-alert'
            } else {
                aleftel.style.opacity = '1'
                aleftel.innerHTML = alertText
                aleftel.className = 'alert'

                let timeout = setTimeout(() => {
                    aleftel.innerHTML = '1'
                    aleftel.style.opacity = '0'
                    clearTimeout(timeout)
                    dispatch(newAlert({text: ''}))
                }, 5000)
                // let timer = setInterval(() => {
                //     if (+aleftel.style.opacity > 0) {
                //         aleftel.style.opacity = (+aleftel.style.opacity - 0.01) + ''
                //     } else {
                //         aleftel.innerHTML = ''
                //         clearInterval(timer)
                //     }
                // }, 30)
            }
        } catch (e) {
            console.log(e)
        }
    }, [alertId])

    return (
        <div className="alert-header">
            <div className="alert"></div>
        </div>
    );
};

export default AlertHeader;