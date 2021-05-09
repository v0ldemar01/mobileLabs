import React from 'react';
import {BookList} from '../components/Book/BookList';
import {
  CardStyleInterpolators,
  createStackNavigator,
  HeaderBackButton,
} from '@react-navigation/stack';
import {INavigationProps} from '../models/props/INavigationProps';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Button} from 'react-native-elements';
import {AddBook} from '../components/Book/AddBook';
import {BookDetails} from '../components/Book/BookDetails';
import {IBook} from '../models/IBook';

const Stack = createStackNavigator();

export const Books = ({navigation: {navigate}}: INavigationProps) => (
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
      {(props) => <AddBook {...props} />}
    </Stack.Screen>
    <Stack.Screen
      name="Details"
      component={BookDetails}
      options={{
        title: 'Book Details',
        cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
      }}
    />
  </Stack.Navigator>
);
