import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';

interface SelectedUserState {
  user: User | null;
}

const initialState: SelectedUserState = {
  user: null,
};

const selectedUserSlice = createSlice({
  name: 'selectedUser',
  initialState,
  reducers: {
    setSelectedUser(state, action: PayloadAction<User | null>) {
      state.user = action.payload;
    },
  },
});

export const { setSelectedUser } = selectedUserSlice.actions;
export default selectedUserSlice.reducer;