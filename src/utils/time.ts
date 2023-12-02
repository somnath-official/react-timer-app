import moment from 'moment';

export const getDurationFromSeconds = (seconds: number) => {
  const formatted = moment.utc(seconds*1000).format('mm:ss')
  return formatted
}