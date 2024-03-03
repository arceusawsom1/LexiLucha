import { AppBar, Box, Button, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemText, Modal, SxProps, Theme, Toolbar, Typography } from "@mui/material"
import { Dispatch, ReactNode, SetStateAction, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IBearer } from "../types";
type MenuItem = {
    label:string,
    destination:string,
}

const navItems : Array<MenuItem> = [
    {
        label:"Home",
        destination:"/",        
    },
    {
        label:"About me",
        destination:"/aboutMe",        
    },
    {
        label:"Dashboard",
        destination:"/dashboard",        
    },
    {
        label:"All Games",
        destination:"/allgames",        
    },];

type IModalProps = {
    callback?:()=>void,
    open: [boolean,  Dispatch<SetStateAction<boolean>>]
}
const MyModal = (props:IModalProps) => {
    const { callback } = props;
    const [open, setOpen] = props.open;
    const handleClose = () => setOpen(false);
    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };
    const handleClick = () => {
        setOpen(false)
        if (callback)
            callback()
    }
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Are you sure?
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Do you want to leave the game you are in (You will not be able to get back)
                </Typography>
                <Button onClick={handleClick}>Yes</Button>
                <Button onClick={handleClose}>No</Button>
            </Box>
        </Modal>
    );
}
type IButtonProps = {
    locked: [boolean, Dispatch<SetStateAction<boolean>>],
    to?:string,
    variant?:"text"|"outlined"|"contained",
    onClick?: ()=>void,
    children?:ReactNode,
    sx?: SxProps<Theme> | undefined
}
const LockableButton = (props : IButtonProps) => {  
    const {to, variant, onClick, children, sx} = props
    const [locked, setLocked] = props.locked
    const navigate = useNavigate();
    const [open, setOpen] = useState(false)
    const callback = () => {
        setLocked(false)
        if (to!=undefined)
            navigate(to)
        if (onClick!=undefined)
            onClick()
    }
    const handle = () => {
        if (!locked){
            callback()
        } else
            setOpen(true)
    }
    return(
        <>
            <MyModal open={[open, setOpen]} callback={callback} />
            <Button sx={sx} variant={variant || "text"} onClick={handle}>{children || "Text goes here!"}</Button>
        </>
    )
}
interface IProps {
    me: [IBearer, Dispatch<SetStateAction<IBearer>>],
    inGame: [boolean, Dispatch<SetStateAction<boolean>>],
}
const TopNav = (props:IProps) => { 
    const [me, setMe] = props.me
    const [inGame, setIngame] = props.inGame

    const logout = () => {
        localStorage.removeItem("me")
        setMe({bearer:""})
    }
    const [mobileOpen, setMobileOpen] = useState(false)
    const drawerWidth = 240;

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ my: 2 }}>
                LexiLucha
            </Typography>
            <Divider />
            <List>
                {navItems.map((item : MenuItem) => 
                <ListItem key={item.label} disablePadding>
                    <ListItemButton sx={{ textAlign: 'center' }}>
                    <ListItemText primary={item.label} />
                    </ListItemButton>
                </ListItem>
                )}
            </List>
        </Box>
    );

    return(
        <>
        {/* <CssBaseline /> */}
        <AppBar component="nav">
            <Toolbar>
            <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            {/* <MenuIcon /> */}
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            LexiLucha
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {navItems.map((item) => (
              <LockableButton locked={[inGame, setIngame]} key={item.label} sx={{ color: '#fff' }} to={item.destination}>
                {item.label}
              </LockableButton>
            ))}
            {me.bearer.length==0 ? 
                <> 
                    {/* Not Logged in */}
                    <LockableButton locked={[inGame, setIngame]} to="login" sx={{ color: '#fff' }}>Login</LockableButton>
                    <LockableButton locked={[inGame, setIngame]} to="register" sx={{ color: '#fff' }}>Register</LockableButton>
                </>
            :
                <> 
                    {/* Logged in */}
                    <LockableButton locked={[inGame, setIngame]} to="customise" sx={{ color: '#fff' }}>Customise</LockableButton>
                    <LockableButton locked={[inGame, setIngame]} sx={{ color: '#fff' }} to="shop">Shop</LockableButton>
                    <LockableButton locked={[inGame, setIngame]} sx={{ color: '#fff' }} to="customise">Customise Card</LockableButton>
                    <LockableButton locked={[inGame, setIngame]} onClick={logout} sx={{ color: '#fff' }}>Logout</LockableButton>                    
                </>
            }
          </Box>
        </Toolbar>
      </AppBar>
        <nav>
            <Drawer
                    // container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    >
                {drawer}
            </Drawer>
        </nav>
        </>
    )
}
export default TopNav