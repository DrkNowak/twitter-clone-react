import { Fragment } from "react";




import LoginScreen from '../LoginScreen/LoginScreen';
import SignUpScreen from '../LoginScreen/SignUpScreen';
import Dashboard from "../Dashboard/Dashboard";


import { useSelector } from 'react-redux';

import { RootState } from '../../store';



import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

// const LoginScreen: ReactNode = LoginScreen();



function AppWrapper() {
  const user = useSelector((state: RootState) => {
      return state.user.user;
  });
  
  const router = createBrowserRouter([
    {
      path: "/",
      element: user.id ? <><Dashboard/></> : <><LoginScreen/></>,
    },
    {
      path: "/logIn",
      element: <><LoginScreen/></>,
    },
    {
      path: "/signUp",
      element: <><SignUpScreen/></>,
    },
  ]);

  return (
    <Fragment>
        <RouterProvider router={router} />
    </Fragment>
    );
  }
  
  export default AppWrapper;