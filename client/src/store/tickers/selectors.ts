import { State } from '../../common/models/store'

export const getTickers = (state: State) =>
  [...state.tickers.tickers.filter(item => !item.disabled),
    ...state.tickers.tickers.filter(item => item.disabled)];
export const getInterval = (state: State) => state.tickers.updateInterval;