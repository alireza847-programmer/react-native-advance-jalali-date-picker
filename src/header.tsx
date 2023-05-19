import React from 'react';
import {View, Text, Pressable, Image} from 'react-native';
import style from './style';
import {HeaderProps} from './types/header';
import {utils} from './utils';
import HeaderControl from './controls';

const Header = (props: HeaderProps) => {
  const {
    currentMonth,
    currentYear,
    onPressNext,
    onPressPrevious,
    months,
    onDatePress,
  } = props;
  const MONTHS = months ? months : utils.MONTHS;
  const renderPrevIndex = () => {
    if (currentMonth - 1 === -1) {
      return MONTHS.length - 1;
    }
    return currentMonth - 1;
  };
  const renderNextIndex = () => {
    if (currentMonth + 1 > MONTHS.length - 1) {
      return 0;
    }
    return currentMonth + 1;
  };
  const previous = utils.MONTHS[renderPrevIndex()];
  const next = utils.MONTHS[renderNextIndex()];
  const month = MONTHS[currentMonth];
  const year = currentYear;

  return (
    <View style={style.headerWrapper}>
      <HeaderControl label={next} reverse={false} onPress={onPressNext} />
      <Pressable style={style.currentDateButton} onPress={onDatePress}>
        <Image
          style={style.chevronDown}
          source={require('../assets/svgs/chevron.png')}
        />
        <Text style={style.monthLabel}>{year} </Text>
        <Text style={style.monthLabel}>{month}</Text>
      </Pressable>
      <HeaderControl
        label={previous}
        reverse={true}
        onPress={onPressPrevious}
      />
    </View>
  );
};

export default Header;
