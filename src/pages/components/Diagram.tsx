import * as React from 'react';
import {PieChart} from 'react-native-svg-charts';

interface IPieChart {
  key: number;
  amount: number;
  svg: {fill: string};
  arc: {padAngle: number};
}

const Diagram = () => {
  const data: IPieChart[] = [
    {
      key: 1,
      amount: 45,
      svg: {fill: '#818181'},
      arc: {padAngle: 0},
    },
    {
      key: 2,
      amount: 10,
      svg: {fill: '#ff0000'},
      arc: {padAngle: 0},
    },
    {
      key: 3,
      amount: 5,
      svg: {fill: '#810081'},
      arc: {padAngle: 0},
    },
    {
      key: 4,
      amount: 15,
      svg: {fill: '#ffff00'},
      arc: {padAngle: 0},
    },
    {
      key: 5,
      amount: 25,
      svg: {fill: '#9a6630'},
      arc: {padAngle: 0},
    },
  ];

  return (
    <PieChart
      data={data}
      innerRadius={'50%'}
      startAngle={-Math.PI * 1.73}
      valueAccessor={({item}) => item.amount}
      style={{
        height: 450,
        width: 450,
        marginTop: 100
      }}
    />
  );
};

export default Diagram;
