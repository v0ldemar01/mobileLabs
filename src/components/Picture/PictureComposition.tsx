import React, {FunctionComponent, useState} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {IPictureCompositionProps} from '../../models/props/IPictureComposition';
import {Picture} from './Picture';
import uuid from 'react-native-uuid';

interface IImagePosition {
  [propName: string]: any[];
}

interface IImagePositionIndex {
  [propName: string]: number[];
}

const imagePositionIndex: IImagePositionIndex = {
  left: [1, 4, 6],
  center: [2],
  right: [3, 5, 7],
};

const minImageSize = 1;
const maxImageSize = 3;

export const PictureComposition: FunctionComponent<IPictureCompositionProps> = ({
  pictures,
}: IPictureCompositionProps) => {
  const [width, setWidth] = useState<number>(0);
  const [, setOrientation] = useState<'portrate' | 'landscape'>('portrate');
  const onLayout = () => {
    const {width: wth, height} = Dimensions.get('window');
    if (height > wth) {
      setOrientation('portrate');
    } else {
      setOrientation('landscape');
    }
    setWidth(wth);
  };

  const minWidth = width / (2 * minImageSize + maxImageSize);
  const imagePosition = {
    left: [],
    center: [],
    right: [],
  } as IImagePosition;
  pictures.forEach((picture: string, index: number) => {
    const positionIndex = Object.entries(imagePositionIndex).find(
      ([, value]) => {
        if (value.includes(index + 1)) {
          return true;
        }
        return false;
      },
    );
    if (!positionIndex) {
      return;
    }
    const position = positionIndex[0];
    const imgSize =
      position === 'center' ? minWidth * maxImageSize : minWidth * minImageSize;
    imagePosition[position as string].push(
      <Picture
        key={uuid.v4() as string}
        image={picture}
        width={imgSize}
        height={imgSize}
      />,
    );
  });
  return (
    <View style={styles.container} onLayout={onLayout}>
      {Object.values(imagePosition).map((picturePosition) => (
        <View key={uuid.v4() as string} style={styles.column}>
          {picturePosition.map((e) => e)}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  column: {
    flexDirection: 'column',
  },
});
