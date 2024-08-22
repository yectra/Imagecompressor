import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import myLogo from '../assets/logo.jpg';
import ListItemIcon from '@mui/material/ListItemIcon';
import HomeIcon from '@mui/icons-material/Home';
import CompressIcon from '@mui/icons-material/Compress';
import SettingsIcon from '@mui/icons-material/Settings';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

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
      <AppBar position="fixed" sx={{ bgcolor: "#2c3e50", color: "white" }}>
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
                <CompressIcon />
              </ListItemIcon>
              Compress
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              Settings
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <HelpOutlineIcon />
              </ListItemIcon>
              Help
            </MenuItem>
          </Menu>
          <img src={myLogo} style={{ height: "40px", marginRight: "10px" }} alt="logo" onClick={handleReload} />
          <div onClick={handleReload} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
            <CompressIcon sx={{ marginRight: 1 }} />
            <Typography variant="h6" component="div" sx={{ fontWeight: "bold", fontSize: "20px" }}>
              Compress App
            </Typography>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}