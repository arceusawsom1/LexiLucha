import { Route, Routes } from "react-router-dom"
import Shop from "../pages/Shop"
import { IBearer } from "../types"
import { Dispatch, SetStateAction } from "react"
interface IProps {
    me: [IBearer, Dispatch<SetStateAction<IBearer>>]
}
const ShopRouter = (props:IProps) => {
    return(
        <Routes>
            {props.me[0].bearer!="" && 
            <Route path="shop" element={<Shop apiPath="items" title="Full Shop" me={props.me}/>}>
                <Route path="textColor" element={<Shop apiPath="items/textColors" title="Text Color Shop" me={props.me}/>} />
                <Route path="borderColor" element={<Shop apiPath="items/borderColors" title="Border Color Shop" me={props.me}/>} />
                <Route path="backgroundColor" element={<Shop apiPath="items/backgroundColors" title="Background Color Shop" me={props.me}/>} />
                <Route path="backgroundImage" element={<Shop apiPath="items/backgroundImages" title="Background Image Shop" me={props.me}/>} />
            </Route>}
        </Routes>
    )
}
export default ShopRouter