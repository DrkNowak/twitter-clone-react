import Box from '@mui/material/Box';
import UserAvatar from '../../../components/UserAvatar/UserAvatar';
import GlobalStyles from '../../../ui-kit/GlobalStyles';
import PostHistoryStyles from './PostHistoryStyles';
import { Tweet } from "../../../types/types";
import { memo } from 'react';

function PostHistory({tweets}: {tweets: Tweet[]}){
    const styles = { ...GlobalStyles, ...PostHistoryStyles };

    const history = tweets.map(tweet => 
        <Box sx={{ ...styles.borderBox, ...styles.postWrapper }} key={tweet.id}>
             <UserAvatar user={{name: tweet.name} }/>
            <Box>
                <p>{tweet.name}</p>
                <p dangerouslySetInnerHTML={{__html: tweet.text}}/>
            </Box>
        </Box>).reverse();

    return (
       <Box>
        {history}
       </Box>
    );
}


export default memo(PostHistory);