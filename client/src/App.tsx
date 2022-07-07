import * as React from 'react';
import { useEffect, useState } from 'react';
import Dashboard from './pages/Dashboard/Dashboard';
import { Ticker } from './common/models/ticker';
import { useAppDispatch, useAppSelector } from './hooks';
import { setRawTickersAC, syncTickersAC } from './store/tickers/actionCreators';
import MenuAppBar from './components/MenuAppBar/MenuAppBar';
import { getInterval } from './store/tickers/selectors';
import socketService from './services/socketService';

const App: React.FC = () => {
	const dispatch = useAppDispatch();
	const intervalMilliseconds = useAppSelector(getInterval);
	const connectSocket = async () => {
		await socketService.connect();
		socketService.start();
		let isFirstTick = true;
		socketService.onGetTickers((res: Ticker[]) => {
			dispatch(setRawTickersAC(res));

			if (isFirstTick) {
				dispatch(syncTickersAC());
				isFirstTick = false;
			}
		});
	};

	useEffect(() => {
		(async () => {
			try {
				await connectSocket();
			} catch (err) {
				alert('Could not connect. Please refresh page');
			}
		})();
	}, []);

	const [intervalId, setIntervalId] = useState<NodeJS.Timer | undefined>(
		undefined
	);
	useEffect(() => {
		if (intervalId) {
			clearInterval(intervalId);
		}
		const interval = setInterval(() => {
			dispatch(syncTickersAC());
		}, intervalMilliseconds);
		setIntervalId(interval);
	}, [intervalMilliseconds]);

	return (
		<div>
			<MenuAppBar />
			<Dashboard />
		</div>
	);
};

export default App;
