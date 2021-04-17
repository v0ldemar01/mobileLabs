import React from 'react';
import {Text, View, Image, StyleSheet, Button} from 'react-native';
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState,
} from 'react-navigation';

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

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

export const Home = ({navigation}: Props) => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.imageContainer}
        source={require('../../assets/kpi.png')}
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
