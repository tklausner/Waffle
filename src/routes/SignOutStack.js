import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import LoginScreen from '../screens/LoginScreen'
import WelcomeScreen from '../screens/WelcomeScreen'
import SignUpScreen from '../screens/SignUpScreen'

const Stack = createStackNavigator()

export default function SignOutStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
