import { Box, Button, Typography, CircularProgress, Slider } from '@mui/material';
import React, { useRef, useState } from 'react';
import axios from 'axios';

const Centerbar = () => {
  const fileInputRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [compressedImage, setCompressedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [compressionLevel, setCompressionLevel] = useState(50);
  const [responseHeaders, setResponseHeaders] = useState(null);


  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
    setCompressedImage(null); // Reset compressed image when a new image is selected
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleCompressionLevelChange = (event, newValue) => {
    setCompressionLevel(newValue);
  };

  const handleCompressAndDownload = async () => {
    if (selectedImage) {
      if (compressedImage) {
      
        handleDownload();
      } else {

        setIsLoading(true);
        const formData = new FormData();
        formData.append('image', selectedImage);
        formData.append('compressionLevel', compressionLevel);

        try {
          const response = await axios.post('https://image-compressor.azure-api.net/compressor-image/api/compress', formData, {
            responseType: 'arraybuffer',
          });
        
          setResponseHeaders(response.headers);
          console.log(response.headers)
          const blob = new Blob([response.data], { type: selectedImage.type });
          const imageUrl = URL.createObjectURL(blob);
          setCompressedImage(imageUrl);
        } catch (error) {
          console.error('Error compressing image:', error);
        } finally {
          setIsLoading(false);
        }
        
      }
    }
  };

  const handleDownload = () => {
    if (compressedImage && selectedImage) {
      const originalFilename = selectedImage.name.split('.').slice(0, -1).join('.');
      const extension = selectedImage.name.split('.').pop();
      const link = document.createElement('a');
      link.href = compressedImage;
      link.download = `${originalFilename}_compressed.${extension}`;
      link.click();
    }
  };

  return (
    <Box sx={{ width: "100%", height: "calc(100vh - 64px)", paddingTop: "64px" }}>
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "20px", paddingTop: 5 }}>
        <Typography variant='h2' sx={{ fontFamily: "'Roboto', sans-serif", fontWeight: 700, color: "#2c3e50" }}>
          Image Compressor
        </Typography>
        <Typography variant='subtitle1' sx={{ fontFamily: "'Roboto', sans-serif", color: "#34495e", textAlign: "center", maxWidth: "600px" }}>
          Compress your images with ease. Reduce file size while maintaining quality. Supports various formats including JPG, PNG, WEBP, and more.
        </Typography>
        <Box sx={{display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", mt: 4, width: "300px"}}>
          <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={handleImageChange} accept="image/*" />
          <Button 
            onClick={handleButtonClick}
            sx={{ 
              height: "60px", 
              width: "100%", 
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
            <Box sx={{display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"column", mt: 3, width: "100%"}}>
              <img src={URL.createObjectURL(selectedImage)} alt="Selected" style={{ maxWidth: '100%', maxHeight: '200px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }} />
           
              <Button 
                onClick={handleCompressAndDownload} 
                sx={{
                  mt: 3,
                  bgcolor: "#3498db",
                  mb: 3,
                  width: "100%",
                  '&:hover': {
                    bgcolor: "#2980b9"
                  }
                }} 
                variant="contained" 
                disabled={isLoading}
              >
                {isLoading ? <CircularProgress size={24} color="inherit" /> : 
                  (compressedImage ? "Download Compressed Image" : "Compress Image")}
              </Button>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Centerbar;