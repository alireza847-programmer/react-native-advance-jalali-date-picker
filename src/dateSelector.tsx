import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { DateSelectorProps } from './types/dateSelector';
import style, { fonts } from './style';
import jMoment from 'moment-jalaali';
import LinearGradient from 'react-native-linear-gradient';
import { utils } from './utils';

const DateSelector = (props: DateSelectorProps) => {
  const { currentMonth, currentYear, onYearPress, onClose, onMonthPress } =
    props;

  const renderYearSelector = () => {
    const year = jMoment().utc().jYear();
    const startingYearValue = year - 101;
    const endingYearValue = year;
    const allYears: number[] = [];
    for (let i = endingYearValue; i >= startingYearValue; i -= 1) {
      allYears.push(i);
    }
    const renderYears = () => {
      return allYears.map((item) => {
        return (
          <TouchableOpacity
            key={item}
            onPress={() => onYearPress(item)}
            style={[
              style.yearItem,
              {
                backgroundColor:
                  currentYear === item ? '#62CCF5' : 'transparent',
              },
            ]}
          >
            <Text
              style={[
                style.yearLabel,
                {
                  color: currentYear === item ? 'white' : 'black',
                  fontFamily: currentYear === item ? fonts.bold : fonts.regular,
                },
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        );
      });
    };
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={style.yearSelectorScrollViewContainer}
        style={style.yearSelectorScrollView}
      >
        {renderYears()}
      </ScrollView>
    );
  };

  const renderMonthSelector = () => {
    const renderMonths = () => {
      return utils.MONTHS.map((item, index) => {
        return (
          <TouchableOpacity
            key={item}
            onPress={() => onMonthPress(index)}
            style={[
              style.yearItem,
              {
                backgroundColor:
                  currentMonth === index ? '#62CCF5' : 'transparent',
              },
            ]}
          >
            <Text
              style={[
                style.yearLabel,
                {
                  color: currentMonth === index ? 'white' : 'black',
                  fontFamily:
                    currentMonth === index ? fonts.bold : fonts.regular,
                },
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        );
      });
    };
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={style.yearSelectorScrollViewContainer}
        style={style.yearSelectorScrollView}
      >
        {renderMonths()}
      </ScrollView>
    );
  };

  return (
    <View style={style.selector}>
      {/* Month And Yeras Label */}
      <View style={style.selectorRow}>
        <Text style={style.selectorLabel}>سال</Text>
        <Text style={style.selectorLabel}>ماه</Text>
      </View>

      <View style={style.listContainer}>
        {renderYearSelector()}
        <LinearGradient
          style={style.yearGradint}
          colors={['#F7F8FA00', '#F7F8FAF3', '#F7F8FA']}
        />
        <View style={style.selectorDevider} />
        {renderMonthSelector()}
      </View>

      <View style={[style.selectorButtonContainer]}>
        <TouchableOpacity style={style.selectorButton} onPress={onClose}>
          <Text style={style.selectorButtonText}>تأیید</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DateSelector;
