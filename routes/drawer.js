import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from "../screens/home";
import { StyleSheet } from "react-native";

import { Ionicons } from '@expo/vector-icons';
import About from "../screens/about";
import Past_Memo from "../screens/past_memo";
import Setting from "../screens/setting";

const Drawer = createDrawerNavigator();



export default function RootDrawerNavigator() {
  return (
    <Drawer.Navigator >
        <Drawer.Screen name="Dashboard" component={Home}
        
            options={{
            title: 'Dashborad',
            drawerLabel: 'Dashboard',
            drawerActiveTintColor:'white',
            drawerContentStyle:{
                backgroundColor: '#444',
            },
            drawerLabelStyle: {
                fontWeight: 'bold',
                color: 'lightgrey', // Set your desired color for the drawer label here
            }
            }}
      
        />
        

        <Drawer.Screen name="Past Memo" component={Past_Memo} 
            options={{
                title: 'Past Memo',
                drawerLabel: 'Past Memo',
                drawerActiveTintColor:'white',
                drawerContentStyle:{
                    backgroundColor: '#444',
                },
                drawerLabelStyle: {
                    fontWeight: 'bold',
                    color: 'lightgrey', // Set your desired color for the drawer label here
                },
            }} />
        <Drawer.Screen name="Setting" component={Setting}
            options={{
                title: 'Setting',
                drawerLabel: 'Setting',
                drawerActiveTintColor:'white',
                drawerContentStyle:{
                    backgroundColor: '#444',
                },
                drawerLabelStyle: {
                    fontWeight: 'bold',
                    color: 'lightgrey', // Set your desired color for the drawer label here
                },
            }} />
        <Drawer.Screen name="About" component={About} 
            options={{
                title: 'About',
                drawerLabel: 'About',
                drawerActiveTintColor:'white',
                drawerContentStyle:{
                    backgroundColor: '#444',
                },
                                drawerLabelStyle: {
                    fontWeight: 'bold',
                    color: 'lightgrey', // Set your desired color for the drawer label here
                },
            }} />
    </Drawer.Navigator>
  );
}

