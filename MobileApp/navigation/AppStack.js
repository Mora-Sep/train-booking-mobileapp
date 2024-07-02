import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import BottomTab from './BottomTab';

const Stack = createNativeStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name='Home' component={BottomTab} />
        {/* <Stack.Screen name='Profile' component={ProfileScreen} /> */}
    </Stack.Navigator>
  )
}

export default AppStack
