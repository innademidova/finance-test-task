import {
	TOGGLE_CHECKED,
	SET_RAW_TICKERS,
	SYNC_TICKERS,
	UPDATE_INTERVAL,
} from './actionTypes';
import { Ticker, TickerViewModel } from '../../common/models/ticker';
import { TickersState } from '../../common/models/store';
import { getTickersName } from '../../common/helpers/getTickersName';

export type TickersAction = {
	type: string;
	tickers: Ticker[];
	ticker: string;
	interval: number;
};

const initialState: TickersState = {
	rawTickers: [],
	tickers: [],
	updateInterval: 5000,
};

const tickersReducer = (state = initialState, action: TickersAction) => {
	switch (action.type) {
		case SET_RAW_TICKERS:
			return {
				...state,
				rawTickers: [...action.tickers],
			};
		case SYNC_TICKERS: {
			const tickers: TickerViewModel[] = state.rawTickers.map((item) => {
				const ticker = state.tickers.find(
					(stateItem) => stateItem.ticker === item.ticker
				);
				const name = getTickersName(item.ticker);

				if (!ticker) {
					return { ...item, name, marketStatus: 'noChange' };
				}
				if (ticker.disabled) {
					return ticker;
				}

				const previousPrice = Number(ticker.price);
				const currentPrice = Number(item.price);

				return {
					...item,
					name,
					marketStatus:
						currentPrice > previousPrice
							? 'up'
							: currentPrice < previousPrice
							? 'down'
							: 'noChange',
					disabled: ticker.disabled,
				} as TickerViewModel;
			});

			return {
				...state,
				tickers: [...tickers],
			};
		}
		case TOGGLE_CHECKED:
			return {
				...state,
				tickers: state.tickers.map((item) => {
					if (item.ticker === action.ticker) {
						return { ...item, disabled: !item.disabled };
					}
					return item;
				}),
			};
		case UPDATE_INTERVAL:
			return {
				...state,
				updateInterval: action.interval,
			};

		default:
			return state;
	}
};

export default tickersReducer;
