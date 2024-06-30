import {createNativeStackNavigator} from '@react-navigation/native-stack';

import OnBoardingScreen from '../screens/OnBoardingScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import LandingScreen from '../screens/LandingScreen';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name='OnBoardingScreen' component={OnBoardingScreen} />
        <Stack.Screen  name='LandingScreen' component={LandingScreen}/>
        <Stack.Screen name='Login' component={LoginScreen} />
        <Stack.Screen name='Register' component={RegisterScreen} />
    </Stack.Navigator>
  )
}

export default AuthStack
