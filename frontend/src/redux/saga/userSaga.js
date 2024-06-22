import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
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
} from "../reducer/userReducer";

function* fetchTours() {
    try {
        const response = yield call(axios.get, 'http://localhost:9090/api/tour/getAll');
        yield put(fetchToursSuccess(response.data));

    } catch (error) {
        yield put(fetchToursFailure(error.message));
    }
}

function* addTour(action) {
    try {
        const response = yield call(axios.post, 'http://localhost:9090/api/tour', action.payload);
        yield put(addTourSuccess(response.data));
    } catch (error) {
        yield put(addTourFailure(error.message));
    }
}

function* updateTour(action) {
    try {
        const response = yield call(axios.put, `http://localhost:9090/api/tour/${action.payload.id}`, action.payload);
        yield put(updateTourSuccess(response.data));
    } catch (error) {
        yield put(updateTourFailure(error.message));
    }
}

function* deleteTour(action) {
    try {
        yield call(axios.delete, `http://localhost:9090/api/tour/${action.payload}`);
        yield put(deleteTourSuccess(action.payload));
    } catch (error) {
        yield put(deleteTourFailure(error.message));
    }
}

export function* userSaga() {
    yield takeLatest(fetchToursRequest.type, fetchTours);
    yield takeLatest(addTourRequest.type, addTour);
    yield takeLatest(updateTourRequest.type, updateTour);
    yield takeLatest(deleteTourRequest.type, deleteTour);
}
