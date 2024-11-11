import React from 'react';
import ErrorImg from '../../assets/error.jpg';

const ErrorPage = () => {
    return (
        <div 
            className='d-flex justify-content-center align-items-center' 
            style={{ height: '100vh' }} // Ensures full viewport height
        >
            <div className='text-center'>
                <h1>Something Went Wrong...</h1>
                <img 
                    src={ErrorImg} 
                    alt="Error" 
                    style={{ maxHeight: '400px', width: 'auto' }}
                />
            </div>
        </div>
    );
};

export default ErrorPage;
