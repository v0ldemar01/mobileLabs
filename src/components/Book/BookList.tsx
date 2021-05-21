import React, {useEffect, useState, FunctionComponent} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {SearchBar} from 'react-native-elements';
import {IBookListProps} from '../../models/props/IBookList';
import {IBook} from '../../models/IBook';
import {getBooksByFilter} from '../../api/books';
import bookRepository from '../../data/repositories/BookRepository';
import {SwipeableBook} from './Book';

export const BookList: FunctionComponent<IBookListProps> = ({
  onPressBook,
}: IBookListProps) => {
  const [search, setSearch] = useState<string>('');
  const [books, setBooks] = useState<IBook[]>([]);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (search.length < 3) {
      return setBooks([]);
    }
    setLoading(true);
    getBooksByFilter(search.toLowerCase())
      .then((resultBooks: IBook[]) => {
        setBooks(resultBooks);
        setLoading(false);
      })
      .catch(() => {
        setError('Can`t get data from network(');
        bookRepository
          .getBooksBySearchString(search.toLowerCase())
          .then((resultBooks: IBook[]) => {
            setError('');
            setBooks(resultBooks);
          })
          .catch(() => {
            setBooks([]);
            setError('Can`t get data from database(');
          })
          .finally(() => {
            setLoading(false);
          });
      });
  }, [search]);

  const deleteBook = (isbn13: string) => {
    const newBooks = books.filter((book: IBook) => book.isbn13 !== isbn13);
    setBooks(newBooks);
  };

  return (
    <>
      <SearchBar
        onChangeText={setSearch}
        value={search}
        placeholder="Enter title"
        platform="android"
        underlineColorAndroid="blue"
      />
      <SafeAreaView style={styles.container}>
        {loading ? (
          <ActivityIndicator size="large" color="#00ff00" />
        ) : error ? (
          <Text style={styles.noText}>{error}</Text>
        ) : books.length ? (
          <FlatList
            data={books}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            renderItem={({item}) => (
              <SwipeableBook
                item={item}
                onPress={() => onPressBook(item)}
                onDelete={deleteBook}
              />
            )}
            keyExtractor={(_, i) => JSON.stringify(i)}
          />
        ) : (
          <Text style={styles.noText}>Books not found...</Text>
        )}
      </SafeAreaView>
    </>
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
  noText: {
    fontSize: 20,
    color: 'red',
  },
});
