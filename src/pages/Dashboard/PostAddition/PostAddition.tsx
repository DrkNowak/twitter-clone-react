import { v4 as uuidv4 } from 'uuid';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import GlobalStyles from '../../../ui-kit/GlobalStyles';
import { User, Tweet } from '../../../types/types';
import { apiService } from '../../../api/index';
import { useState } from 'react';

import PostAdditionStyles from './PostAdditionStyles';

import { useDispatch } from 'react-redux';
import { fetchTweets } from '../../../store/user';
import { AppDispatch } from '../../../store';

type PostAdditionProps = { newTweetId: string; user: User };

function PostAddition({ user }: PostAdditionProps) {
  const styles = GlobalStyles();
  const postAdditionStyles = PostAdditionStyles();

  const [newTweet, setNewTweet] = useState<Tweet>({
    id: '',
    author_id: '',
    name: '',
    text: '',
    rating: { up: [], down: [] },
  });

  const dispatch = useDispatch<AppDispatch>();

  function handleClick() {
    apiService.postTweet(newTweet);
    dispatch(fetchTweets());
    handlePostChange('');
  }

  function handlePostChange(text: string) {
    setNewTweet({
      id: uuidv4(),
      author_id: user.id || '',
      name: user.name || '',
      text,
      rating: { up: [], down: [] },
    });
  }

  return (
    <Box sx={postAdditionStyles.box}>
      <TextField
        multiline
        sx={postAdditionStyles.textField}
        value={newTweet?.text || ''}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handlePostChange(e.target.value)}
      />
      <Button sx={{ ...styles.button, alignSelf: 'end' }} onClick={handleClick} disabled={!newTweet?.text}>
        add
      </Button>
    </Box>
  );
}

export default PostAddition;
