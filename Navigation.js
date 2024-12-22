import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './screens/HomeScreen'; 
import AddItemScreen from './screens/AddItemScreen'; 
import EditItemScreen from './screens/EditItemScreen'; 
import LoginScreen from './screens/LoginScreen'; // Import LoginScreen
import SignupScreen from './screens/SignupScreen'; // Import SignupScreen
import ProfileScreen from './screens/ProfileScreen';
import Icon from 'react-native-vector-icons/Ionicons'; 
import Toast from 'react-native-toast-message'; // Import Toast

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Tab Navigator: For Home and Profile, no longer for Add Item
function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#ffc022',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: { backgroundColor: '#fff', paddingBottom: 5 },
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Profile') {
            iconName = 'person-circle';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'View Items' }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profile' }} />
    </Tab.Navigator>
  );
}

// Stack Navigator: For holding the TabNavigator and EditItemScreen
export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Signup" component={SignupScreen} options={{ headerShown: false }} />
        <Stack.Screen name="HomeTabs" component={TabNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="Add Item" component={AddItemScreen} options={{ title: 'Add Item' }} />
        <Stack.Screen name="Edit Item" component={EditItemScreen} />
      </Stack.Navigator>

      {/* Toast component */}
      <Toast />
    </NavigationContainer>
  );
}
