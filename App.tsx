import 'reflect-metadata';
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Home, Draw, Books, Pictures} from './src/pages';
import {createConnection} from 'typeorm';
import {env} from './src/env';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();

export default function App() {
  useEffect(() => {
    createConnection()
      .then(() => console.log('Connection has been established successfully.'))
      .catch((err) => console.error('Unable to connect to the database:', err));
  });

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
