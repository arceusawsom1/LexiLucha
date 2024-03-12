import { Dispatch, SetStateAction } from "react";
import { IBearer } from "../types";
import { useNavigate } from "react-router-dom";

interface IProps {
    me: [IBearer, Dispatch<SetStateAction<IBearer>>]
}
const LogoutPage = (props:IProps) => {
    const [_me, setMe]  = props.me;
    const nav = useNavigate();
    localStorage.removeItem("me")
    setMe({bearer:""})
    nav("/")
    return(
        <>
            <h1>Logging out...</h1>
        </>
    )
}
export default LogoutPage;