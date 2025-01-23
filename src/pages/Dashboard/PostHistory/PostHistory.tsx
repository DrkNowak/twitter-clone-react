import { memo } from 'react';

import Post from './Post';
import { Tweet } from '../../../types/types';

function PostHistory({ tweets }: { tweets: Tweet[] }) {
  return <>{tweets.map((tweet: Tweet) => <Post post={tweet} key={tweet.id} />).reverse()}</>;
}

export default memo(PostHistory);
