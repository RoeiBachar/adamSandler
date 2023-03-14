import { configureStore } from '@reduxjs/toolkit'
import userDataStateReducer from './features/dataSlice'

export const store = configureStore({
    reducer: {
        userDataState: userDataStateReducer
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch