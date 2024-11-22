import React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { useDispatch, useSelector } from 'react-redux';
import { Button, ButtonGroup, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { decreaseQuantity, increaseQuantity } from '../../slices/products-2/ProductSlice';

const CartList = (props) => {
  const { open, toggleDrawer } = props;
  const { items } = useSelector((state) => state.product); // Updated Redux selector
  const dispatch = useDispatch()

  return (
    <Drawer open={open} onClose={toggleDrawer(false)}>
      <Box className="justify-content-between" sx={{ width: 400, padding: 2 }} role="presentation">
        {items?.map((item) => {
          return (
            <Box
              key={item.id}
              sx={{
                display: 'flex',
                alignItems: 'center',
                mb: 2, // Adds space between items
                borderBottom: '1px solid #e0e0e0', // Optional: separator line
                pb: 1, // Padding bottom for better spacing
              }}
            >
              <img
                width="70px"
                src={item?.image}
                alt={item?.title}
                style={{ borderRadius: '8px' }} // Rounded corners for the image
              />
              <Box sx={{ ml: 2 }}>
                <Typography
                  variant="body1"
                  sx={{ fontWeight: 'bold' }}
                >
                  {item?.title?.length >= 22
                    ? `${item.title?.slice(0, 18)}...` // Properly add the ellipsis here
                    : item.title}
                </Typography>
                <ButtonGroup size='small' variant='text' aria-label='Basic button group'>
                  <Button>
                    <RemoveIcon onClick={()=> dispatch(decreaseQuantity(item))} />
                  </Button>
                  <Button>
                    {item?.quantity}
                  </Button>
                  <Button>
                    <AddIcon onClick={()=> dispatch(increaseQuantity(item))} />
                  </Button>
                </ButtonGroup>
                <Typography
                  variant="body2"
                  sx={{ color: 'gray' }}
                >
                  ${item?.price}
                </Typography>
              </Box>
            </Box>
          );
        })}
      </Box>
    </Drawer>
  );
};

export default CartList;
