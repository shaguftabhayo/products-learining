import { Box, Grid, TextField, Typography, Button, InputAdornment, OutlinedInput, IconButton } from '@mui/material';
import React, { useState } from 'react';
import SigninImg from '../../../assets/SignIn.jpg';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const SignIn = () => {
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword((prev) => !prev);  // Toggle the password visibility
    };

    return (
        <div className="m-1">
            <Grid container>
                <Grid item xs={12} sm={12} md={6} sx={{ textAlign: 'center' }}>
                    <img className='img-fluid' src={SigninImg} alt="SignIn" style={{ width: '100%', height: 'auto' }} />
                </Grid>
                <Grid item xs={12} sm={12} md={6} className='mt-5' sx={{ display: 'flex', flexDirection: 'column', padding: '20px' }}>
                    <Typography variant="h4" sx={{ mb: 2 }}>
                        Get Started Shopping
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 3 }}>
                        Welcome to FresCart! Enter your email to get started.
                    </Typography>

                    <Grid container spacing={2}>
                        <Grid item md={6} xs={12}>
                            <TextField fullWidth placeholder="First Name" size="small" />
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <TextField fullWidth placeholder="Last Name" size="small" />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField type="email" fullWidth placeholder="Email" size="small" />
                        </Grid>
                        <Grid item xs={12}>
                        <OutlinedInput
                                fullWidth
                                size="small"
                                id="outlined-adornment-password"
                                type={showPassword ? 'text' : 'password'}  // Toggle between text and password
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            edge="end"
                                            onClick={handleClickShowPassword}
                                            aria-label="toggle password visibility"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                placeholder="Password"
                                inputProps={{
                                    'aria-label': 'password',
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant="contained" color="primary" fullWidth>
                                Register Now
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
};

export default SignIn;
