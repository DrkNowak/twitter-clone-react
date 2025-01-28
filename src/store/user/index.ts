import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/types';
import { Tweet } from '../../types/types';
import type { AxiosError } from 'axios';

export interface UserSliceState {
  user: User;
  shouldFetchTweets: boolean;
  tweets: Tweet[];
  error: string;
  isLoading: boolean;
}

const initialState: UserSliceState = {
  user: {
    id: '',
    name: '',
    email: '',
    password: '',
  },
  shouldFetchTweets: true,
  tweets: [],
  error: '',
  isLoading: false,
};

import { apiService } from '../../api';

interface ValidationErrors {
  errorMessage: string;
  field_errors: Record<string, string>;
}

export const fetchTweets = createAsyncThunk<Tweet[], void, { rejectValue: string }>(
  'user/fetchTweets',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiService.getTweets();

      // to debug
      // throw new Error('smth');

      return response;
    } catch (err) {
      const error = err as AxiosError<ValidationErrors>;

      if (!error.response) {
        throw err;
      }

      return rejectWithValue(error.response.data.errorMessage);
    }
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setStoreUser: (initialState: UserSliceState, action: PayloadAction<User>) => {
      initialState.user = { ...initialState.user, ...action.payload };
    },
    setStoreTweets: (initialState: UserSliceState, action: PayloadAction<Tweet[]>) => {
      initialState.tweets = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTweets.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchTweets.fulfilled, (state, action: PayloadAction<Tweet[]>) => {
        state.tweets = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchTweets.rejected, (state, action: PayloadAction<string | undefined>) => {
        console.log('error', action);
        state.error = action.payload || 'Unknown error';
        state.isLoading = false;
      });
  },
});

// Action creators are generated for each case reducer function
export const { setStoreUser, setStoreTweets } = userSlice.actions;

export default userSlice.reducer;
