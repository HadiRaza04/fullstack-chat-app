import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { axiosInstance } from '../../lib/axios.js';
import { connectSocket } from '../../lib/socket.js';

export const getUser = createAsyncThunk("user/me", async(_, thunkAPI) => {
    try {
        const res = await axiosInstance.get("/user/me");
        connectSocket(res.data.user);
        return res.data.user;
    } catch (error) {
        throw error;
    }

});
const authSlice = createSlice({
    name: 'auth',
    initialState: {
        authUser: null,
        isSigningUp: false,
        isLoggingIn: false,
        isUpdatingProfile: false,
        isCheckingAuth: false,
        onlineUsers: [] 
    },
    reducers: {
        setOnlineUsers: (state, action) => {
            state.onlineUsers = action.payload;
        },
        // setUser: (state, action) => {
        //     state.authUser = action.payload;
        //     state.isAuthenticated = true;
        // },
        // clearUser: (state) => {
        //     state.authUser = null;
        //     state.isAuthenticated = false;
        // }
    },
    extraReducers: (builder) => {
        builder.addCase(getUser.fullfilled, (state, action) => {
            state.authUser = action.payload;
            state.isAuthenticated = true;
        })
        .addCase(getUser.rejected, (state, action) => {
            state.authUser = null;
            state.isAuthenticated = false;
        });
    }
});

export const { setOnlineUsers } = authSlice.actions;
export default authSlice.reducer;