export interface HeaderProps {
  currentMonth: number;
  currentYear: number;
  onPressNext: () => void;
  onPressPrevious: () => void;
  months?: Array<string>;
  onDatePress: () => void;
}
