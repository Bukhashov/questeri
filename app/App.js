import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Quests from './pages/quests';
import Like from  './pages/like';
import Map from './pages/map';
import Account from './pages/account';

export default function App() {
  const Tab = createBottomTabNavigator();
  
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          headerShown: true,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if(route.name === "Quests") {
              return <Ionicons 
                name={ focused 
                  ? 'ios-information-circle' 
                  : 'ios-information-circle-outline' 
                } 
                size={size} 
                color={color} 
                />
            } 
            else if(route.name === "Saqtawlı") {
              return <Ionicons 
                name={ focused 
                  ? 'bookmark' 
                  : 'bookmark-outline' 
                } 
                size={size} color={color} 
              />
            } 
            else if(route.name === "Karta") {
              return <Ionicons 
                name={ focused 
                  ? 'map' 
                  : 'map-outline' 
                } 
                size={size} color={color} 
              />
            } 
            else if(route.name === "Account") {
              return <Ionicons 
                name={ focused 
                  ? 'person-circle' 
                  : 'person-circle-outline' 
                } 
                size={size} color={color} 
              />
            }
          },
          tabBarInactiveTintColor: 'black',
          tabBarActiveTintColor: 'black',
        })}
      >
        <Tab.Screen name="Quests" component={Quests} />
        <Tab.Screen name="Saqtawlı" component={Like} />
        <Tab.Screen name="Karta" component={Map} />
        <Tab.Screen name="Account" component={Account} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
