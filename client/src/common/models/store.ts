import { Ticker, TickerViewModel } from './ticker';

export interface State {
	tickers: TickersState;
}

export interface TickersState {
	tickers: TickerViewModel[];
	rawTickers: Ticker[];
	updateInterval: number;
}
