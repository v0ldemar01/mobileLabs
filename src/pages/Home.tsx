import React, {useState} from 'react';
import {Text, View, Image, StyleSheet, Button, Dimensions} from 'react-native';
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState,
} from 'react-navigation';

const styles = StyleSheet.create({
  ContainerPortrait: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ContainerLandscape: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    maxHeight: 200,
    resizeMode: 'contain',
  },
  titleText: {
    fontSize: 20,
    textAlign: 'center',
  },
});

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

export const Home = ({navigation}: Props) => {
  const [orientation, setOrientation] = useState('portrate');
  const onLayout = () => {
    const {width, height} = Dimensions.get('window');
    if (height > width) {
      setOrientation('portrate');
    } else {
      setOrientation('landscape');
    }
    console.log(width, height);
  };
  return (
    <View
      style={
        orientation === 'portrate'
          ? styles.ContainerPortrait
          : styles.ContainerLandscape
      }
      onLayout={onLayout}>
      <Image
        style={styles.imageContainer}
        source={require('../../assets/kpi.png')}
      />
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
