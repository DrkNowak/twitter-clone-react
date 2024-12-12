import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import GlobalStyles from '../../../ui-kit/GlobalStyles';
import { User, Tweet } from '../../../types/types';
import { postTweet } from '../../../api/index';
import { useState } from 'react';

import PostAdditionStyles from './PostAdditionStyles';

import { useDispatch } from 'react-redux';

import { setShouldFetchTweets } from '../../../store/user/'; 

function PostAddition({ newTweetId, user }: { newTweetId: string, user: User }) {
    const styles = GlobalStyles();
    const postAdditionStyles = PostAdditionStyles();

    const [ newTweet, setNewTweet] = useState<Tweet>();

    const dispatch = useDispatch();

    function handleClick() {
        postTweet(newTweet || {});
        dispatch(setShouldFetchTweets(true));
        handleChange('');
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement> | string) { 
        setNewTweet({
            id: newTweetId + new Date(),
            author_id: user.id || '',
            name: user.name || '',
            text: typeof e !== 'string' ? e.target.value.replace(/(^[ \t]*\n)/gm, "") : e,
            rating: {up: [], down: []}
        });
    }

    return (
        <Box sx={postAdditionStyles.box}>
            <TextField multiline sx={postAdditionStyles.textField}
                value={newTweet?.text || ''}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)} />
            <Button sx={{ ...styles.button, alignSelf: 'end' }} onClick={handleClick} disabled={!newTweet?.text}>add</Button>
        </Box>
    );
}


export default PostAddition;