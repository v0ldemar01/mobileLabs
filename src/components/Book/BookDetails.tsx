import React, {useEffect, useState} from 'react';
import {ActivityIndicator} from 'react-native';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {getBookByIsbn13} from '../../api/books';
import bookAboutRepository from '../../data/repositories/BookAboutRepository';
import {IBookAbout} from '../../models/IBook';

export const BookDetails = ({route}: any) => {
  const {about, isbn13} = route.params;
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [currentBook, setCurrentBook] = useState<IBookAbout>({} as IBookAbout);

  useEffect(() => {
    setLoading(true);
    getBookByIsbn13(isbn13)
      .then((book) => {
        setLoading(false);
        setCurrentBook(book);
      })
      .catch(() => {
        setError('Can`t get data from network(');
        bookAboutRepository
          .getBookAboutById(about)
          .then((book) => {
            setError('');
            setCurrentBook(book);
          })
          .catch(() => {
            setCurrentBook({} as IBookAbout);
            setError('Can`t get data from database(');
          })
          .finally(() => {
            setLoading(false);
          });
      });
  }, [isbn13, about]);
  const {
    authors,
    desc,
    image,
    language,
    pages,
    price,
    publisher,
    rating,
    subtitle,
    title,
    url,
    year,
  } = currentBook ?? {};

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#00ff00" />
      ) : error ? (
        <Text style={styles.noText}>{error}</Text>
      ) : (
        <ScrollView style={image ? styles.allContainer : styles.textContainer}>
          {image ? (
            <View style={styles.imageContainer}>
              <Image style={styles.image} source={{uri: image}} />
            </View>
          ) : null}
          <View style={styles.textGroup}>
            <Text style={styles.textElement}>
              <Text style={styles.textCaption}>Title:</Text>
              {` ${title ?? ''}`}
            </Text>
            <Text style={styles.textElement}>
              <Text style={styles.textCaption}>Subtitle:</Text>
              {` ${subtitle ?? ''}`}
            </Text>
            <Text style={styles.textElement}>
              <Text style={styles.textCaption}>Desc:</Text>
              {` ${desc ?? ''}`}
            </Text>
            <Text style={styles.textElement}>
              <Text style={styles.textCaption}>Authors:</Text>
              {` ${authors ?? ''}`}
            </Text>
            <Text style={styles.textElement}>
              <Text style={styles.textCaption}>Publisher:</Text>
              {` ${publisher ?? ''}`}
            </Text>
            <Text style={styles.textElement}>
              <Text style={styles.textCaption}>Pages:</Text>
              {` ${pages ?? ''}`}
            </Text>
            <Text style={styles.textElement}>
              <Text style={styles.textCaption}>Year:</Text>
              {` ${year ?? ''}`}
            </Text>
            <Text style={styles.textElement}>
              <Text style={styles.textCaption}>Rating:</Text>
              {` ${rating ?? ''}`}
            </Text>
            <Text style={styles.textElement}>
              <Text style={styles.textCaption}>Language:</Text>
              {` ${language ?? ''}`}
            </Text>
            <Text style={styles.textElement}>
              <Text style={styles.textCaption}>Price:</Text>
              {` ${price ?? ''}`}
            </Text>
            <Text style={styles.textElement}>
              <Text style={styles.textCaption}>Url:</Text>
              {` ${url ?? ''}`}
            </Text>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f4f4f4',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    alignItems: 'center',
  },
  textCaption: {
    fontWeight: 'bold',
    color: 'red',
  },
  textElement: {
    paddingVertical: 2,
  },
  textGroup: {
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
  image: {
    height: 300,
    width: 300,
  },
  textContainer: {
    marginVertical: 20,
  },
  allContainer: {
    marginVertical: 5,
  },
  noText: {
    fontSize: 20,
    color: 'red',
  },
});
