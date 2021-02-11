import React from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center'    
  },
  imageContainer: {    
    maxHeight: 200,    
    resizeMode: 'contain'
  },
  titleText: {
    fontSize: 20,
    textAlign: 'center'
  }
});

export const Home = () => {
  return (
    <View style={styles.mainContainer}>
      <Image 
        style={styles.imageContainer}
        source={require('../../assets/kpi.png')}/
      >
      <Text style={styles.titleText}>
        Volodymyr Minchenko{`\n`}
        Group IP-83{`\n`}
        Zalikovka IP-8315
      </Text>
    </View>
  );
};

