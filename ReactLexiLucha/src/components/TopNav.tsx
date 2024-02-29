import { AppBar, Box, Button, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemText, Toolbar, Typography } from "@mui/material"
import { Dispatch, SetStateAction, useState } from "react";
import { Link } from "react-router-dom";
import { IBearer } from "../types";
type MenuItem = {
    label:string,
    destination:string,
}
interface IProps {
    me: [IBearer, Dispatch<SetStateAction<IBearer>>]
}
const navItems : Array<MenuItem> = [
    {
        label:"Home",
        destination:"/",        
    },
    {
        label:"Dashboard",
        destination:"/dashboard",        
    },
    {
        label:"All Games",
        destination:"/allgames",        
    },];

const TopNav = (props:IProps) => { 
    const [me, setMe] = props.me
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
                MUI
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
              <Button key={item.label} sx={{ color: '#fff' }} component={Link} to={item.destination}>
                {item.label}
              </Button>
            ))}
            {me.bearer.length==0 ? 
                <> 
                    {/* Not Logged in */}
                    <Button component={Link} sx={{ color: '#fff' }} to="login">Log In</Button>
                    <Button component={Link} sx={{ color: '#fff' }} to="register">Register</Button>
                </>
            :
                <> 
                    {/* Logged in */}
                    <Button component={Link} sx={{ color: '#fff' }} to="customise">Customise</Button>
                    <Button component={Link} sx={{ color: '#fff' }} to="shop">Shop</Button>
                    <Button component={Link} sx={{ color: '#fff' }} to="customise">Customise Card</Button>
                    <Button onClick={logout} sx={{ color: '#fff' }}>Logout</Button>                    
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