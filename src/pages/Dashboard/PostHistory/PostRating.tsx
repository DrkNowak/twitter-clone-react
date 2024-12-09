import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import ThumbUp from '@mui/icons-material/ThumbUp';
import ThumbDown from '@mui/icons-material/ThumbDown';

import { Rating } from '../../../types/types';


function PostRating({ postRating }: { postRating: Rating }) {
    // const styles = { ...GlobalStyles(), ...PostHistoryStyles() };
    const getRating = () => postRating.up - postRating.down;

    return (
        <Box>
            <ThumbUp />
            <ThumbDown />
            <Typography variant='body1' sx={{ color: 'red' }}> { getRating() } </Typography>
        </Box>);
}


export default PostRating;