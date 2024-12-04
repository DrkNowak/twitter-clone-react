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

function Dashboard() {
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