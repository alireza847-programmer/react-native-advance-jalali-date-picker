import React from 'react';
import {
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { DayProps } from './types/day';
import jMoment from 'moment-jalaali';
import style from './style';

const Day = (props: DayProps) => {
  const {
    day,
    month,
    year,
    onPressDay,
    selectedStartDate,
    selectedEndDate,
    allowRangeSelection,
    minDate,
    maxDate,
    enableDateChange,
    todayBackgroundColor,
  } = props;
  const thisDay = jMoment.utc().jYear(year).jMonth(month).jDate(day);
  const today = jMoment();

  let dateOutOfRange;
  let daySelectedStyle: ViewStyle | ViewStyle[] = style.dayButton; // may be overridden depending on state
  let selectedDayColorStyle: TextStyle | TextStyle[] = {};
  let propSelectedDayStyle: ViewStyle | ViewStyle[] = {};
  let dateIsBeforeMin = false;
  let dateIsAfterMax = false;
  let dateIsDisabled = false;
  let dateIsBeforeMinDuration = false;
  let dateIsAfterMaxDuration = false;
  let customTextStyle: TextStyle | TextStyle[] = {};

  if (maxDate) {
    dateIsAfterMax = thisDay.isAfter(maxDate, 'day');
  }
  if (minDate) {
    dateIsBeforeMin = thisDay.isBefore(minDate, 'day');
  }

  dateOutOfRange =
    dateIsAfterMax ||
    dateIsBeforeMin ||
    dateIsDisabled ||
    dateIsBeforeMinDuration ||
    dateIsAfterMaxDuration;

  if (!dateOutOfRange) {
    let isToday = thisDay.isSame(today, 'day');
    if (isToday) {
      daySelectedStyle = [
        style.selectedToday,
        {
          backgroundColor: todayBackgroundColor
            ? todayBackgroundColor
            : '#14151A0D',
        },
      ];
      selectedDayColorStyle = style.selectedDayLabel;
    }
    let isThisDaySameAsSelectedStart = thisDay.isSame(selectedStartDate, 'day');
    let isThisDaySameAsSelectedEnd = thisDay.isSame(selectedEndDate, 'day');

    if (
      !allowRangeSelection &&
      selectedStartDate &&
      isThisDaySameAsSelectedStart
    ) {
      daySelectedStyle = style.selectedDatePicker;
      selectedDayColorStyle = [style.selectedDatePickerDayLabel];
      propSelectedDayStyle = style.selectedDayBackground;
    }

    // Set selected ranges styles
    if (allowRangeSelection) {
      if (selectedStartDate && selectedEndDate) {
        // Apply style for start date
        if (isThisDaySameAsSelectedStart) {
          daySelectedStyle = [style.startDayWrapper];
          selectedDayColorStyle = [
            style.selectedDayLabel,
            style.startAndEndLabel,
          ];
        }
        // Apply style for end date
        if (isThisDaySameAsSelectedEnd) {
          daySelectedStyle = [style.endDayWrapper];
          selectedDayColorStyle = [
            style.selectedDayLabel,
            style.startAndEndLabel,
          ];
        }
        // Apply style if start date is the same as end date
        if (
          isThisDaySameAsSelectedEnd &&
          isThisDaySameAsSelectedStart &&
          selectedEndDate.isSame(selectedStartDate, 'day')
        ) {
          selectedDayColorStyle = style.selectedSameDay;
        }
        // Apply style if this day is in range
        if (thisDay.isBetween(selectedStartDate, selectedEndDate, 'day')) {
          daySelectedStyle = [style.inRangeDay];
          selectedDayColorStyle = [style.selectedDayLabel];
        }
      }
      // Apply style if start date has been selected but end date has not
      if (
        selectedStartDate &&
        !selectedEndDate &&
        isThisDaySameAsSelectedStart
      ) {
        daySelectedStyle = [style.startDayWrapper];
        selectedDayColorStyle = [
          style.selectedDayLabel,
          style.startAndEndLabel,
        ];
      }
    }
    return (
      <View style={style.dayWrapper}>
        <TouchableOpacity
          disabled={!enableDateChange}
          style={[daySelectedStyle, propSelectedDayStyle]}
          onPress={() => onPressDay(day)}
        >
          <Text
            style={[style.dayLabel, customTextStyle, selectedDayColorStyle]}
          >
            {day}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={style.dayWrapper}>
      <Text style={[style.disabledText]}>{day}</Text>
    </View>
  );
};

export default Day;
