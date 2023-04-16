import moment from 'moment';

export const formatDate = (date: string | Date, toFormat: string = 'YYYY/MM/DD') => {
  if (date) {
    return moment.utc(date).format(toFormat);
  }
  return '';
};

export const formatTime = (date: string | Date, toFormat: string = 'HH:mm') => {
  if (date) {
    return moment.utc(date).format(toFormat);
  }

  return '';
};

export const formatDateTime = (
  date: string | Date,
  toFormat: string = 'YYYY/MM/DD HH:mm',
) => {
  if (date) {
    return moment.utc(date).format(toFormat);
  }

  return '';
};
