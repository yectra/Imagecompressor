import { Box, Button, Typography, CircularProgress } from '@mui/material';
import React, { useRef, useState } from 'react';
import axios from 'axios';

const Centerbar = () => {
  const fileInputRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [convertedImage, setConvertedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
    setConvertedImage(null); // Reset converted image when a new image is selected
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleConvertAndDownload = async () => {
    if (selectedImage) {
      if (convertedImage) {
        // If image is already converted, download it
        handleDownload();
      } else {
        // If image is not converted, convert it first
        setIsLoading(true);
        const formData = new FormData();
        formData.append('image', selectedImage);

        try {
          const response = await axios.post('https://imageconversion.azure-api.net/image-conversion/api/imageconversion', formData, {
            responseType: 'arraybuffer',
          });
          const blob = new Blob([response.data], { type: 'image/jpeg' });
          const imageUrl = URL.createObjectURL(blob);
          setConvertedImage(imageUrl);
        } catch (error) {
          console.error('Error converting image:', error);
        } finally {
          setIsLoading(false);
        }
      }
    }
  };

  const handleDownload = () => {
    if (convertedImage && selectedImage) {
      const originalFilename = selectedImage.name.split('.').slice(0, -1).join('.');
      const link = document.createElement('a');
      link.href = convertedImage;
      link.download = `${originalFilename}.jpg`;
      link.click();
    }
  };

  return (
    <Box sx={{ width: "100%", height: "calc(100vh - 64px)", paddingTop: "64px" }}>
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "20px", paddingTop: 5 }}>
        <Typography variant='h2' sx={{ fontFamily: "'Roboto', sans-serif", fontWeight: 700, color: "#2c3e50" }}>
          Convert to JPG
        </Typography>
        <Typography variant='subtitle1' sx={{ fontFamily: "'Roboto', sans-serif", color: "#34495e", textAlign: "center", maxWidth: "600px" }}>
          Convert any image format to JPG with ease. Our tool supports various formats including PNG, WEBP, TIFF, BMP, and more.
        </Typography>
        <Box sx={{display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", mt: 4}}>
          <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={handleImageChange} accept="image/*" />
          <Button 
            onClick={handleButtonClick}
            sx={{ 
              height: "60px", 
              width: "250px", 
              borderRadius: 2, 
              bgcolor: "#3498db", 
              fontFamily: "'Roboto', sans-serif", 
              fontSize: "18px", 
              textTransform: 'none',
              fontWeight: "500",
              '&:hover': {
                bgcolor: "#2980b9"
              }
            }} 
            variant="contained"
          >
            Select Image
          </Button>
          <Typography variant='body2' sx={{ mt: 1, color: "#7f8c8d", fontFamily: "'Roboto', sans-serif" }}>
            or drop image here
          </Typography>
      
        {selectedImage && (
          <Box sx={{display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"column", mt: 3}}>
            <img src={URL.createObjectURL(selectedImage)} alt="Selected" style={{ maxWidth: '300px', maxHeight: '200px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }} />
            <Button 
              onClick={handleConvertAndDownload} 
              sx={{
                mt: 3,
                bgcolor: "#3498db",
                mb:3,
                '&:hover': {
                  bgcolor: "#2980b9"
                }
              }} 
              variant="contained" 
              disabled={isLoading}
            >
              {isLoading ? <CircularProgress size={24} color="inherit" /> : 
                (convertedImage ? "Download JPG" : "Convert to JPG")}
            </Button>
          </Box>
        )}
      </Box>
      </Box>
    </Box>
  );
};

export default Centerbar;