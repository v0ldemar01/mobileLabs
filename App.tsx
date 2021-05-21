import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Home, Draw, Books, Pictures} from './src/pages';
// import db from './src/data/db/connection';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase('books_pictures.db');
import initDb from './src/data/migrations/initDb';

const Tab = createBottomTabNavigator();

const checkWorkDb = () =>
  new Promise((resolve) => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT name FROM sqlite_master WHERE type="table"',
        [],
        (...res) => {
          resolve(res);
        },
      );
    });
  });

export default function App() {
  useEffect(() => {
    initDb(db);
    checkWorkDb().then((res) => console.log(res));
  }, []);

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({color, size}) => {
            let iconName;
            switch (route.name) {
              case 'Home':
                iconName = 'home';
                break;
              case 'Draw':
                iconName = 'draw';
                break;
              case 'Books':
                iconName = 'book-open-variant';
                break;
              case 'Pictures':
                iconName = 'image-multiple-outline';
                break;
            }
            return <Icon name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'red',
          inactiveTintColor: 'blue',
          style: {
            backgroundColor: 'white',
          },
          labelStyle: {
            fontSize: 12,
          },
        }}>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Draw" component={Draw} />
        <Tab.Screen name="Books" component={Books} />
        <Tab.Screen name="Pictures" component={Pictures} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
