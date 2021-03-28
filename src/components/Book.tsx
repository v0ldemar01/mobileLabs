import * as React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import IBook from '../models/IBook';
import {BooksImages} from '../../assets/images';

const styles = StyleSheet.create({
  container: {
    width: '95%',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingRight: 65,
    paddingLeft: 15,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#c0c',
  },
  textContainer: {
    display: 'flex',
    flexShrink: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    marginLeft: 10,
  },
  title: {
    fontSize: 16,
  },
  subtitle: {
    fontStyle: 'italic',
  },
  price: {
    fontWeight: 'bold',
  },
  image: {
    height: 100,
    width: 100,
  },
});

export const Book = ({title, subtitle, price, image}: IBook) => {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={BooksImages[image]} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
        <Text style={styles.price}>{price}</Text>
      </View>
    </View>
  );
};
