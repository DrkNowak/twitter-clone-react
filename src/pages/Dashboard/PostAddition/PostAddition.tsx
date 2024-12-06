import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import GlobalStyles from '../../../ui-kit/GlobalStyles';
import { User, Tweet } from '../../../types/types';
import { postTweet } from '../../../api/index';
import { useState } from 'react';


import PostAdditionStyles from './PostAdditionStyles';



function PostAddition({ newTweetId, user, setFetchTweets }: { newTweetId: string, user: User, setFetchTweets: (arg: boolean)=>void }) {
    const styles = GlobalStyles();
    const postAdditionStyles = PostAdditionStyles();
    const [ newTweet, setNewTweet] = useState<Tweet>();

    function handleClick() {
        postTweet(newTweet || {});
        setFetchTweets(true);
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) { 
        setNewTweet({
            id: newTweetId,
            author_id: user.id || '',
            name: user.name || '',
            text: e.target.value.replace(/(^[ \t]*\n)/gm, "")
        });
    }

    return (
        <Box sx={postAdditionStyles.box}>
            <TextField multiline sx={postAdditionStyles.textField}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)} />
            <Button sx={{ ...styles.button, alignSelf: 'end' }} onClick={handleClick} disabled={!newTweet?.text}>add</Button>
        </Box>
    );
}


export default PostAddition;