import React, {FunctionComponent} from 'react';
import {Text, View, Image, StyleSheet, Button} from 'react-native';
import {INavigationProps} from '../models/props/INavigationProps';

export const Home: FunctionComponent<INavigationProps> = ({
  navigation,
}: INavigationProps) => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.imageContainer}
        source={require('../../assets/appImages/kpi.png')}
      />
      <View style={styles.padding} />
      <Text style={styles.titleText}>
        Volodymyr Minchenko{'\n'}
        Group IP-83{'\n'}
        Zalikovka IP-8315{'\n'}
      </Text>
      <Button
        title="Go to Graw Page"
        onPress={() => navigation.navigate('Draw')}
        color="#f194ff"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    maxHeight: 160,
    resizeMode: 'contain',
  },
  padding: {
    padding: 5,
  },
  titleText: {
    fontSize: 16,
    textAlign: 'center',
  },
});
