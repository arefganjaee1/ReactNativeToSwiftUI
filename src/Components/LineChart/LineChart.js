import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import styles from './style';
import Images from '../../Theme/Images';
import CONSTANTS from '../../Values/Constants';
import { Colors } from '../../Theme';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';

const CustomLineChart = ({
  style,
  onTabbarPress,
  title1,
  title2,
  title3,
  title4,
}) => {
  const {} = Images;
  const {} = CONSTANTS.Routes;

  const [item, setItem] = useState(1);
  const setTabbar = (item) => {
    onTabbarPress(item);
    setItem(item);
  };

  return (
    <View
      style={{
        height: 340,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <LineChart
        showMonthLabels={true}
        data={{
          labels: ['10:00', '11:00', '12:00', '13:00', '14:00'],
          datasets: [
            {
              data: [25, 35, 30, 40, 50, 30],
            },
          ],
        }}
        width={Dimensions.get('window').width - 20} // from react-native
        height={300}
        yAxisSuffix=""
        yAxisInterval={1} // optional, defaults to 1
        withVerticalLines={true}
        withHorizontalLines={false}
        onDataPointClick={() => {
          console.log('hi');
        }}
        chartConfig={{
          backgroundColor: 'black',
          backgroundGradientFrom: 'black',
          backgroundGradientTo: 'black',
          decimalPlaces: 0, // optional, defaults to 2dp
          color: (opacity = 1) => Colors.orange,
          labelColor: (opacity = 1) => Colors.orange,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: '6',
            strokeWidth: '4',
            stroke: Colors.lightOrange,
          },
        }}
        bezier
        style={{
          marginVertical: 20,
          borderRadius: 16,
        }}
      />
    </View>
  );
};

export default CustomLineChart;
