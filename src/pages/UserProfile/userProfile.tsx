import { useSelector } from 'react-redux';
import { useSearchParams } from "react-router-dom";

import Box from '@mui/material/Box';
import AppStyles from '../Dashboard/AppStyles';

import { RootState } from '../../store';
import PostHistory from '../Dashboard/PostHistory/PostHistory';

import ArrowLeftRounded from '@mui/icons-material/ArrowBack';

import { useNavigate } from 'react-router';

function UserProfile() {
  const styles = AppStyles();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const tweets = useSelector((state: RootState) => {
    return state.user.tweets;
  });

  function handleClick() {  
    navigate(`/`);
  };

  return (
    <Box sx={styles.appWrapper}>
      <ArrowLeftRounded sx={{position:'fixed', left: '100px', top: '10px', width:'50px', height: '50px', backgroundColor:'grey', borderRadius:'20px', color:'white'}} onClick={handleClick} />
      <PostHistory tweets={ tweets.filter(({ author_id }) => author_id === searchParams.get('id'))} />
    </Box>
    );
  }
  
  export default UserProfile;