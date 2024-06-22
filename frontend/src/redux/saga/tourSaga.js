import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
    fetchTourRequest,
    fetchTourSuccess,
    fetchTourFailure,
} from "../reducer/tourReducer";

function* fetchTours(action) {
    try {
        const response = yield call(axios.get, `http://localhost:9090/api/tour/getAll`);
        yield put(fetchTourSuccess(response.data));
    } catch (error) {
        console.log('Error fetching tours:', error.message);
        yield put(fetchTourFailure(error.message));
    }
}


export function* tourSaga() {
    yield takeLatest(fetchTourRequest.type, fetchTours);
}
