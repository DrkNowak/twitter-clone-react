import { Fragment, ReactNode } from "react";



import Box from '@mui/material/Box';

import Header from '../Dashboard/Header/Header';
import PostHistory from '../Dashboard/PostHistory/PostHistory';
import LoginScreen from '../LoginScreen/LoginScreen';
import SignUpScreen from '../LoginScreen/SignUpScreen';
import Dashboard from "../Dashboard/Dashboard";
import PostAddition from "../Dashboard/PostAddition/PostAddition";

import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import { RootState } from '../../store';
import { getTweets } from '../../api'; 
import { Tweet } from "../../types/types";

import AppStyles from './AppStyles';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

// const LoginScreen: ReactNode = LoginScreen();



function AppWrapper() {
  const styles = AppStyles;

  const user = useSelector((state: RootState) => {
      return state.user.user;
    });
  
    const [tweets, setTweets] = useState<Tweet[]>([]);

    useEffect(() => {
      const fetchTweets = async () => {
        const { data } = await getTweets();
        setTweets(data);
      };
  
      fetchTweets();
    }, [user]);
  
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
      <Box className="App" sx={styles.appWrapper}>
        <RouterProvider router={router} />
      </Box>
        {/* {user.id && <Header user={user} />}
        
          {!user.id ?
            <LoginScreen />
            :
            <Fragment>
              <PostAddition newTweetId={String(tweets.length + 1)} user={ user } />
              <PostHistory tweets={tweets} />
            </Fragment>
          }
     */}
    </Fragment>
    );
  }
  
  export default AppWrapper;