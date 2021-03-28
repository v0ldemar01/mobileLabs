import React, {useState} from 'react';
import {StyleSheet, SafeAreaView, FlatList} from 'react-native';
import {Book} from '../components/Book';

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export const Books = () => {
  const [books] = useState(require('../../assets/BooksList.json').books);
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={books}
        renderItem={({item}) => <Book {...item} />}
        keyExtractor={(_, i) => JSON.stringify(i)}
      />
    </SafeAreaView>
  );
};
