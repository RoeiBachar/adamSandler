import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { userInterface } from '../../Interfaces/userInterface'


export interface IUser {
    user: userInterface | null
}

const initialState: IUser = {
    user: null
}

export const userDataSlice = createSlice({
    name: 'userDataState',
    initialState,
    reducers: {
        updateUserData: (state, action: PayloadAction<userInterface>) => {
            state.user = { ...action.payload };
            return state;
        },
    },
})

// Action creators are generated for each case reducer function
export const { updateUserData } = userDataSlice.actions
export default userDataSlice.reducer
