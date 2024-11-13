import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';



const CartList = (props)=> {
    const { open, toggleDrawer } = props;
    const [cartItems, setCartItems] = useState();
    console.log(cartItems);
    

    useEffect(()=> {
      const cartItemsArr = localStorage.getItem("cartList");
      setCartItems(cartItemsArr);
      
    },[]); 

    return (
        <div>

            <Drawer open={open} onClose={toggleDrawer(false)}>
                <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>

                </Box>
            </Drawer>
        </div>
    );
}

export default CartList