import { memo } from 'react';

import Post from './Post';
import { Tweet } from '../../../types/types';

function PostHistory({ tweets }: { tweets: Tweet[] }) {
  const history = tweets.map((tweet: Tweet) => <Post post={tweet} key={tweet.id} />).reverse();

  return <>{history}</>;
}

export default memo(PostHistory);
