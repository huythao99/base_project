import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {AuthNavigator} from './auth-navigator';
import RNBootSplash from 'react-native-bootsplash';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <SafeAreaProvider>
      <NavigationContainer
        onReady={() => {
          RNBootSplash.hide({fade: true, duration: 500});
        }}>
        <Stack.Navigator>
          <Stack.Screen
            options={{headerShown: false, gestureEnabled: false}}
            name="Auth"
            component={AuthNavigator}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
