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
        fetchToursRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchToursSuccess: (state, action) => {
            state.loading = false;
            state.tours = action.payload;
        },
        fetchToursFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        addTourRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        addTourSuccess: (state, action) => {
            state.loading = false;
            state.tours.push(action.payload);
        },
        addTourFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        updateTourRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        updateTourSuccess: (state, action) => {
            state.loading = false;
            const index = state.tours.findIndex(tour => tour.id === action.payload.id);
            if (index !== -1) {
                state.tours[index] = action.payload;
            }
        },
        updateTourFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        deleteTourRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        deleteTourSuccess: (state, action) => {
            state.loading = false;
            state.tours = state.tours.filter(tour => tour.id !== action.payload);
        },
        deleteTourFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
});

export const {
    fetchToursRequest,
    fetchToursSuccess,
    fetchToursFailure,
    addTourRequest,
    addTourSuccess,
    addTourFailure,
    updateTourRequest,
    updateTourSuccess,
    updateTourFailure,
    deleteTourRequest,
    deleteTourSuccess,
    deleteTourFailure
} = slice.actions;

export default slice.reducer;
