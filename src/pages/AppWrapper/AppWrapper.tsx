import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';

import LoginScreen from '../LoginScreen/LoginScreen';
import SignUpScreen from '../LoginScreen/SignUpScreen';
import Dashboard from "../Dashboard/Dashboard";

import { RootState } from '../../store';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

function AppWrapper() {
  const user = useSelector((state: RootState) => {
    return state.user.user;
  });
  
  const router = createBrowserRouter([
    {
      path: "/",
      element: user.id ? <><Dashboard /></> : <><LoginScreen /></>,
    },
    {
      path: "/logIn",
      element: <><LoginScreen /></>,
    },
    {
      path: "/signUp",
      element: <><SignUpScreen /></>,
    },
  ]);

  return (
    <Box sx={{
     display: 'flex', justifyContent: 'center', marginTop: '20px'
    }}>
        <RouterProvider router={router} />
    </Box>
    );
  }
  
  export default AppWrapper;