import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import GlobalStyles from '../../../ui-kit/GlobalStyles';
import { User, Tweet } from '../../../types/types';
import { postTweet } from '../../../api/index';
import { useState } from 'react';



function PostAddition({ newTweetId, user }: { newTweetId: string, user: User }) {
    const styles = GlobalStyles;
    const [ newTweet, setNewTweet] = useState<Tweet>();

    function handleClick() {
        postTweet(newTweet || {});
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) { 
        if (user.id && user.name) {
            setNewTweet({
                id: newTweetId,
                author_id: user.id,
                name: user.name,
                text: e.target.value
            });
        }
    }

    return (
        <Box sx={{display: 'flex', width: '60%', flexDirection: 'column', alignItems: 'center', marginBottom: '30px'}}>
            <TextField multiline sx={{width: '100%', marginBottom:'2px'}}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)} />
            <Button sx={{...styles.button, alignSelf: 'end'}} onClick={handleClick}>add</Button>
        </Box>
    );
}


export default PostAddition;