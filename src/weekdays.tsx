import React from 'react';
import {Text, View} from 'react-native';
import {utils} from './utils';
import {WeekDaysProps} from './types/weekDays';
import style from './style';

const WeekDays = (props: WeekDaysProps) => {
  const {weekdays} = props;
  let wd = weekdays;
  if (!wd) {
    wd = utils.WEEKDAYS;
  }
  const renderWeekDays = () => {
    return wd.map((day, key) => {
      return (
        <Text key={key} style={[style.dayLabels]}>
          {day}
        </Text>
      );
    });
  };
  return <View style={style.dayLabelsWrapper}>{renderWeekDays()}</View>;
};

export default WeekDays;
