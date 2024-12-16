import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import AppStyles from '../Dashboard/AppStyles';

import { RootState } from '../../store';
import PostHistory from '../Dashboard/PostHistory/PostHistory';

function UserProfile() {
  const styles = AppStyles();

  const user = useSelector((state: RootState) => {
    return state.user.user;
  });

  const tweets = useSelector((state: RootState) => {
    const allTweets = state.user.tweets;

    return allTweets.filter(({ author_id }) => author_id === user.id);
  });

  return (
    <Box sx={styles.appWrapper}>
      <PostHistory tweets={tweets} />
    </Box>
    );
  }
  
  export default UserProfile;