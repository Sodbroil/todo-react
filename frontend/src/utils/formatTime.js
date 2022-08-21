import { format, formatDistanceToNow } from 'date-fns';
import { ru } from 'date-fns/locale'

// ----------------------------------------------------------------------

const options = {
	year: 'numeric',
	month: 'numeric',
	day: 'numeric',
	timezone: 'UTC'
}

export function fDate(date) {
	return format(new Date(date), 'dd MMMM yyyy', {locale: ru});
}

export function fDateTime(date) {
	return format(new Date(date), 'dd MMM yyyy HH:mm', {locale: ru});
}

export function fDateTimeSuffix(date) {
	return format(new Date(date), 'dd/MM/yyyy hh:mm p', {locale: ru});
}

export function fToNow(date) {
	return formatDistanceToNow(new Date(date), {
		addSuffix: true,
	});
}
