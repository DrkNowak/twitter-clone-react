import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import ThumbUp from '@mui/icons-material/ThumbUp';
import ThumbDown from '@mui/icons-material/ThumbDown';

import { Tweet } from "../../../types/types";

import { updateRating } from '../../../api/index';

function PostRating({ post }: { post: Tweet }) {
    const getRating = () => post.rating.up - post.rating.down;

    const changeRank = async (operation: 'up' | 'down') => {
        const postRat = post.rating;
        
        if (operation === 'up') {
            await updateRating({ ...post, rating: { ...postRat, up: ++postRat.up } });
        } else {
            await updateRating({ ...post, rating: { ...postRat, down: ++postRat.down } });
         }
    };

    return (
        <Box sx={{display: 'flex', justifyContent:'space-between', width:'70px'}}>
            <Typography variant='body1' sx={{ color: 'red' }}> { getRating() } </Typography>
            <ThumbUp onClick={()=>changeRank('up') } />
            <ThumbDown  onClick={()=>changeRank('down') }  />
        </Box>);
}


export default PostRating;