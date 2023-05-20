import React, { Fragment, useEffect, useState } from 'react';
import { View, Platform, UIManager, LayoutAnimation } from 'react-native';
import style from './style';
import { DatePickerProps } from './types';
import jMoment, { Moment } from 'moment-jalaali';
import { utils } from './utils';
import Header from './header';
import WeekDays from './weekdays';
import DayGrid from './dayGrid';
import DateSelector from './dateSelector';
import 'react-native-get-random-values';

const AdvanceJalaliDatePicker = (props: DatePickerProps) => {
  const {
    initialDate = jMoment.utc(),
    onDateChange = () => {},
    enableDateChange = true,
    onSelectorPress = () => {},
    onSelectorClose = () => {},
    allowRangeSelection,
    onMonthChange = () => {},
    customMonths,
    weekdays,
    maxDate,
    minDate,
    todayBackgroundColor,
  } = props;
  const [currentMonth, setCurrentMonth] = useState<number>(
    jMoment.utc(initialDate).jMonth()
  );
  const [currentYear, setCurrentYear] = useState<number>(
    jMoment.utc(initialDate).jYear()
  );
  const [visibleSelectMonthAndYearModal, setVisibleSelectMonthAndYearModal] =
    useState<boolean>(false);
  const [selectedStartDate, setSelectedStartDate] = useState<Moment | null>(
    props.selectedStartDate ? props.selectedStartDate : null
  );
  const [selectedEndDate, setSelectedEndDate] = useState<Moment | null>(
    props.selectedEndDate ? props.selectedEndDate : null
  );
  useEffect(() => {
    if (Platform.OS === 'android') {
      if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
      }
    }
  }, []);
  const onPressDay = (day: number) => {
    if (!enableDateChange) {
      return;
    }
    const date = jMoment
      .utc()
      .jYear(currentYear)
      .jMonth(currentMonth)
      .jDate(day);

    if (
      allowRangeSelection &&
      selectedStartDate &&
      date.isSameOrAfter(selectedStartDate) &&
      !selectedEndDate
    ) {
      setSelectedEndDate(date);
      // propagate to parent date has changed
      onDateChange(date, utils.END_DATE);
    } else {
      setSelectedStartDate(date);
      setSelectedEndDate(null);
      // propagate to parent date has changed
      onDateChange(date, utils.START_DATE);
    }
  };
  const OnPreviousMonth = () => {
    let previousMonth = currentMonth - 1;
    if (previousMonth < 0) {
      previousMonth = 11;
      setCurrentYear((year) => year - 1);
      setCurrentMonth(previousMonth);
    } else {
      setCurrentMonth(previousMonth);
      setCurrentYear((year) => year);
    }
    onMonthChange(
      jMoment.utc().jYear(currentYear).jMonth(currentMonth).jDate(1)
    );
  };

  const onNextMonth = () => {
    let nextMonth = currentMonth + 1;
    if (nextMonth > 11) {
      nextMonth = 0;
      setCurrentYear((year) => year + 1);
      setCurrentMonth(nextMonth);
    } else {
      setCurrentMonth(nextMonth);
      onMonthChange(
        jMoment.utc().jYear(currentYear).jMonth(currentMonth).jDate(1)
      );
    }
  };
  const onCurrentDatePress = () => {
    LayoutAnimation.configureNext({
      duration: 300,
      create: {
        type: LayoutAnimation.Types.easeInEaseOut,
        property: LayoutAnimation.Properties.opacity,
      },
      update: {
        type: LayoutAnimation.Types.easeInEaseOut,
      },
    });
    onSelectorPress();
    setVisibleSelectMonthAndYearModal(true);
  };
  const handleSelectorClose = () => {
    setVisibleSelectMonthAndYearModal(false);
    LayoutAnimation.configureNext({
      duration: 300,
      create: {
        type: LayoutAnimation.Types.easeInEaseOut,
        property: LayoutAnimation.Properties.opacity,
      },
      update: {
        type: LayoutAnimation.Types.easeInEaseOut,
      },
    });
    onSelectorClose();
  };
  const renderCalender = () => {
    if (visibleSelectMonthAndYearModal) {
      return (
        <DateSelector
          currentMonth={currentMonth}
          currentYear={currentYear}
          onYearPress={(year) => setCurrentYear(year)}
          onMonthPress={(month) => setCurrentMonth(month)}
          onClose={handleSelectorClose}
        />
      );
    }
    return (
      <Fragment>
        <Header
          currentMonth={currentMonth}
          currentYear={currentYear}
          onPressPrevious={OnPreviousMonth}
          onPressNext={onNextMonth}
          months={customMonths}
          onDatePress={onCurrentDatePress}
        />
        <WeekDays weekdays={weekdays} />
        <DayGrid
          enableDateChange={enableDateChange}
          onPressDay={onPressDay}
          month={currentMonth}
          year={currentYear}
          selectedStartDate={selectedStartDate}
          selectedEndDate={selectedEndDate}
          allowRangeSelection={allowRangeSelection}
          maxDate={maxDate}
          minDate={minDate}
          todayBackgroundColor={todayBackgroundColor}
        />
      </Fragment>
    );
  };
  return <View style={style.container}>{renderCalender()}</View>;
};

export default AdvanceJalaliDatePicker;
