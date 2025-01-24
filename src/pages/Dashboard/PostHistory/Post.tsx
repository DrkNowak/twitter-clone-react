import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import UserAvatar from '../../../components/UserAvatar/UserAvatar';
import PostRating from './PostRating';

import PostHistoryStyles from './PostHistoryStyles';

import { Tweet } from '../../../types/types';

function Post({ post }: { post: Tweet }) {
  const styles = PostHistoryStyles();

  return (
    <Box sx={styles.postWrapper} key={post.id}>
      <UserAvatar user={{ name: post.name, id: post.author_id }} />
      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="caption" sx={{ textTransform: 'capitalize' }}>
            {post.name}
          </Typography>
          <PostRating post={post} />
        </Box>
        <Typography variant="body1" dangerouslySetInnerHTML={{ __html: post.text }} />
      </Box>
    </Box>
  );
}

export default Post;
