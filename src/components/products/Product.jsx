import { Box, Card, Divider, Grid, Snackbar, SnackbarContent, TextField, Tooltip, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import './product.css';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CloseIcon from '@mui/icons-material/Close';
import VisibilityIcon from '@mui/icons-material/Visibility';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Autocomplete from '@mui/material/Autocomplete';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../slices/add-cart/addCartSlices';

const Products = () => {
  const [cartList, setCartList] = useState([]);
  const [openAlert, setOpenAlert] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const [productList, setProductList] = useState([]); // Renamed from `products` to `productList`
  const [isLoading, setLoading] = useState(false); // Fixed state naming issue here
  const [error, setError] = useState(""); // For error handling
  const navigate = useNavigate();
  const [categoryOption, setCategoryOption] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState({});

  const dispatch = useDispatch()

  console.log(isLoading, "isLoading");

  // Check cart persistence from localStorage on initial load
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cartList"));
    if (storedCart) {
      setCartList(storedCart);
    }
  }, []);

  // Fetch product data from API
const fetchProducts = async () => {
  try {
    setLoading(true);
    const productsData = await axios.get("https://fakestoreapi.com/products");

    if (productsData.status === 200) {
      setLoading(false);
      setProductList(productsData?.data);
      setAllProducts(productsData?.data);

      const filterCategories = productsData?.data.map((product) => {
        return {
          label: product?.category?.toUpperCase(),
          value: product?.category,        
        };
      });

      const uniqueCategories = filterCategories.filter(
        (item,index,self)=>
          index === self.findIndex((t) => t.value === item.value)
      );

      setCategoryOption(uniqueCategories);

    } else {
      setLoading(true);
    }
  } catch (err) {
    console.log(err);
  }
};

  // Call fetchProducts once when the component mounts
  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    // Filter products based on the selected category
    let filterProducts = allProducts?.filter((product) => product?.category === categoryFilter?.value);
  
    setProductList(filterProducts);
    console.log(filterProducts, "filterProducts"); // Log the current categoryFilter value
  }, [categoryFilter]); // Add the dependency here
  

  // Handle adding products to cart
  const cartHandler = (product) => {
    const isExist = cartList.find((cart) => cart.id === product.id);
    if (!isExist) {
      setCartList((prev) => [...prev, product]);

      let strCartList = JSON.stringify([...cartList, product]);
      localStorage.setItem("cartList", strCartList);
    } else {
      setOpenAlert(true);
    }
  };

  // Handle close for the Snackbar alert
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenAlert(false);
  };

  // Handle search filter
  const searchHandler = (event) => {
    const query = event?.target?.value.toLowerCase();
    if (query) {
      const filteredProducts = productList.filter((product) =>
        product.title.toLowerCase().includes(query)
      );
      setProductList(filteredProducts);
    } else {
      // Re-fetch original products when search is cleared
      fetchProducts();
    }
  };

  return (
    <>
      <Box className="container mt-3 d-flex justify-content-between">
        <TextField
          onChange={searchHandler}
          size="small"
          placeholder="Search items..."
        />


<Autocomplete
       size="small"
      disablePortal
      options={categoryOption}
      sx={{ width: 250 }}
      onChange={(e, newValue) => {
        setCategoryFilter(newValue);
        
      }}
      renderInput={(params) => <TextField {...params} label="Categories" />}
    />
      </Box>

      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={openAlert}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <SnackbarContent
          style={{
            backgroundColor: '#bb2124',
          }}
          message={
            <Box>
              <span id="client-snackbar">Product is already in cart</span>
              <CloseIcon onClick={handleClose} />
            </Box>
          }
        />
      </Snackbar>

      {error && (
        <Box sx={{ color: 'red', textAlign: 'center', mt: 2 }}>
          <Typography variant="h6">{error}</Typography>
        </Box>
      )}

      <Grid container className="container mt-3 mb-2" justifyContent="center" alignItems="stretch">
        {isLoading ? (
          <Typography variant="h6" sx={{ textAlign: 'center', width: '100%' }}>
            Loading products...
          </Typography>
        ) : (
          productList.map((product, index) => (
            <Grid className='' item xs={12} md={3} key={index} sx={{ mb: 5 }}>
              <Card sx={{ padding: "20px", cursor: "pointer", display: "flex", flexDirection: "column", width: "280px", justifyContent: "space-between" }}>
                <Box>
                  <Box className="text-center">
                    <img style={{ maxHeight: "100px", minHeight: "140px" }} className='dish-img' width={110} src={product.image} alt={product.title} />
                  </Box>

                  {/* Tooltip for Title */}
                  <Tooltip title={product?.title} placement="top">
                    <Typography variant="h6" sx={{ mt: 1, mb: 1, textAlign: "center" }}>
                      {product?.title?.length >= 22
                        ? `${product.title?.slice(0, 18)}...` // Properly add the ellipsis here
                        : product.title}
                    </Typography>
                  </Tooltip>

                  <Divider sx={{ borderColor: "#333", marginBottom: "10px" }} />
                </Box>

                {/* Box for Icons */}
                <Box className="d-flex justify-content-between" sx={{ alignItems: "center" }}>
  <Tooltip title="Product Details">
    <VisibilityIcon
      onClick={() => {
        navigate(`/product-details/${product?.id}`);
      }}
      sx={{ fontSize: 25, color: '#1976d2' }} // Apply the color here
    />
  </Tooltip>
  <Tooltip title="Add to Favorite">
    <FavoriteIcon sx={{ fontSize: 25, color: '#1976d2' }} /> {/* Apply the color here */}
  </Tooltip>
  <Tooltip title="Add to Cart">
    <ShoppingCartIcon onClick={()=>dispatch(addToCart())} 
      
      sx={{ fontSize: 25, color: '#1976d2' }} // Apply the color here
    />
  </Tooltip>
</Box>

              </Card>
            </Grid>
          ))
        )}
      
      </Grid>
    </>
  );
};

export default Products;






// onClick={() => {
//   cartHandler(product);
    
//   }}


// import { Box, Card, Divider, Snackbar, SnackbarContent, Typography } from '@mui/material'
// import React, { useEffect, useState } from 'react'
// import './product.css'
// import ShareIcon from '@mui/icons-material/Share';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
// import CloseIcon from '@mui/icons-material/Close';
// import axios from 'axios';


// const Products = ({ products }) => {
//   const [cartList, setCartList] = useState([]);
//   const [openAlert, setOpenAlert] = useState(false);
//   const [products, setProducts] = useState([]);

//   console.log(products, 'products');
  

//   const cartHandler = (product) => {
//     const isExist = cartList.find((cart) => cart.id === product.id);
//     if (!isExist) {
//       setCartList((prev) => [...prev, product]);

//       let strCartList = JSON.stringify([...cartList, product]);
//       localStorage.setItem("cartList", strCartList);
//     } else {
//       setOpenAlert(true);
//     }
//   };

//   const handleClose = (event, reason) => {
//     if (reason === 'clickaway') {
//       return;
//     }
//     setOpenAlert(false);
//   };

//   useEffect(()=> {
//     const fetchProducts = async ()=>{
//       try {
//         const products = await axios.get("https://fakestoreapi.com/products");
       
//         setProducts(products?.data)
//       } catch (err) {
//         console.log(err);
        
//       }  
//     };
//     fetchProducts();
//   }, []);

//   return (
//     <>
//       <Snackbar
//         anchorOrigin={{ vertical: "top", horizontal: "right" }}
//         open={openAlert}
//         autoHideDuration={6000}
//         onClose={handleClose}
//       >
//         <SnackbarContent
//           style={{
//             backgroundColor: '#bb2124',
//           }}
//           message={
//             <Box>
//               <span id="client-snackbar">Product is already in cart</span>
//               <CloseIcon onClick={handleClose} />
//             </Box>
//           }
//         />
//       </Snackbar>

//       <Box sx={{ display: "flex", gap: "40px" }} className="container mt-3">
//         {products?.map((product, index) => (
//           <Card key={index} sx={{ padding: "30px", cursor: "pointer", width: "250px" }}>
//             <Box>
//               <Box className="text-center">
//                 <img className='dish-img' width={110} src={product.img} alt={`${product.name}`} />
//               </Box>
//               <Typography variant="h5" className='mt-3'>{product.name}</Typography>
//               <Divider sx={{ borderColor: "#333" }} />
//               <Box className="d-flex justify-content-between mt-3">
//                 <ShareIcon />
//                 <FavoriteIcon />
//                 <ShoppingCartIcon onClick={() => { cartHandler(product); }} />
//               </Box>
//             </Box>
//           </Card>
//         ))}
//       </Box>
//     </>
//   );
// };

// export default Products;
