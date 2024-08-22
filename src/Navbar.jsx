import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import myLogo from './assets/logo.jpg';
import LanguageIcon from '@mui/icons-material/Language';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import ListItemIcon from '@mui/material/ListItemIcon';
import HomeIcon from '@mui/icons-material/Home';


export default function ButtonAppBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleReload = () => {
    window.location.reload();
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ bgcolor: "#FFFFFF", color: "black" }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            aria-controls="menu"
            aria-haspopup="true"
            onClick={handleClick}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              Home
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <LanguageIcon />
              </ListItemIcon>
              Language
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <ContactSupportIcon />
              </ListItemIcon>
              Help
            </MenuItem>
          </Menu>
          <img src={myLogo} style={{ height: "40px" }} alt="logo" onClick={handleReload} />
          <div onClick={handleReload}>
            <Typography variant="h6" component="div" sx={{ fontWeight: "bold", fontSize: "18px", color: "Black", cursor: "pointer" }}>
              Image compressor
            </Typography>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
