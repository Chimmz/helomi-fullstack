export const dateTimeFormat = (timestamp, options) => {
   return new Intl.DateTimeFormat(window.navigator.language, options)
      .format(timestamp)
      .replace(' ', '');
};

export const getDaysPassed = (date1, date2) => {
   return (date2.getTime() - date1.getTime()) / (1000 * 60 * 60 * 24);
};

export const getMsgSentTime = timestamp => {
   const formatOptions = { hour: 'numeric', hour12: true, minute: 'numeric' };
   const numDaysPassed = getDaysPassed(new Date(timestamp), new Date());
   if (numDaysPassed < 1) return dateTimeFormat(timestamp, formatOptions);
   if (numDaysPassed === 1)
      return ['Yesterday', dateTimeFormat(timestamp, formatOptions)].join(', ');
   formatOptions.day = 'numeric';
   formatOptions.weekday = 'short';
   formatOptions.month = 'long';
   formatOptions.year = '2-digit';
   return dateTimeFormat(timestamp);
};
