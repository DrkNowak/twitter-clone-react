import { memo } from 'react';
import { useSelector } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

import Post from './Post';
import { Tweet } from '../../../types/types';
import { RootState } from '../../../store';
import { Typography } from '@mui/material';

function PostHistory({ tweets }: { tweets: Tweet[] }) {
  const { isLoading, error } = useSelector((state: RootState) => state.user);

  const bluredStyle = {
    filter: 'grayscale(100%)',
    opacity: '0.5',
    transition: 'filter 0.3s, opacity 0.3s',
  };

  return (
    <>
      {error && <Typography variant="body1">Fetching tweets has failed</Typography>}
      {isLoading && <CircularProgress sx={{ position: 'fixed', top: '0', left: '0' }} />}
      <Box sx={{ ...(isLoading && bluredStyle) }}>
        {tweets.map((tweet: Tweet) => <Post post={tweet} key={tweet.id} />).reverse()}
      </Box>
    </>
  );
}

export default memo(PostHistory);
