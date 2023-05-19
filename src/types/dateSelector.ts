export interface DateSelectorProps {
  currentYear: number;
  currentMonth: number;
  onYearPress: (year: number) => void;
  onMonthPress: (month: number) => void;
  onClose: () => void;
}
