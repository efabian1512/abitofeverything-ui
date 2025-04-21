
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../models/User';


export interface UserState {
    user: User | null
}

const initialState: UserState = {
    user: null
};


const userSlice = createSlice({
    name:'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User>) => {
            state.user = action.payload
        },
        removeUser:(state) => {
            state.user = initialState.user
        }
    }
});

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;