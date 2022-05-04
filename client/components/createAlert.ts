import alertSlice, {newAlert} from "../store/alertSlice";
import {useDispatch, useSelector} from "react-redux";

export default function (text: string) {

    const dispatch = useDispatch()

    return dispatch(newAlert({text}))
}