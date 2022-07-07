import moment from 'moment';

export const dateGenerator = (date: string) => {
	return moment(date).fromNow();
};
