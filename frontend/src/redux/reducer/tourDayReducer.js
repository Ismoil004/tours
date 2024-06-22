import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    tourDays: [],
    tours: [],
    loading: false,
    error: null
};

const slice = createSlice({
    name: "tourDay",
    initialState,
    reducers: {
        fetchTourDaysRequest: (state, action) => {
            state.loading = true;
            state.error = null;
        },
        fetchTourDaysSuccess: (state, action) => {
            state.loading = false;
            state.tourDays = action.payload;
        },
        fetchTourDaysFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        getIdRequest: (state, action) => {

            state.loading = true;
            state.error = null;
        },
        getIdSuccess:(state,action) =>{
            state.loading = false;
            state.tourDays = action.payload;
        },
        getIdFailure:(state,action) =>{
            state.loading = false
            state.error = action.payload
        },
        addTourDayRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        addTourDaySuccess: (state, action) => {
            state.loading = false;
            state.tourDays.push(action.payload);
        },
        addTourDayFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        updateTourDayRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        updateTourDaySuccess: (state, action) => {
            state.loading = false;
            const index = state.tourDays.findIndex(tourDay => tourDay.id === action.payload.id);
            if (index !== -1) {
                state.tourDays[index] = action.payload;
            }
        },
        updateTourDayFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        deleteTourDayRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        deleteTourDaySuccess: (state, action) => {
            state.loading = false;
            state.tourDays = state.tourDays.filter(tourDay => tourDay.id !== action.payload);
        },
        deleteTourDayFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }

    }
});

export const {
    fetchTourDaysRequest,
    fetchTourDaysSuccess,
    fetchTourDaysFailure,
    addTourDayRequest,
    addTourDaySuccess,
    addTourDayFailure,
    updateTourDayRequest,
    updateTourDaySuccess,
    updateTourDayFailure,
    deleteTourDayRequest,
    deleteTourDaySuccess,
    deleteTourDayFailure,
    getIdRequest,
    getIdSuccess,
    getIdFailure
} = slice.actions;

export default slice.reducer;
