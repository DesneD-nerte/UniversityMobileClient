import React, {useContext, useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import mainLogo from './assets/favicon.png';
import AuthStack from './stack/AuthStack';
import {TokenContext} from './context/tokenContext';
import AppStack from './stack/AppStack';
import { Provider } from 'react-redux';
import { store } from './store';

export default function App() {
	const [isAuth, setIsAuth] = useState(false);
	return (
		<Provider store={store}>
			<TokenContext.Provider value={{
				isAuth,
				setIsAuth: setIsAuth
			}}>
				<NavigationContainer>
					{isAuth
						? <AppStack/>
						: <AuthStack/> 
					}
				</NavigationContainer>
			</TokenContext.Provider>
		</Provider>
  	);
}

