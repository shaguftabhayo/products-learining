import { Box, Button, CircularProgress, Grid, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { styled } from '@mui/system';
import { BadgeOutlined, Star, StarBorder } from '@mui/icons-material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ShareIcon from '@mui/icons-material/Share';

// Styled components for enhanced design
const ProductImage = styled('img')({
  width: '100%',
  borderRadius: '8px',
  transition: 'all 0.3s ease',
  '&:hover': {
    boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.2)', // Hover shadow effect
    transform: 'scale(1.05)',
  },
});

const ProductDetails = () => {
  const [productList, setProductList] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const param = useParams();

  // Fetch product data from API
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://fakestoreapi.com/products/${param?.product_id}`);
      setProductList(response.data);
      if (response.status === 200) {
        setLoading(false);
      }
    } catch (err) {
      console.error("Error fetching products:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      {isLoading ? (
        <Box display="flex" className="text-center" height="">
          <CircularProgress color="inherit" />
        </Box>
      ) : (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="" // Centers content vertically
          p={3}
        >
          <Box p={3} width="100%" maxWidth="1400px">
            <Grid container spacing={24} className="">
              {/* Image Section */}
              <Grid item xs={12} sm={6} md={5}>
                <Box display="flex" justifyContent="center" p={2}>
                  <ProductImage

                    src={productList?.image}
                    alt={productList?.title}
                  />
                </Box>
              </Grid>

              {/* Text Section */}
              <Grid item xs={12} sm={6} md={7}>
                <Box
                  p={{ xs: 0, sm: 3, md: 4 }} // Remove padding on mobile (xs) and apply padding on larger screens
                  sx={{ borderRadius: '8px', width: '100%' }} // Ensures the Box fills available space
                >
                  {/* Product Title */}
                  <Typography
                    variant="h4"
                    gutterBottom
                    sx={{color:"#1976d2", fontWeight: 'bold', fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' } }}
                  >
                    {productList?.title}
                  </Typography>

                  {/* Product Category */}
                  <Typography
                    variant="body1"
                    color="textSecondary"
                    sx={{
                      marginBottom: 2,
                      fontWeight: 'bold',
                      fontSize: { xs: '1rem', sm: '1.1rem' },
                      padding: '6px 12px',
                      backgroundColor: '#f1f1f1',
                      borderRadius: '20px',
                      display: 'inline-block',
                      boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.1)',
                      color: 'primary.main',
                      textTransform: 'capitalize',
                    }}
                  >
                    {productList?.category}
                  </Typography>

                  {/* Product Description */}
                  <Box
                    sx={{
                      backgroundColor: '#f9f9f9',
                      padding: '16px',
                      borderRadius: '8px',
                      boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                      marginBottom: 2,
                    }}
                  >
                    <Typography
                      variant="body1"
                      color="textSecondary"
                      sx={{
                        fontSize: { xs: '0.9rem', sm: '1rem' },
                        lineHeight: 1.6,
                        color: 'text.primary',
                      }}
                    >
                      {productList?.description}
                    </Typography>
                  </Box>

                  {/* Product Price */}
                  <Box
                    sx={{
                      display: 'inline-block',
                      backgroundColor: 'primary.main',
                      color: '#fff',
                      padding: '12px 20px',
                      borderRadius: '12px',
                      boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.15)',
                      marginBottom: 3,
                      textAlign: 'center',
                    }}
                  >
                    <Typography variant="h4" sx={{ fontWeight: 'bold', fontSize: { xs: '1.2rem', sm: '1.5rem' } }}>
                      Rs: ${productList?.price}
                    </Typography>
                  </Box>

                  {/* Product Rating */}
                  <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
                    <Typography variant="body1" color="textSecondary" sx={{ fontWeight: 'bold', marginRight: 1 }}>
                      Rating:
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', marginRight: 1 }}>
                      {[...Array(5)].map((_, index) =>
                        index < Math.floor(productList?.rating?.rate || 0) ? (
                          <Star key={index} sx={{ color: 'gold' }} />
                        ) : (
                          <StarBorder key={index} sx={{ color: 'gold' }} />
                        )
                      )}
                    </Box>
                    <Typography variant="body1" color="textSecondary">
                      {productList?.rating?.rate} ({productList?.rating?.count} reviews)
                    </Typography>
                  </Box>

                  {/* Product ID */}
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      background: 'linear-gradient(135deg, #f0f0f0, #dcdcdc)',
                      color: 'text.primary',
                      padding: '6px 14px',
                      borderRadius: '20px',
                      border: '1px solid #bdbdbd',
                      boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.1)',
                      fontSize: '0.9rem',
                      fontWeight: 'bold',
                      marginBottom: 2,
                    }}
                  >
                    <BadgeOutlined sx={{ fontSize: '1rem', marginRight: 1, color: 'primary.main' }} />
                    <Typography variant="body2">{productList?.id}</Typography>
                  </Box>
                  <Box className="gap-4 d-flex">
                      <Button variant='outlined'>
                        <FavoriteBorderIcon />
                      </Button> 
                      
                      <Button variant='outlined'>
                        <AddShoppingCartIcon/>
                      </Button>
                      <Button variant='outlined'>
                        <ShareIcon/>
                      </Button>
                    </Box>
                </Box>
                </Grid>
            </Grid>
          </Box>
        </Box>
      )}
    </>

  );
};

export default ProductDetails;
