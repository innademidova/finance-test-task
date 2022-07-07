import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import tickersReducer from './tickers/reducer';

const reducers = combineReducers({
	tickers: tickersReducer,
});

const store = configureStore({
	reducer: reducers,
});
export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
