import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CustomNavigationBar from './components/CustomNavigationBar';
import { NavigationContainer } from '@react-navigation/native';
import NewContact from './components/NewContact';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import Home from './components/Home';

const Stack = createNativeStackNavigator();

export default function App()
{
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home" screenOptions={{
          header: CustomNavigationBar,
        }}>
          <Stack.Screen name="Home" component={Home} options={{ title: "Home" }} />
          <Stack.Screen name="NewContact" component={NewContact} options={{ title: "New Contact" }} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
