import {createSlice} from '@reduxjs/toolkit'
import {Session} from "@supabase/gotrue-js";
import {ReduxState} from "@/lib/redux/store";

const initialState = {
    session: null,
} as { session: Session | null }

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setSession: (state, action) => {
            state.session = action.payload
        },
        logout: () => initialState,
    },
})

export const {logout, setSession} = authSlice.actions
export default authSlice.reducer

export const session = (state: ReduxState) => state.auth.session
