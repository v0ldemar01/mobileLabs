import * as React from 'react';
import {PieChart, PieChartData} from 'react-native-svg-charts';

interface IPieChartData {
  key: number;
  amount: number;
  svg: {fill: string};
  arc: {padAngle: number};
}

interface IDiagramProps {
  width: number;
  height: number;
  marginTop: number;
}

const Diagram = ({width, height, marginTop}: IDiagramProps) => {
  const data: IPieChartData[] = [
    {
      key: 1,
      amount: 5,
      svg: {fill: '#9a6630'},
      arc: {padAngle: 0},
    },
    {
      key: 2,
      amount: 5,
      svg: {fill: '#00ffff'},
      arc: {padAngle: 0},
    },
    {
      key: 3,
      amount: 10,
      svg: {fill: '#ff8100'},
      arc: {padAngle: 0},
    },
    {
      key: 4,
      amount: 80,
      svg: {fill: '#0000ff'},
      arc: {padAngle: 0},
    },
  ];

  return (
    <PieChart
      data={data as PieChartData[]}
      innerRadius={'50%'}
      startAngle={-Math.PI * 1.5}
      valueAccessor={({item}) => item.amount}
      style={{
        height,
        width,
        marginTop,
      }}
    />
  );
};

export default Diagram;
