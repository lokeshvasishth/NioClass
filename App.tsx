/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {createContext, useState} from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CameraPage from './src/CameraPage';
import ImageView from './src/ImageView';




export const ImageContext = createContext<any>(null);
const stack = createNativeStackNavigator()
function App(): JSX.Element {
  const [imagepath, setImagepath] = useState('')
 

  return (

    <ImageContext.Provider value={[imagepath, setImagepath]}>
    <NavigationContainer>
    <stack.Navigator screenOptions={
     {headerShown:false}
    }>
   {/* <stack.Screen name='Page1' component={Page1} /> */}
   <stack.Screen name='CameraPage' component={CameraPage} />
   <stack.Screen name='ImageView' component={ImageView} />
    </stack.Navigator>
    </NavigationContainer>
    </ImageContext.Provider>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
