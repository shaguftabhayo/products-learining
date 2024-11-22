import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignIn from './components/auth/sign-in/SignIn.jsx';
import SignUp from './components/auth/sign-up/SignUp.jsx';
import ErrorPage from './components/ErrorPage/ErrorPage.jsx';
import ProductDetails from './components/product-details/ProductDetails.jsx';
import MainLayout from './components/layout/MainLayout.jsx';
import { Provider } from 'react-redux';
import { store } from './components/store.js';
import 'react-toastify/dist/ReactToastify.css';


const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children:[
      {
        path:"",
        element:<App/>
      },
      {
        path:"product-details/:product_id",
        element:<ProductDetails/>
      },
    ],
    errorElement: <ErrorPage />, // You need to specify this at the route level.
  },
  
  {
    path: "/sign-in",
    element: <SignIn />,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<Provider store={store}>
<RouterProvider router={router} />
</Provider>
);