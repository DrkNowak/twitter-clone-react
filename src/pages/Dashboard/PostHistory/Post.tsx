import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import UserAvatar from '../../../components/UserAvatar/UserAvatar';

import GlobalStyles from '../../../ui-kit/GlobalStyles';
import PostHistoryStyles from './PostHistoryStyles';

import { Tweet } from "../../../types/types";

function Post({ post }: { post: Tweet }) {
    const styles = { ...GlobalStyles(), ...PostHistoryStyles() };

    return (
        <Box sx={{ ...styles.borderBox, ...styles.postWrapper }} key={post.id}>
           <UserAvatar user={{name: post.name} }/>
            <Box>
                <Typography variant="caption" sx={{textTransform: 'capitalize'}}>{post.name}</Typography>
                <Typography variant="body1" dangerouslySetInnerHTML={{__html: post.text}}/>
            </Box>  
        </Box>)
    );
}


export default Post;