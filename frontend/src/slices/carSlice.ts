import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axiosInstance from '../config/axiosInstance';
import Cookies from 'js-cookie';
import { Car } from '../models/car';

export interface CarState {
    loading: boolean;
    cars: Car[];
    totalPages: number;
    totalElements: number;
    last: boolean;
    first: boolean;
    pageNumber: number;
    pageSize: number;
    error: string;
  };
  
  const initialCarState: CarState = {
    loading: false,
    cars: [],
    totalPages: 0,
    totalElements: 0,
    last: false,
    first: true,
    pageNumber: 0,
    pageSize: 20,
    error: "",
  };
  

export interface GetCarsRequest {
    pageId: number;
    numElements: number;
    sortBy: string;
    sortDirection: 'asc' | 'desc';
}

export const getCars = createAsyncThunk(
    'cars/getAll',
    async (request: GetCarsRequest, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post('/cars', request);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data || error.message);
        }
    }
);

export const deleteCar = createAsyncThunk(
    'cars/delete',
    async (carId: number, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.delete(`/cars/${carId}`);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data || error.message);
        }
    }
);

export const generateExcelForCars = createAsyncThunk(
    'cars/excel',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`/cars/excel`, {
                responseType: 'blob', 
            });
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data || error.message);
        }
    }
);


export const restoreCar = createAsyncThunk(
    'cars/restore',
    async (carId: number, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.patch(`/cars/${carId}`);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data || error.message);
        }
    }
);

const carSlice = createSlice({
    name: "cars",
    initialState: initialCarState,
    reducers: {},
    extraReducers: (builder) => {builder
        .addCase(getCars.pending, (state) => {
            state.loading = true;
        })
        .addCase(getCars.fulfilled, (state, action) => {
            state.loading = false;
            state.cars = action.payload.content;
            state.totalPages = action.payload.totalPages;
            state.totalElements = action.payload.totalElements;
            state.last = action.payload.last;
            state.first = action.payload.first;
            state.pageNumber = action.payload.pageable.pageNumber;
            state.pageSize = action.payload.pageable.pageSize;
        })
        .addCase(getCars.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        })
        .addCase(deleteCar.pending, (state) => {
            state.loading = true;
        })
        .addCase(deleteCar.fulfilled, (state, action) => {
            state.loading = false;
        })
        .addCase(deleteCar.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        })
        .addCase(restoreCar.pending, (state) => {
            state.loading = true;
        })
        .addCase(restoreCar.fulfilled, (state, action) => {
            state.loading = false;
        })
        .addCase(restoreCar.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        })
        .addCase(generateExcelForCars.pending, (state) => {
            state.loading = true;
        })
        .addCase(generateExcelForCars.fulfilled, (state, action) => {
            state.loading = false;
        })
        .addCase(generateExcelForCars.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        })
    },
});

export default carSlice.reducer;
