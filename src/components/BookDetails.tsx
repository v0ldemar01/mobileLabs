import * as React from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {BooksImages} from '../../assets/images';
import {bookDetails} from '../../assets/books';

export const BookDetails = ({route}: any) => {
  const {isbn13} = route.params;
  const currentBook = bookDetails[isbn13] ?? {};
  const {
    title,
    subtitle,
    authors,
    publisher,
    pages,
    year,
    rating,
    desc,
    price,
    image,
  } = currentBook;
  const img = BooksImages[image];
  return (
    <SafeAreaView>
      <ScrollView style={image ? styles.allContainer : styles.textContainer}>
        {image ? (
          <View style={styles.container}>
            <Image style={styles.image} source={img} />
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
            <Text style={styles.textCaption}>Price:</Text>
            {` ${price ?? ''}`}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
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
});
