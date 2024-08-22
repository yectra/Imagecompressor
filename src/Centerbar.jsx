import { Box, Button, Slider, Typography } from '@mui/material';
import React, { useRef, useState } from 'react';
import axios from 'axios';

const Centerbar = () => {
  const fileInputRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [quality, setQuality] = useState(10);
  const [compressedImage, setCompressedImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleUpload = async () => {
    if (selectedImage) {
      const formData = new FormData();
      formData.append('image', selectedImage);

      try {
        const response = await axios.post(`http://localhost:32770/compress?quality=${quality}`, formData, {
          responseType: 'arraybuffer', 
        });
        const blob = new Blob([response.data], { type: response.headers['content-type'] });
        
        const imageUrl = URL.createObjectURL(blob);
        setCompressedImage(imageUrl); 
      } catch (error) {
        console.error('Error compressing image:', error);
      }
    }
  };

  const handleDownload = () => {
    if (compressedImage && selectedImage) {
      const originalFilename = selectedImage.name;
  
      
      const link = document.createElement('a');
      link.href = compressedImage;
      link.download = originalFilename;
      link.click();
    }
  };

  const handleSliderChange = (event, newValue) => {
    setQuality(newValue);
  };

  return (
    <Box sx={{ width: "100%", height: "calc(100vh - 64px)", paddingTop: "64px" }}>
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "20px", paddingTop: 5 }}>
        <Typography variant='h2' sx={{ fontFamily: "'Lato', sans-serif", fontWeight: 600, color: "#33333b" }}>Compress IMAGE</Typography>
        <Box sx={{ display: "flex", flexDirection: "column", color: "#47474F" }}>
          <Typography variant='subtitle1' sx={{ fontWeight: "bold" }}>
            Compress{' '}
            <Typography variant='subtitle1' component='span' sx={{ fontWeight: "bold", color: '#4D90FE', textDecoration: 'underline' }}>JPG</Typography>
            {', '}
            <Typography variant='subtitle1' component='span' sx={{ fontWeight: "bold", color: '#4D90FE', textDecoration: 'underline' }}>PNG</Typography>
            {', '}
            <Typography variant='subtitle1' component='span' sx={{ fontWeight: "bold", color: '#4D90FE', textDecoration: 'underline' }}>SVG</Typography>
            {' or '}
            <Typography variant='subtitle1' component='span' sx={{ fontWeight: "bold", color: '#4D90FE', textDecoration: 'underline' }}>GIF</Typography>
            {' with the best quality and compression.'}
          </Typography>
          <Typography variant='subtitle1' sx={{ marginLeft: 13, marginBottom: 3, fontWeight: "bold" }}>Reduce the filesize of your images at once.</Typography>
        </Box>
        <Box   sx={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
          <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={handleImageChange} />
          <Button 
            onClick={handleButtonClick}
            sx={{ height: "80px", width: "300px", borderRadius: 3, bgcolor: "#4D90FE", fontFamily: "'Lato', sans-serif", fontSize: "20px", textTransform: 'capitalize',fontWeight:"bold"}} 
            variant="contained"
          >
            Select Images
          </Button>
          <Typography variant='body2' sx={{ fontWeight:"bold",color:"grey"}}>or drop images here</Typography>
          </Box>
          {selectedImage && (
            <Box sx={{display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column"}}>
              <img src={URL.createObjectURL(selectedImage)} alt="Selected" style={{ maxWidth: '50%', maxHeight: '50px', marginTop: '10px' }} />
              <Slider
                aria-label="Quality"
                defaultValue={quality} 
                value={quality}
                onChange={handleSliderChange} 
                valueLabelDisplay="auto"
                shiftStep={30}
                step={10}
                marks
                min={10}
                max={100}
                style={{ width: "300px" }}
              />
              <Button onClick={handleUpload} sx={{bgcolor: "#4D90FE"}} variant="contained" >Convert</Button>
              {compressedImage && (
                <Box sx={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",m:2,gap:2}}>
                  <img src={compressedImage} alt="Compressed" style={{ width:300, height: 350 }} />
                  <Button onClick={handleDownload} sx={{bgcolor: "#4D90FE"}} variant="contained" >Download</Button>
                </Box>
              )}
            </Box>
          )}
      
      </Box>
    </Box>
  );
};

export default Centerbar;
