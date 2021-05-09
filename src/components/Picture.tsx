import React, {FunctionComponent} from 'react';
import {Image, StyleSheet} from 'react-native';
import {IPictureProps} from '../models/props/IPicture';

export const Picture: FunctionComponent<IPictureProps> = ({
  image,
  width,
  height,
}: IPictureProps) => (
  <Image source={{uri: image}} style={{width, height, ...styles.image}} />
);

const styles = StyleSheet.create({
  image: {
    flexWrap: 'wrap',
    borderWidth: 1.5,
    borderColor: 'white',
  },
});
