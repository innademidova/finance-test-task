import {
	Paper,
	styled,
	Switch,
	Table,
	TableBody,
	TableCell,
	tableCellClasses,
	TableContainer,
	TableHead,
	TableRow,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getTickers } from '../../store/tickers/selectors';
import { dateGenerator } from '../../common/helpers/dateGenerator';
import {
	toggleCheckedTickerAC,
	updateIntervalAC,
} from '../../store/tickers/actionCreators';
import Box from '@mui/material/Box';
import SelectInterval from '../../components/SelectInterval/SelectInterval';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		backgroundColor: theme.palette.common.black,
		color: theme.palette.common.white,
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: 14,
	},
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
	'&:nth-of-type(odd)': {
		backgroundColor: theme.palette.action.hover,
	},
	// hide last border
	'&:last-child td, &:last-child th': {
		border: 0,
	},
}));
const Dashboard = () => {
	const tickers = useAppSelector(getTickers);
	const dispatch = useAppDispatch();
	return (
		<>
			<SelectInterval />
			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 650 }} aria-label='simple table'>
					<TableHead>
						<StyledTableRow>
							<StyledTableCell align='center'>Ticker</StyledTableCell>
							<StyledTableCell align='center'>Exchange</StyledTableCell>
							<StyledTableCell align='center'>Price</StyledTableCell>
							<StyledTableCell align='center'>Change</StyledTableCell>
							<StyledTableCell align='center'>%</StyledTableCell>
							<StyledTableCell align='center'>Dividend</StyledTableCell>
							<StyledTableCell align='center'>Yield</StyledTableCell>
							<StyledTableCell align='center'>Last trade time</StyledTableCell>
						</StyledTableRow>
					</TableHead>
					<TableBody>
						{tickers.map((item, index) => (
							<StyledTableRow key={index} sx={{}}>
								<StyledTableCell component='th' scope='row'>
									<Switch
										onClick={() => dispatch(toggleCheckedTickerAC(item.ticker))}
										checked={!item.disabled}
										size='small'
									/>
									<Box
										sx={{
											fontSize: '1rem',
											fontWeight: 'bold',
											lineHeight: '1.5rem',
											padding: '0 8px',
											borderRadius: '8px',
											width: 'min-content',
											background: '#c5dcef',
										}}
									>
										{item.ticker}
									</Box>
									{item.name}
								</StyledTableCell>
								<StyledTableCell align='center'>
									{item.disabled ? 'disabled' : ''}
									{item.exchange}
								</StyledTableCell>
								<StyledTableCell align='center'>{item.price}</StyledTableCell>
								<StyledTableCell
									sx={{
										color: item.isIncrease ? '#137333' : 'red',
										fontWeight: 'bold',
									}}
									align='center'
								>
									{item.isIncrease ? '+' : '-'}
									{item.change}
								</StyledTableCell>
								<StyledTableCell
									sx={{
										fontSize: '1rem',
										fontWeight: 'bold',
										lineHeight: '1.5rem',
										padding: '0 8px',
										borderRadius: '8px',
										width: 'min-content',
										color: item.isIncrease ? '#137333' : '#a50e0e',
										background: item.isIncrease ? '#e6f4ea' : '#fce8e6',
									}}
									align='center'
								>
									{item.isIncrease ? '🠕' : '🠗'}
									{item.change_percent}%
								</StyledTableCell>
								<StyledTableCell align='center'>
									{item.dividend}
								</StyledTableCell>
								<StyledTableCell align='center'>{item.yield}</StyledTableCell>
								<StyledTableCell align='center'>
									{dateGenerator(item.last_trade_time)}
								</StyledTableCell>
							</StyledTableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</>
	);
};

export default Dashboard;
