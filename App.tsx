import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, Other } from './src/pages'

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator tabBarOptions={{
        labelPosition: 'beside-icon',
        activeTintColor: 'blue',
        inactiveTintColor: 'white',
        style: {
          backgroundColor: 'red',
        },
        labelStyle: {
          fontSize: 20,
        }      
    }}>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Other" component={Other} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

