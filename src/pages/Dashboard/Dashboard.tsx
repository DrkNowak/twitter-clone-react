import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Box from '@mui/material/Box';

import AppStyles from './AppStyles';
import Header from '../Dashboard/Header/Header';
import PostHistory from '../Dashboard/PostHistory/PostHistory';
import PostAddition from '../Dashboard/PostAddition/PostAddition';

import { fetchTweets } from '../../store/user';
import { AppDispatch } from '../../store';

import { RootState } from '../../store';

function Dashboard() {
  const styles = AppStyles();
  const dispatch = useDispatch<AppDispatch>();

  const user = useSelector((state: RootState) => state.user.user);
  const tweets = useSelector((state: RootState) => state.user.tweets);

  useEffect(() => {
    dispatch(fetchTweets());
  }, [user]);

  return (
    <Box sx={styles.appWrapper}>
      <Header user={user} />
      <>
        <PostAddition newTweetId={String(tweets.length + 1)} user={user} />
        <PostHistory tweets={tweets} />
      </>
    </Box>
  );
}

export default Dashboard;
