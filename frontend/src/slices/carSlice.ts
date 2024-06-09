import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axiosInstance from '../config/axiosInstance';
import Cookies from 'js-cookie';
import { Car, CarMake, CarModel, Engine, FuelType, Transmission } from '../models/car';

export interface CarState {
    loading: boolean;
    cars: Car[];
    carMakes: CarMake[];
    carModels: CarModel[];
    transmissions: Transmission[];
    fuelTypes: FuelType[];
    engines: Engine[];
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
    carMakes: [],
    carModels: [],
    transmissions: [],
    fuelTypes: [],
    engines: [],
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
            const response = await axiosInstance.post('/cars/view', request);
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

export const getCarMakes = createAsyncThunk(
    'cars/getAllMakes',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get('/car-makes');
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data || error.message);
        }
    }
);

export const getTransmissions = createAsyncThunk(
    'cars/getTransmissions',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get('/transmissions');
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data || error.message);
        }
    }
);

export const getFuelTypes = createAsyncThunk(
    'cars/getFuelTypes',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get('/fuel-types');
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data || error.message);
        }
    }
);

export const getEngines = createAsyncThunk(
    'cars/getEngines',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get('/engines');
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data || error.message);
        }
    }
);

export const getCarModelsForMake = createAsyncThunk(
    'cars/getCarModelsForMake',
    async (carMakeId: number, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`/car-makes/${carMakeId}/models`);
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

export const createCar = createAsyncThunk(
    'cars/create',
    async (car: Car, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post(`/cars`, car);
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
        .addCase(getCarMakes.pending, (state) => {
            state.loading = true;
        })
        .addCase(getCarMakes.fulfilled, (state, action) => {
            state.loading = false;
            state.carMakes = action.payload;
        })
        .addCase(getCarMakes.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        })
        .addCase(getCarModelsForMake.pending, (state) => {
            state.loading = true;
        })
        .addCase(getCarModelsForMake.fulfilled, (state, action) => {
            state.loading = false;
            state.carModels = action.payload;
        })
        .addCase(getCarModelsForMake.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        })
        .addCase(getTransmissions.pending, (state) => {
            state.loading = true;
        })
        .addCase(getTransmissions.fulfilled, (state, action) => {
            state.loading = false;
            state.transmissions = action.payload;
        })
        .addCase(getTransmissions.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        })
        .addCase(getFuelTypes.pending, (state) => {
            state.loading = true;
        })
        .addCase(getFuelTypes.fulfilled, (state, action) => {
            state.loading = false;
            state.fuelTypes = action.payload;
        })
        .addCase(getFuelTypes.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        })
        .addCase(getEngines.pending, (state) => {
            state.loading = true;
        })
        .addCase(getEngines.fulfilled, (state, action) => {
            state.loading = false;
            state.engines = action.payload;
        })
        .addCase(getEngines.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        })
    },
});

export default carSlice.reducer;
