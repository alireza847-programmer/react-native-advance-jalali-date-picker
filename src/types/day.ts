import { Moment, MomentInput } from 'moment-jalaali';

export interface DayProps {
  day: number;
  month: number;
  year: number;
  onPressDay: (day: number) => void;
  selectedStartDate: Moment | null;
  selectedEndDate: Moment | null;
  allowRangeSelection: boolean;
  minDate: MomentInput;
  maxDate: MomentInput;
  enableDateChange: boolean;
  todayBackgroundColor?: string;
}
