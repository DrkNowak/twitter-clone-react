import { useSelector, useDispatch } from 'react-redux';

import { RootState, AppDispatch } from '../../../store';
import { fetchTweets } from '../../../store/user';
import { apiService } from '../../../api/index';

import { Tweet } from '../../../types/types';

export default function useChangeRank(post: Tweet) {
  const dispatch = useDispatch<AppDispatch>();

  const currentUser = useSelector((state: RootState) => state.user.user);

  const postRatUp = post.rating.up;
  const postRatDown = post.rating.down;
  const rating = postRatUp.length - postRatDown.length;

  const changeRank = async (operation: 'up' | 'down') => {
    const rating = { up: [...postRatUp], down: [...postRatDown] };
    const user = currentUser.id || '';
    const hasUserVoted = [...postRatUp, ...postRatDown].includes(user);

    if (hasUserVoted) {
      rating.up = postRatUp.filter((voter) => voter !== user);
      rating.down = postRatDown.filter((voter) => voter !== user);
    } else {
      rating[operation].push(user);
    }

    await apiService.updateRating({ ...post, rating });

    dispatch(fetchTweets());
  };

  return {
    changeRank,
    rating,
  };
}
