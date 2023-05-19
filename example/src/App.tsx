import * as React from 'react';

import { StyleSheet, View } from 'react-native';
import AdvanceJalaliDatePicker from 'react-native-advance-jalali-date-picker';

export default function App() {


  return (
    <View style={styles.container}>
      <AdvanceJalaliDatePicker allowRangeSelection={true} onDateChange={(date , type) =>  {}} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
