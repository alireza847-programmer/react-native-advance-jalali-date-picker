import {Moment} from 'moment-jalaali';

export interface DatePickerProps {
  initialDate?: Date;
  onDateChange: (date: Moment, type: string) => void;
  enableDateChange?: boolean;
  onSelectorPress?: () => void;
  onSelectorClose?: () => void;
  selectedStartDate?: Moment | null;
  selectedEndDate?: Moment | null;
  width?: number;
  height?: number;
  todayBackgroundColor?: string;
  allowRangeSelection: boolean;
  onMonthChange?: (date: Moment) => void;
  customMonths?: Array<string>;
  weekdays?: Array<string>;
  maxDate?: Moment;
  minDate?: Moment;
}
