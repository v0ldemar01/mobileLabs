import * as React from 'react';
import {View} from 'react-native';
import {Svg, Polyline, Line} from 'react-native-svg';
import {Point} from 'react-native-svg/lib/typescript/elements/Shape';

interface IPoint {
  x: number;
  y: number;
}

const getLimitValues = (points: IPoint[]) => {
  let limitX: number = 0;
  let limitY: number = 0;
  points.map(({x, y}) => {
    const absX = Math.abs(x);
    const absY = Math.abs(y);
    limitX = limitX < absX ? absX : limitX;
    limitY = limitY < absY ? absX : limitY;
  });
  return {limitX, limitY};
};

const formatFunctionPointsSVG = (
  points: IPoint[],
  startX: number,
  startY: number,
  limitX: number,
  limitY: number,
) => {
  return points.reduce(
    (acc, {x, y}) => (acc += `${x * limitX + startX},${-y * limitY + startY} `),
    '',
  );
};

const formatSpecialNodes = (
  points: IPoint[],
  startX: number,
  startY: number,
  limitX: number,
  limitY: number,
) =>
  points.map(({x, y}) => ({x: -x * limitX + startX, y: y * limitY + startY}));

interface LineChartProps {
  nodes: IPoint[];
  width: number;
  height: number;
}

const LineChartLocal = ({nodes, width, height}: LineChartProps) => {
  const startY = height / 2;
  const startX = width / 2;
  const {limitX, limitY} = getLimitValues(nodes);
  const scaleX = -startX / limitX;
  const scaleY = -startY / limitY;
  const nodesSvg = formatFunctionPointsSVG(
    nodes,
    startX,
    startY,
    scaleX,
    scaleY,
  );
  const specialNodesX: IPoint[] = [
    {x: 1, y: 0.125},
    {x: 1, y: -0.125},
  ];

  const specialNodesY: IPoint[] = [
    {x: -0.125, y: 1},
    {x: 0.125, y: 1},
  ];

  const specialNodesArrowX: IPoint[] = [
    {x: limitX, y: 0},
    {x: limitX - 0.25, y: -0.125},
    {x: limitX - 0.25, y: 0.125},
  ];

  const specialNodesArrowY: IPoint[] = [
    {x: 0, y: limitY},
    {x: -0.125, y: limitY - 0.25},
    {x: 0.125, y: limitY - 0.25},
  ];

  const specialSvgX = formatSpecialNodes(
    specialNodesX,
    startX,
    startY,
    scaleX,
    scaleY,
  );

  const specialSvgY = formatSpecialNodes(
    specialNodesY,
    startX,
    startY,
    scaleX,
    scaleY,
  );

  const specialArrowX = formatSpecialNodes(
    specialNodesArrowX,
    startX,
    startY,
    scaleX,
    scaleY,
  );

  const specialArrowY = formatSpecialNodes(
    specialNodesArrowY,
    startX,
    startY,
    scaleX,
    scaleY,
  );

  return (
    <Svg height={height} width={width}>
      <Line
        x1={startX}
        y1={0}
        x2={startX}
        y2={height}
        stroke="black"
        strokeWidth="2"
      />
      <Line
        x1={0}
        y1={startY}
        x2={width}
        y2={startY}
        stroke="black"
        strokeWidth="2"
      />
      <Line
        x1={specialSvgX[0].x}
        y1={specialSvgX[0].y}
        x2={specialSvgX[1].x}
        y2={specialSvgX[1].y}
        stroke="black"
        strokeWidth="2"
      />
      <Line
        x1={specialSvgY[0].x}
        y1={specialSvgY[0].y}
        x2={specialSvgY[1].x}
        y2={specialSvgY[1].y}
        stroke="black"
        strokeWidth="2"
      />

      <Line
        x1={specialArrowX[0].x}
        y1={specialArrowX[0].y}
        x2={specialArrowX[1].x}
        y2={specialArrowX[1].y}
        stroke="black"
        strokeWidth="2"
      />

      <Line
        x1={specialArrowX[0].x}
        y1={specialArrowX[0].y}
        x2={specialArrowX[2].x}
        y2={specialArrowX[2].y}
        stroke="black"
        strokeWidth="2"
      />

      <Line
        x1={specialArrowY[0].x}
        y1={specialArrowY[0].y}
        x2={specialArrowY[1].x}
        y2={specialArrowY[1].y}
        stroke="black"
        strokeWidth="2"
      />

      <Line
        x1={specialArrowY[0].x}
        y1={specialArrowY[0].y}
        x2={specialArrowY[2].x}
        y2={specialArrowY[2].y}
        stroke="black"
        strokeWidth="2"
      />
      <Polyline points={nodesSvg} fill="none" stroke="blue" strokeWidth="2" />
    </Svg>
  );
};

const getNodes = (
  myFunction: Function,
  min: number,
  max: number,
  interval: number = 0.01,
): Point[] => {
  const points = [];
  for (let x = min; x <= max; x += interval) {
    const y = myFunction(x);
    points.push({x, y});
  }
  return points;
};

interface IPlotProps {
  min: number;
  max: number;
  width: number;
  height: number;
}

export const Plot = ({min, max, width, height}: IPlotProps) => {
  const myFunction = (x: number) => Math.pow(x, 3);
  const nodes = getNodes(myFunction, min, max);

  return (
    <View
      style={{
        height: 400,
        width: 400,
        marginTop: 100,
      }}>
      <LineChartLocal nodes={nodes} width={width} height={height} />
    </View>
  );
};
