import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Home, Draw} from './src/pages';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();

export default function App() {
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
      </Tab.Navigator>
    </NavigationContainer>
  );
}
