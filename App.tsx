import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import UserList from './screens/UserList';
import CreateUser from './screens/CreateUser';
import ProductsList from './screens/ProductsList';
import MovementList from './screens/MovementList';
import CreateMoviment from './screens/CreateMoviment';
import MovementListDriver from './screens/MovementListDriver';
import Mapa from './screens/Mapa';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{header: ()=> <></>}}/>
        <Stack.Screen name="Home" component={HomeScreen} options={{header: ()=> <></>}}/>
        <Stack.Screen name="UserList" component={UserList} options={{header: ()=> <></>}}/>
        <Stack.Screen name="CreateUser" component={CreateUser} options={{header: ()=> <></>}}/>
        <Stack.Screen name="ProductsList" component={ProductsList} options ={{header: ()=> <></>}}/>
        <Stack.Screen name="MovementList" component={MovementList} options ={{header: ()=> <></>}}/>
        <Stack.Screen name="CreateMoviment" component={CreateMoviment} options ={{header: ()=> <></>}}/>
        <Stack.Screen name="MovementListDriver" component={MovementListDriver} options ={{header: ()=> <></>}}/>
        <Stack.Screen name="Mapa" component={Mapa}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}