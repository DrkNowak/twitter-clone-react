import { Fragment } from "react";

import Box from '@mui/material/Box';

import Header from '../Header/Header';
import PostHistory from '../PostHistory/PostHistory';
import LoginScreen from '../LoginScreen/LoginScreen';
import PostAddition from "../PostAddition/PostAddition";

import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import { RootState } from '../../store';
import { getTweets } from '../../api'; 
import { Tweet } from "../../types/types";

import  AppStyles from './AppStyles';


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
    console.log(styles)

    return (
      <Fragment>
        {user.id && <Header user={user} />}
        <Box className="App" sx={styles.appWrapper}>
          {!user.id ?
            <LoginScreen />
            :
            <Fragment>
              <PostAddition newTweetId={String(tweets.length + 1)} user={ user } />
              <PostHistory tweets={tweets} />
            </Fragment>
          }
    </Box>
    </Fragment>
    );
  }
  
  export default AppWrapper;