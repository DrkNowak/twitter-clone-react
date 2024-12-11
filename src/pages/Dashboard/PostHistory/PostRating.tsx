import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import ThumbUp from '@mui/icons-material/ThumbUp';
import ThumbDown from '@mui/icons-material/ThumbDown';

import { Tweet } from "../../../types/types";

import { updateRating } from '../../../api/index';

function PostRating({ post }: { post: Tweet }) {
    const getRating = () => post.rating.up.length - post.rating.down.length;

    const changeRank = async (operation: 'up' | 'down') => {
        const postRatUp = post.rating.up;
        const postRatDown = post.rating.down;
        const rating = post.rating;

        const user = 'temp';
        const hasUserVoted = [...postRatUp, ...postRatDown].includes(user);

        if (hasUserVoted) {
            rating[operation] = post.rating[operation].filter(voter => voter !== user);
        } else {
            rating[operation].push(user);
        }

        await updateRating({ ...post, rating });
    };

    return (
        <Box sx={{display: 'flex', justifyContent:'space-between', width:'70px'}}>
            <Typography variant='body1' sx={{ color: 'red' }}> { getRating() } </Typography>
            <ThumbUp onClick={()=>changeRank('up') } />
            <ThumbDown  onClick={()=>changeRank('down') }  />
        </Box>);
}


export default PostRating;