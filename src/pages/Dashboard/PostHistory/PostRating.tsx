import { useSelector, useDispatch } from 'react-redux';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ThumbUp from '@mui/icons-material/ThumbUp';
import ThumbDown from '@mui/icons-material/ThumbDown';

import { Tweet } from "../../../types/types";
import { RootState } from '../../../store';

import { updateRating } from '../../../api/index';

import { setShouldFetchTweets } from '../../../store/user/'; 

function PostRating({ post }: { post: Tweet }) {
    const dispatch = useDispatch();

    const currentUser = useSelector((state: RootState) => {
        return state.user.user;
    });

    const getRating = () => post.rating.up.length - post.rating.down.length;

    const changeRank = async (operation: 'up' | 'down') => {
        const postRatUp = post.rating.up;
        const postRatDown = post.rating.down;
        const rating = { up: [...postRatUp] , down: [...postRatDown] };

        const user = currentUser.id || '';

        const hasUserVoted = [...postRatUp, ...postRatDown].includes(user);

        if (hasUserVoted) {
            rating.up = post.rating.up.filter(voter => voter !== user);
            rating.down = post.rating.down.filter(voter => voter !== user);
        } else {
            rating[operation].push(user);
        }

        await updateRating({ ...post, rating });
        
        dispatch(setShouldFetchTweets(true));
    };

    return (
        <Box sx={{display: 'flex', justifyContent:'space-between', width:'76px'}}>
            <Typography variant='body1' sx={{ color: getRating() >= 0 ? 'green' : 'red', width: '20px' }}> { getRating() } </Typography>
            <ThumbUp onClick={()=> changeRank('up') } />
            <ThumbDown  onClick={()=> changeRank('down') }  />
        </Box>);
}


export default PostRating;