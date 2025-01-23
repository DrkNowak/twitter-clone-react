import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Box from '@mui/material/Box';

import AppStyles from './AppStyles';
import { getTweets } from '../../api';
import Header from '../Dashboard/Header/Header';
import PostHistory from '../Dashboard/PostHistory/PostHistory';
import PostAddition from '../Dashboard/PostAddition/PostAddition';
import { setShouldFetchTweets, setStoreTweets } from '../../store/user/';

import { RootState } from '../../store';

function Dashboard() {
  const styles = AppStyles();
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.user.user);
  const shouldFetchTweets = useSelector((state: RootState) => state.user.shouldFetchTweets);
  const tweets = useSelector((state: RootState) => state.user.tweets);

  useEffect(() => {
    const fetchTweets = async () => {
      const { data } = await getTweets();

      dispatch(setStoreTweets(data));
    };

    if (shouldFetchTweets) {
      fetchTweets();
      dispatch(setShouldFetchTweets(false));
    }
  }, [user, shouldFetchTweets]);

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
