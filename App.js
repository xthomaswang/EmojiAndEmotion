import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";
import RootDrawerNavigator from './routes/drawer';
import HomeStack from './routes/homeStack';
import Home from './screens/home';


export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const Stack = createStackNavigator();


  return (
  <NavigationContainer>
    <HomeStack/>
  </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  // your styles here
});
