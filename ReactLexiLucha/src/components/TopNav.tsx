import { AppBar, Box, Button, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemText, Modal, SxProps, Theme, Toolbar, Typography } from "@mui/material"
import { Dispatch, ReactNode, SetStateAction, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IBearer } from "../types";
import MenuIcon from '@mui/icons-material/Menu';
type MenuItem = {
    label:string,
    destination:string,
    mode:"loggedIn"|"loggedOut"|"always",
}
type Menu = Array<MenuItem>
const navItems : Menu = [
    {
        label:"Home",
        destination:"/",
        mode:"always",
    },
    {
        label:"About me",
        destination:"/aboutMe",
        mode:"always",
    },
    {
        label:"Dashboard",
        destination:"/dashboard",
        mode:"loggedIn",
    },
    {
        label:"All Games",
        destination:"/allgames",
        mode:"loggedIn",
    },
    {
        label:"Login",
        destination:"/login",
        mode:"loggedOut",
    },
    {
        label:"Register",
        destination:"/register",
        mode:"loggedOut",
    },
    {
        label:"Shop",
        destination:"/shop",
        mode:"loggedIn",
    },
    {
        label:"Customise",
        destination:"/customise",
        mode:"loggedIn",
    },
    {
        label:"Logout",
        destination:"/logout",
        mode:"loggedIn",
    },
];

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
    sx?: SxProps<Theme> | undefined,
    isMobile:boolean,
}
const LockableButton = (props : IButtonProps) => {  
    const {to, variant, onClick, children, sx, isMobile} = props
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
            {!isMobile ? 
                <Button sx={sx} variant={variant || "text"} onClick={handle}>{children || "Text goes here!"}</Button>
            :
                <ListItem disablePadding>
                    <ListItemButton onClick={handle} sx={{ textAlign: 'center' }}>
                        <ListItemText primary={children} />
                    </ListItemButton>
                </ListItem>
            }
        </>
    )
}
interface IProps {
    me: [IBearer, Dispatch<SetStateAction<IBearer>>],
    inGame: [boolean, Dispatch<SetStateAction<boolean>>],
    isMobile: boolean,
}
const TopNav = (props:IProps) => { 
    const [me, _setMe] = props.me
    const [inGame, setIngame] = props.inGame
    const { isMobile } = props

    
    const [mobileOpen, setMobileOpen] = useState(false)
    const drawerWidth = 240;

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };
    const shouldShow = (item:MenuItem):boolean => {
        if (item.mode==="always"){
            return true
        }
        if (item.mode==="loggedIn"){
            return me.bearer.length!==0
        }
        if (item.mode==="loggedOut"){
            return me.bearer.length===0
        }
        return false;
    }
    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ my: 2 }}>
                LexiLucha
            </Typography>
            <Divider />
            <List>
                {navItems.map((item : MenuItem) =>
                    shouldShow(item) &&
                    <LockableButton isMobile={isMobile} locked={[inGame, setIngame]} key={item.label} sx={{ color: '#000' }} to={item.destination}>
                        {item.label}
                    </LockableButton>
                        
                )}
            </List>
        </Box>
    );
    
    return(
        <>
        {/* <CssBaseline /> */}
        <AppBar component="nav">
            <Toolbar>
            {isMobile && <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>}
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >LexiLucha
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {navItems.map((item) => (
                shouldShow(item) && 
                    <LockableButton isMobile={isMobile} locked={[inGame, setIngame]} key={item.label} sx={{ color: '#fff' }} to={item.destination}>
                        {item.label}
                    </LockableButton>
            ))}
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