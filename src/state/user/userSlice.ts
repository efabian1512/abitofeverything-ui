
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../models/User';


export interface UserState {
    loggedUser: User | null
}

const initialState: UserState = {
    loggedUser: null
};


const userSlice = createSlice({
    name:'loggedUser',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User>) => {
            state.loggedUser = action.payload
        },
        removeUser:(state) => {
            state.loggedUser = initialState.loggedUser
        }
    }
});

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;