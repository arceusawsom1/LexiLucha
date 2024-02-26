import { Box, Button, Container } from "@mui/material";
import { Link } from "react-router-dom";
import { IBearer } from "../types";
import { Dispatch, SetStateAction } from "react";
interface IProps {
    me: [IBearer, Dispatch<SetStateAction<IBearer>>]
}
const BotNav = (props: IProps) => {
    const [me, setMe] = props.me;
    const logout = () => {
        localStorage.removeItem("me")
        setMe({bearer:""})
    }
    return(
        <Container sx={{textAlign:"center",my:4}}>
            <Box sx={{my:1}}>
                <Button component={Link} variant="outlined" to="dashboard">Dashboard</Button>
            </Box>
            <Box sx={{my:1}}>
                <Button component={Link} variant="outlined" to="allgames">All Games</Button>
            </Box>
            <Box sx={{my:1}}>
                <a href="/">
                    <Button variant="outlined">Home</Button>
                </a>
            </Box>
            {me.bearer.length==0 ? 
                <> {/* Not Logged in */}
                    <Box sx={{my:1}}>
                        <Button component={Link} variant="contained" to="login">Log In</Button>
                    </Box>
                    <Box sx={{my:1}}>
                        <Button component={Link} variant="outlined" to="register">Register</Button>
                    </Box>
                </>
            :
                <> {/* Logged in */}
                    <Box sx={{my:1}}>
                        <Button component={Link} variant="contained" to="customise">Customise Card</Button>
                    </Box>
                    <Box sx={{my:1}}>
                        <Button onClick={logout} variant="outlined">Logout</Button>
                    </Box>
                    
                </>
            }

        </Container>
    )
}
export default BotNav;