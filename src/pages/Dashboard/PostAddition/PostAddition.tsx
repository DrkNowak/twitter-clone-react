import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import GlobalStyles from '../../../ui-kit/GlobalStyles';
import { User, Tweet } from '../../../types/types';
import { postTweet } from '../../../api/index';
import { useState } from 'react';



function PostAddition({ newTweetId, user }: {newTweetId: string, user: User}){
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
        <>
            <TextField multiline
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)} />
            <Button  onClick={handleClick}>add</Button>
            </>
    );
}


export default PostAddition;