import { useSelector, useDispatch } from 'react-redux';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ThumbUp from '@mui/icons-material/ThumbUp';
import ThumbDown from '@mui/icons-material/ThumbDown';

import { Tweet } from '../../../types/types';
import { RootState } from '../../../store';

import { updateRating } from '../../../api/index';

import { setShouldFetchTweets } from '../../../store/user/';
import PostRatingStyles from './PostRatingStyles';

function PostRating({ post }: { post: Tweet }) {
  const dispatch = useDispatch();
  const styles = PostRatingStyles();

  const currentUser = useSelector((state: RootState) => state.user.user);

  const rating = post.rating.up.length - post.rating.down.length;

  const changeRank = async (operation: 'up' | 'down') => {
    const postRatUp = post.rating.up;
    const postRatDown = post.rating.down;
    const rating = { up: [...postRatUp], down: [...postRatDown] };

    const user = currentUser.id || '';

    const hasUserVoted = [...postRatUp, ...postRatDown].includes(user);

    if (hasUserVoted) {
      rating.up = post.rating.up.filter((voter) => voter !== user);
      rating.down = post.rating.down.filter((voter) => voter !== user);
    } else {
      rating[operation].push(user);
    }

    await updateRating({ ...post, rating });

    dispatch(setShouldFetchTweets(true));
  };

  const getColor = (rating: number) => ({ color: rating >= 0 ? 'green' : 'red', width: '20px' });

  return (
    <Box sx={styles.wrapper}>
      <Typography variant="body1" sx={getColor(rating)}>
        {rating}
      </Typography>
      <ThumbUp onClick={() => changeRank('up')} />
      <ThumbDown onClick={() => changeRank('down')} />
    </Box>
  );
}

export default PostRating;
