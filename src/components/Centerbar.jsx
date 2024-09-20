import React, { useRef, useState } from 'react';
import { Box, Button, Typography, CircularProgress, Slider, Paper, Grid } from '@mui/material';
import axios from 'axios';
import { CloudUpload as CloudUploadIcon, Compress as CompressIcon } from '@mui/icons-material';

export default function Centerbar() {
  const fileInputRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [compressedImage, setCompressedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [compressionLevel, setCompressionLevel] = useState(50);
  const [originalSize, setOriginalSize] = useState(0);
  const [compressedSize, setCompressedSize] = useState(0);

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setCompressedImage(null);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleCompressAndDownload = async () => {
    if (selectedImage) {
      if (compressedImage) {
        handleDownload();
      } else {
        setIsLoading(true);
        const formData = new FormData();
        formData.append('image', selectedImage);
        formData.append('compressionLevel', compressionLevel.toString());

        try {
          const response = await axios.post('https://image-compressor.azure-api.net/compressor-image/api/compress', formData, {
            responseType: 'arraybuffer',
          });

          const blob = new Blob([response.data], { type: selectedImage.type });
          const imageUrl = URL.createObjectURL(blob);
          setCompressedImage(imageUrl);

          setOriginalSize(selectedImage.size);
          setCompressedSize(blob.size);

          handleDownload(imageUrl, blob);
        } catch (error) {
          console.error('Error compressing image:', error);
        } finally {
          setIsLoading(false);
        }
      }
    }
  };

  const handleDownload = (imageUrl, blob) => {
    if (selectedImage) {
      const url = imageUrl || compressedImage;
      if (url) {
        const originalFilename = selectedImage.name.split('.').slice(0, -1).join('.');
        const extension = selectedImage.name.split('.').pop();
        const link = document.createElement('a');
        link.href = url;
        link.download = `${originalFilename}_compressed.${extension}`;
        link.click();
      }
    }
  };

  const formatSize = (size) => {
    return (size / 1024).toFixed(2);
  };

  const compressionPercentage = compressedSize ? ((originalSize - compressedSize) / originalSize * 100).toFixed(2) : 0;

  return (
    <Box sx={{ width: "100%", minHeight: "calc(100vh - 64px)", paddingTop: "64px", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Typography variant='h2' sx={{ fontFamily: "'Roboto', sans-serif", fontWeight: 700, color: "#2c3e50", mb: 2, textAlign: "center" }}>
        Image Compressor
      </Typography>
      <Typography variant='subtitle1' sx={{ fontFamily: "'Roboto', sans-serif", color: "#34495e", textAlign: "center", maxWidth: "600px", mb: 4 }}>
        Compress your images with ease. Reduce file size while maintaining quality. Supports various formats including JPG, PNG, WEBP, and more.
      </Typography>
      <Paper elevation={3} sx={{ p: 4, width: "100%", maxWidth: 600, borderRadius: 2 }}>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleImageChange}
          accept="image/*"
          aria-label="Upload image"
        />
        <Button
          onClick={handleButtonClick}
          startIcon={<CloudUploadIcon />}
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
        <Typography variant='body2' sx={{ mt: 1, color: "#7f8c8d", fontFamily: "'Roboto', sans-serif", textAlign: "center" }}>
          or drop image here
        </Typography>

        {selectedImage && (
          <Box sx={{ mt: 3, width: "100%" }}>
            <img src={URL.createObjectURL(selectedImage)} alt="Selected" style={{ width: '100%', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }} />

  
            <Button
              onClick={handleCompressAndDownload}
              startIcon={isLoading ? <CircularProgress size={24} color="inherit" /> : <CompressIcon />}
              sx={{
                mt: 3,
                bgcolor: "#3498db",
                width: "100%",
                '&:hover': {
                  bgcolor: "#2980b9"
                }
              }}
              variant="contained"
              disabled={isLoading}
            >
              {isLoading ? "Compressing..." : "Compress Image"}
            </Button>

            {compressedImage && (
              <Paper elevation={0} sx={{ mt: 3, p: 2, borderRadius: 2, bgcolor: "#f8f9fa" }}>
                <Typography variant='h6' sx={{ mb: 2, color: "#2c3e50", fontFamily: "'Roboto', sans-serif" }}>
                  Compression Results
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography variant='body2' sx={{ color: "#7f8c8d", fontFamily: "'Roboto', sans-serif" }}>
                      Original Size:
                    </Typography>
                    <Typography variant='h6' sx={{ color: "#2c3e50", fontFamily: "'Roboto', sans-serif" }}>
                      {formatSize(originalSize)} KB
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant='body2' sx={{ color: "#7f8c8d", fontFamily: "'Roboto', sans-serif" }}>
                      Compressed Size:
                    </Typography>
                    <Typography variant='h6' sx={{ color: "#2c3e50", fontFamily: "'Roboto', sans-serif" }}>
                      {formatSize(compressedSize)} KB
                    </Typography>
                  </Grid>
                </Grid>
                <Typography variant='body1' sx={{ mt: 2, color: "#27ae60", fontFamily: "'Roboto', sans-serif", fontWeight: 500 }}>
                  Size reduced by {compressionPercentage}%
                </Typography>
              </Paper>
            )}
          </Box>
        )}
      </Paper>
    </Box>
  );
}