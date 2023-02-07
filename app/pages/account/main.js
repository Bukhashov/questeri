import { AsyncStorage, StyleSheet, Text, View } from 'react-native';
import React ,{ useState, useEffect} from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Acc from './account';
import Singin from './singin';
import Singup from './singup';

export default function Main() {
    const Stack = createNativeStackNavigator();
    
    return(
        <Stack.Navigator initialRouteName="Acc">
            <Stack.Screen 
                name="Acc"
                options={{ headerShown: false }} 
                component={Acc} 
            />
            <Stack.Screen 
                name="Singin" 
                options={{ headerShown: false }} 
                component={Singin} 
            />
            <Stack.Screen 
                name="Singup" 
                options={{ headerShown: false }} 
                component={Singup} 
            />
        </Stack.Navigator>
    )
}