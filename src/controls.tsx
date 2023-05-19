import React from 'react';
import { Image, Pressable, Text } from 'react-native';
import { HeaderControlsProps } from './types/headerControls';
import style from './style';

const HeaderControl = (props: HeaderControlsProps) => {
  const { label, onPress, reverse } = props;
  return (
    <Pressable
      style={[
        style.buttonControl,
        {
          flexDirection: reverse ? 'row-reverse' : 'row',
        },
      ]}
      onPress={onPress}
    >
      <Image
        style={[
          style.chevronLeft,
          reverse && {
            transform: [{ rotate: '-90deg' }],
          },
        ]}
        source={require('./assets/svgs/chevron.png')}
      />
      <Text style={style.labelControl}>{label}</Text>
    </Pressable>
  );
};

export default HeaderControl;
