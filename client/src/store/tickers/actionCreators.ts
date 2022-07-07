import { Ticker } from '../../common/models/ticker'
import { TOGGLE_CHECKED, SET_RAW_TICKERS, SYNC_TICKERS, UPDATE_INTERVAL } from './actionTypes'

export const setRawTickersAC = (tickers: Ticker[]) => ({
  type: SET_RAW_TICKERS,
  tickers,
});

export const syncTickersAC = () => ({
  type: SYNC_TICKERS,
});


export const updateIntervalAC = (interval: number) => ({type: UPDATE_INTERVAL, interval})

export const toggleCheckedTickerAC = (ticker: string) => ({type: TOGGLE_CHECKED, ticker})