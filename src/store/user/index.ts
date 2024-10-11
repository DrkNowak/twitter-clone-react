import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/types';

export interface UserSliceState {
  user: User,
}

const initialState: UserSliceState = {
  user: {
    id: '',
    name: '',
    email: '',
    password: '',
  }
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setStoreUser: (initialState: UserSliceState, action : PayloadAction<User>) : void => {
      initialState.user = {...initialState.user, ...action.payload}; 
      },
    // setId: (initialState: UserState, action : PayloadAction<string>) : void => { initialState.id = action.payload },
  },
});

// Action creators are generated for each case reducer function
export const { setStoreUser } = userSlice.actions;

export default userSlice.reducer;