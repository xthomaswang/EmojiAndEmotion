import { createStackNavigator } from "@react-navigation/stack";
import Home from '../screens/home';
import ContentDetail from "../screens/contentDetail";
import Header from "../shared/header";
import React from "react";
import RootDrawerNavigator from './drawer'



const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator
        screenOptions={{
            title: ("App Name")
        }}
    >
      <Stack.Screen name='Drawer' component={RootDrawerNavigator}/>
      <Stack.Screen 
        name="HomeName" 
        component={Home} 
        navigitionOptions={{header: ()=> <Header/>}}
      />
      <Stack.Screen name="content" component={ContentDetail} />
    </Stack.Navigator>
  );
};

export default HomeStack;
