import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axiosInstance from '../config/axiosInstance';
import Cookies from 'js-cookie';

export interface UserState {
    loading: boolean;
    id: number;
    login: string;
    loggedIn: boolean;
    error: string;
    role: string;
    initialCheckDone: boolean;
  };
  
  const initialUserState: UserState = {
    loading: false,
    id: 0,
    login: "",
    error: "",
    loggedIn: false,
    role: "",
    initialCheckDone: false,
  };
  

export interface LoginRequest {
    login: string,
    password: string,
}

export interface LogoutRequest {
    accessToken: string,
    refreshToken: string,
}

export const loginUser = createAsyncThunk(
    'auth/login',
    async ({ login, password }: LoginRequest, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post('/auth/login', { login, password });
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data || error.message);
        }
    }
);

export const logoutUser = createAsyncThunk(
    'auth/logout',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post('/auth/logout', 
            { 
                'access_token': Cookies.get('token'), 
                'refresh_token': Cookies.get('refreshToken') 
            });
            return response.data;
        } catch (error: any) {
            console.error(error)
            return rejectWithValue(error.response.data || error.message);
        }
    }
);

export const checkUser = createAsyncThunk(
    'auth/check',
    async (_, { rejectWithValue }) => {
      try {
        const response = await axiosInstance.post('/auth/check', {
            'access_token': Cookies.get('token') ?? '', 
            'refresh_token': Cookies.get('refreshToken') ?? ''
          });
          return response.data;

      } catch (error: any) {
        console.error(error)
        return rejectWithValue(error.response.data || error.message);
      }
    }
  );

const authSlice = createSlice({
    name: "auth",
    initialState: initialUserState,
    reducers: {},
    extraReducers: (builder) => {builder
        .addCase(loginUser.pending, (state) => {
            state.loading = true;
        })
        .addCase(loginUser.fulfilled, (state, action) => {
            state.loading = false;
            state.loggedIn = true;
            state.id = action.payload.id;
            state.login = action.payload.login;
            state.role = action.payload.role;
        })
        .addCase(loginUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        })
        .addCase(logoutUser.pending, (state) => {
            state.loading = true;
        })
        .addCase(logoutUser.fulfilled, (state, action) => {
            state.loading = false;
            state.loggedIn = false;
            state.id = 0;
            state.login = "";
            state.role = "";
        })
        .addCase(logoutUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        })
        .addCase(checkUser.pending, (state) => {
            state.loading = true;
        })
        .addCase(checkUser.fulfilled, (state, action) => {
            state.loading = false;
            state.loggedIn = true;
            state.id = action.payload.id;
            state.login = action.payload.login;
            state.role = action.payload.role;
            state.initialCheckDone = true;
          })
          .addCase(checkUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
            state.initialCheckDone = true;
          });
    },
});

export default authSlice.reducer;
