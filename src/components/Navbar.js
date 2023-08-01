import { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import { useMediaQuery } from '@mui/material';
import { useSelector } from 'react-redux'
import { useLogout } from '../hooks/useLogout';

const pages = ['Sessions', 'Fighters', 'About'];

export default function Navbar({ user }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate()

  const isAuth = useSelector(state => state.auth.isAuthenticated)

  const open = Boolean(anchorEl);

  const { logout } = useLogout()

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const pathname = useLocation().pathname

  const isDesktop = useMediaQuery('(min-width:600px)')

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: '#d20a0a' }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={handleClick}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            {pages.map((page) => (
              <MenuItem key={page} component={NavLink} to={`/${page.toLowerCase()}`} onClick={handleClose} selected={pathname === `/${page.toLowerCase()}`}>
                {page}
              </MenuItem>
            ))}
          </Menu>
          <Typography
            onClick={() => navigate('/')}
            style={{ cursor: 'pointer' }}
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          >
            UFC Wiki
          </Typography>
          {!isAuth && (
            <>
              <Button onClick={() => navigate('/login')} color="inherit">
                Log in
              </Button>
              <Button onClick={() => navigate('/signup')} color="inherit">
                Sign up
              </Button>
            </>
          )}
          {user && isDesktop && (
            <Typography
              variant="body1"
              color="inherit"
            >
              hello, {user.displayName}
            </Typography>
          )}
          {isAuth && (
            <Button color="inherit" onClick={logout}>Log out</Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
