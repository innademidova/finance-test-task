import tickersReducer, { TickersAction } from './reducer';
import { TickersState } from '../../common/models/store';
import { setRawTickersAC, syncTickersAC } from './actionCreators';
import { Ticker } from '../../common/models/ticker';

describe('SET_RAW_TICKERS suite', () => {
	const initialState: TickersState = {
		rawTickers: [],
		tickers: [],
		updateInterval: 5000,
	};

	test('SET_RAW_TICKERS action will set rawTickers', () => {
		const expectedTickers: Ticker[] = [
			{
				ticker: 'GOOGL',
				exchange: 'NASDAQ',
				price: '237.08',
				change: '154.38',
				change_percent: '0.1',
				dividend: '0.46',
				yield: '1.18',
				last_trade_time: '2021-04-30T11:53:21.000Z',
			},
		];
		const action = setRawTickersAC(expectedTickers) as never as TickersAction;

		const result = tickersReducer(initialState, action);

		expect(result).not.toBeNull();
		expect(result.rawTickers.length).toBe(1);
		const firstTicker = result.rawTickers[0];
		expect(firstTicker).toMatchObject(result.rawTickers[0]);
	});
});

describe('SYNC_TICKERS suite', () => {
	const action = syncTickersAC() as never as TickersAction;

	let initialState: TickersState = {
		rawTickers: [
			{
				ticker: 'GOOGL',
				exchange: 'NASDAQ',
				price: '237.08',
				change: '154.38',
				change_percent: '0.1',
				dividend: '0.46',
				yield: '1.18',
				last_trade_time: '2021-04-30T11:53:21.000Z',
			},
			{
				ticker: 'TSLA',
				exchange: 'NASDAQ',
				price: '21.08',
				change: '220.38',
				change_percent: '0.5',
				dividend: '0.46',
				yield: '1.11',
				last_trade_time: '2021-05-30T11:53:21.000Z',
			},
		],
		tickers: [],
		updateInterval: 0,
	};

	test('SYNC_TICKERS action will map correctly when previously no data', () => {
		const result = tickersReducer(initialState, action);
		const actualTickers = result.tickers;

		expect(actualTickers).toHaveLength(2);

		expect(actualTickers[0]).toMatchObject(initialState.rawTickers[0]);
		expect(actualTickers[0].disabled).toBeFalsy();
		expect(actualTickers[0].marketStatus).toBe('noChange');

		expect(actualTickers[1]).toMatchObject(initialState.rawTickers[1]);
		expect(actualTickers[1].disabled).toBeFalsy();
		expect(actualTickers[0].marketStatus).toBe('noChange');
	});

	test('SYNC_TICKERS action will map correctly when previous data exist', () => {
		initialState = {
			...initialState,
			tickers: [
				{
					ticker: 'TSLA',
					exchange: 'NASDAQ',
					price: '50.08',
					change: '30.38',
					change_percent: '0.1',
					dividend: '0.88',
					yield: '2.18',
					last_trade_time: '2021-04-30T11:53:21.000Z',
					name: 'Tesla',
					marketStatus: 'noChange',
				},
				{
					ticker: 'GOOGL',
					exchange: 'NASDAQ',
					price: '10.08',
					change: '30.38',
					change_percent: '0.1',
					dividend: '0.88',
					yield: '2.18',
					last_trade_time: '2021-04-30T11:53:21.000Z',
					name: 'Google',
					marketStatus: 'down',
				},
			],
		};

		const result = tickersReducer(initialState, action);
		const actualTickers = result.tickers;

		expect(actualTickers).toHaveLength(2);

		expect(actualTickers[0]).toMatchObject(initialState.rawTickers[0]);
		expect(actualTickers[0].disabled).toBeFalsy();
		expect(actualTickers[0].marketStatus).toBe('up');

		expect(actualTickers[1]).toMatchObject(initialState.rawTickers[1]);
		expect(actualTickers[1].disabled).toBeFalsy();
		expect(actualTickers[1].marketStatus).toBe('down');
	});
});
