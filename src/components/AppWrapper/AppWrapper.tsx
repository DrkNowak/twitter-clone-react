import { Fragment } from "react";
import Header from '../Header/Header';
import PostHistory from '../PostHistory/PostHistory';
import LoginScreen from '../LoginScreen/LoginScreen';
import PostAddition from "../PostAddition/PostAddition";

import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import { RootState } from '../../store';
import { getTweets } from '../../api'; 
import { Tweet } from "../../types/types";


function AppWrapper() {

    
  const user = useSelector((state: RootState) => {
      return state.user.user;
    });
  
    const [tweets, setTweets] = useState<Tweet[]>([]);

    useEffect(() => {
      const fetchTweets = async () => {
        const { data } = await getTweets();
        setTweets(data);
      };
  
      fetchTweets();
    }, [user]);


    return (
      <Fragment>
        {user.id && <Header user={user} />}
        <div className="App" style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
        {!user.id && <LoginScreen />}
          {user.id && <PostAddition newTweetId={String(tweets.length + 1)} user={ user } />}
        { user.id && <PostHistory tweets={tweets}/> }
    </div>
    </Fragment>
    );
  }
  
  export default AppWrapper;