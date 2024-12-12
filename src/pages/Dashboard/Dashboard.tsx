import { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';

import { RootState } from '../../store';

import Header from '../Dashboard/Header/Header';
import PostHistory from '../Dashboard/PostHistory/PostHistory';
import PostAddition from "../Dashboard/PostAddition/PostAddition";
import { Fragment } from "react";

import Box from '@mui/material/Box';
import AppStyles from './AppStyles';
import { getTweets } from '../../api'; 
import { Tweet } from "../../types/types";

import { useDispatch } from 'react-redux';

import { setShouldFetchTweets } from '../../store/user/'; 

function Dashboard() {
  const styles = AppStyles();
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => {
      return state.user.user;
  });
  
  const shouldFetchTweets = useSelector((state: RootState) => {
    return state.user.shouldFetchTweets;
  });
  
  const [tweets, setTweets] = useState<Tweet[]>([]);

    useEffect(() => {
      const fetchTweets = async () => {
        const { data } = await getTweets();
        
        setTweets(data);
      };

      if (shouldFetchTweets) {
        fetchTweets();
        // setFetchTweets(false);
        dispatch(setShouldFetchTweets(false));
      }
    }, [user, shouldFetchTweets]);

  return (
    <Box className="App" sx={styles.appWrapper}>
      <Header user={user} />
      <Fragment>
        <PostAddition newTweetId={String(tweets.length + 1)} user={user} />
        <PostHistory tweets={tweets} />
      </Fragment>
    </Box>
  );
     
    
};


export default Dashboard;