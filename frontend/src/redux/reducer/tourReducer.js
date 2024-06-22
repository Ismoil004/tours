import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    tours: [],
    loading: false,
    error: null
};

const slice = createSlice({
    name: "tour",
    initialState,
    reducers: {
        fetchTourRequest: (state, action) => {
            state.loading = true;
            state.error = null;
        },
        fetchTourSuccess: (state, action) => {
            state.loading = false;
            state.tours = action.payload; // Updated to match initialState property
        },
        fetchTourFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    } 
});

export const {
    fetchTourRequest,
    fetchTourSuccess,
    fetchTourFailure,
} = slice.actions;

export default slice.reducer;
