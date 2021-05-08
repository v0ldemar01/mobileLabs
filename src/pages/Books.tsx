import React, {useState} from 'react';
import {BookList} from '../components/BookList';
import {
  CardStyleInterpolators,
  createStackNavigator,
  HeaderBackButton,
} from '@react-navigation/stack';
import {INavigationProps} from '../models/props/INavigationProps';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Button} from 'react-native-elements';
import {AddBook} from '../components/AddBook';
import {BookDetails} from '../components/BookDetails';
import IBook from '../models/IBook';

const Stack = createStackNavigator();

export const Books = ({navigation: {navigate}}: INavigationProps) => {
  const [books, setBooks] = useState(
    require('../../assets/books/BooksList.json').books.map(
      (book: IBook, index: number) => ({
        key: `${index}`,
        ...book,
      }),
    ),
  );
  const addBook = (book: IBook) => setBooks([...books, book]);
  const deleteBook = (isbn13: string) => {
    const newBooks = books.filter((book: IBook) => book.isbn13 !== isbn13);
    setBooks(newBooks);
  };

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Books list"
        options={{
          title: 'My home',
          headerStyle: {
            backgroundColor: '#110B70',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerRight: () => (
            <Button
              onPress={() => navigate('Add')}
              icon={<Icon name="book-plus-multiple" size={24} color="yellow" />}
              type="clear"
            />
          ),
        }}>
        {(props) => (
          <BookList
            {...props}
            books={books}
            deleteBook={deleteBook}
            onPressBook={(book: IBook) => {
              console.log('book', book);
              return navigate('Details', {...book});
            }}
          />
        )}
      </Stack.Screen>
      <Stack.Screen
        name="Add"
        options={{
          headerLeft: (props) => (
            <HeaderBackButton {...props} tintColor="#D2444A" />
          ),
        }}>
        {(props) => <AddBook {...props} addBook={addBook} />}
      </Stack.Screen>
      <Stack.Screen
        name="Details"
        component={BookDetails}
        options={{
          title: 'Profile',
          cardStyleInterpolator:
            CardStyleInterpolators.forFadeFromBottomAndroid,
        }}
      />
    </Stack.Navigator>
  );
};
