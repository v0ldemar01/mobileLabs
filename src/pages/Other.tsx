import React from 'react';
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState,
} from 'react-navigation';
import { Text, View, Button, StyleSheet  } from 'react-native';

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

export const Other = ({ navigation }: Props) => {
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.titleText}>Other Page!{'\n'}</Text>      
      <Button
        title="Go to Home Page"
        onPress={() => navigation.navigate('Home')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  titleText: {
    fontSize: 20    
  }
});