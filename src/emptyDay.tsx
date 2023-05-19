import React from 'react';
import style from './style';
import {View} from 'react-native';

const EmptyDay = () => {
  return (
    <View style={[style.dayWrapper]}>
      <View style={style.dayButton} />
    </View>
  );
};

export default EmptyDay;
