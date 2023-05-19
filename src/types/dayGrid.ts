import { Moment } from 'moment-jalaali';

export interface DayGridProps {
  month: number;
  year: number;
  onPressDay: (day: number) => void;
  selectedStartDate: Moment | null;
  selectedEndDate: Moment | null;
  allowRangeSelection: boolean;
  minDate?: Moment;
  maxDate?: Moment;
  enableDateChange: boolean;
  todayBackgroundColor?: string;
}
