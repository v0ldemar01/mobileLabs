import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, View, Text, FlatList} from 'react-native';
import {SwipeableBook} from './Book';
import {SearchBar} from 'react-native-elements';
import {IBookListProps} from '../models/props/IBookList';
import IBook from '../models/IBook';

export const BookList = ({books, deleteBook, onPressBook}: IBookListProps) => {
  const [search, setSearch] = useState<string>('');
  return (
    <SafeAreaView style={styles.container}>
      <SearchBar
        onChangeText={setSearch}
        value={search}
        placeholder="Enter title"
        platform="android"
        underlineColorAndroid="blue"
      />
      <FlatList
        data={books.filter(({title}: IBook) =>
          title.toLowerCase().includes(search.toLowerCase()),
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={({item}) => (
          <SwipeableBook
            item={item}
            onPress={() => onPressBook(item)}
            onDelete={deleteBook}
          />
        )}
        keyExtractor={(_, i) => JSON.stringify(i)}
        ListEmptyComponent={BooksNotFound}
      />
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
  separator: {
    flex: 1,
    height: 1,
    backgroundColor: '#444',
  },
  noBooks: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 20,
    color: 'red',
  },
});

const BooksNotFound = (
  <View>
    <Text style={styles.noBooks}>Books not found...</Text>
  </View>
);
