import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import myLogo from '../assets/logo.jpg';

import CompressIcon from '@mui/icons-material/Compress';

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