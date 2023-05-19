import jMoment from 'moment-jalaali';
import {Dimensions} from 'react-native';

const width = Dimensions.get('screen').width / 100;
const height = Dimensions.get('screen').width / 100;

export const wp = (ratio: number) => {
  return width * ratio;
};

export const hp = (ratio: number) => {
  return height * ratio;
};

export const globalWidthMargin = wp(1);
export const globalHeightMargin = hp(0.5);

export const utils = {
  START_DATE: 'START_DATE',
  END_DATE: 'END_DATE',
  WEEKDAYS: ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'],
  MONTHS: [
    'فروردین',
    'اردیبهشت',
    'خرداد',
    'تیر',
    'مرداد',
    'شهریور',
    'مهر',
    'آبان',
    'آذر',
    'دی',
    'بهمن',
    'اسفند',
  ],
  MAX_ROWS: 7,
  MAX_COLUMNS: 7,
  getDaysInMonth: function (month: number, year: number): number {
    return jMoment.jDaysInMonth(year, month);
  },
};
