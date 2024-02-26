import { Link, useSearchParams } from "react-router-dom";

const SocketErrorPage = () => {
    const [searchParams] = useSearchParams()
    return(
        <>
            <p>Something went wrong connecting to the socket server (is the server down?)</p>
            <p>{searchParams.get("err")}</p>
            <Link to="/">Try again?</Link>
        </>
    )
}
export default SocketErrorPage;