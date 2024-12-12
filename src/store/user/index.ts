import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/types';

export interface UserSliceState {
  user: User,
  shouldFetchTweets: boolean,
}

const initialState: UserSliceState = {
  user: {
    id: '',
    name: '',
    email: '',
    password: '',
  },
  shouldFetchTweets: true
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setStoreUser: (initialState: UserSliceState, action : PayloadAction<User>) : void => {
      initialState.user = {...initialState.user, ...action.payload}; 
    },
    setShouldFetchTweets: (initialState: UserSliceState, action: PayloadAction<boolean>): void => {
      initialState.shouldFetchTweets = action.payload; 
    },
  },
});

// Action creators are generated for each case reducer function
export const { setStoreUser, setShouldFetchTweets } = userSlice.actions;

export default userSlice.reducer;