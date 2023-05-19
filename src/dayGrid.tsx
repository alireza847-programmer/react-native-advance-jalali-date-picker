import React from 'react';
import {View} from 'react-native';
import {DayGridProps} from './types/dayGrid';
import {utils} from './utils';
import jMoment from 'moment-jalaali';
import style from './style';
import Day from './day';
import EmptyDay from './emptyDay';

const DayGrid = (props: DayGridProps) => {
  const {
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
  const totalDays: number = utils.getDaysInMonth(month, year);
  const firstDayOfMonth = jMoment.utc().jYear(year).jMonth(month).jDate(1);
  const firstWeekDay = (firstDayOfMonth.isoWeekday() + 1) % 7;
  const days = Array.apply(null, {length: totalDays}).map(Number.call, Number);
  const guideArray = [0, 1, 2, 3, 4, 5, 6];
  const startIndex = firstWeekDay;

  function renderColumns(i: number) {
    const column = guideArray.map(index => {
      if (i === 0) {
        // for first row, let's start showing the days on the correct weekday
        if (index >= startIndex) {
          if (days.length > 0) {
            const day = days.shift() + 1;
            return (
              <Day
                key={day}
                day={day}
                month={month}
                year={year}
                onPressDay={onPressDay}
                selectedStartDate={selectedStartDate}
                selectedEndDate={selectedEndDate}
                allowRangeSelection={allowRangeSelection}
                minDate={minDate}
                maxDate={maxDate}
                enableDateChange={enableDateChange}
                todayBackgroundColor={todayBackgroundColor}
              />
            );
          }
        } else {
          return <EmptyDay />;
        }
      } else {
        if (days.length > 0) {
          const day = days.shift() + 1;
          return (
            <Day
              key={day}
              day={day}
              month={month}
              year={year}
              onPressDay={onPressDay}
              selectedStartDate={selectedStartDate}
              selectedEndDate={selectedEndDate}
              allowRangeSelection={allowRangeSelection}
              minDate={minDate}
              maxDate={maxDate}
              enableDateChange={enableDateChange}
              todayBackgroundColor={todayBackgroundColor}
            />
          );
        }
      }
    });
    return column;
  }

  return (
    <View style={style.daysWrapper}>
      {guideArray.map(index => (
        <View key={index} style={style.weekRow}>
          {renderColumns(index)}
        </View>
      ))}
    </View>
  );
};

export default DayGrid;
