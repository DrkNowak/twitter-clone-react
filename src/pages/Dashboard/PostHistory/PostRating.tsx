import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ThumbUp from '@mui/icons-material/ThumbUp';
import ThumbDown from '@mui/icons-material/ThumbDown';

import { Tweet } from '../../../types/types';

import useChangeRank from './useChangeRank';

import PostRatingStyles from './PostRatingStyles';

type PostRatingProps = { post: Tweet };

function PostRating({ post }: PostRatingProps) {
  const styles = PostRatingStyles();

  const { changeRank, rating } = useChangeRank(post);

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
