import React, {FunctionComponent} from 'react';
import {StyleSheet, ActivityIndicator, View} from 'react-native';
import {Image} from 'react-native-elements';
import {IPictureProps} from '../../models/props/IPicture';

export const Picture: FunctionComponent<IPictureProps> = ({
  image,
  width,
  height,
}: IPictureProps) => (
  <Image
    source={{uri: image}}
    style={{width, height, ...styles.image}}
    PlaceholderContent={
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
    }
  />
);

const styles = StyleSheet.create({
  image: {
    flexWrap: 'wrap',
    borderWidth: 1.5,
    borderColor: 'white',
  },
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
