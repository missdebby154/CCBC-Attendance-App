import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from './screens/SplashScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import DashboardScreen from './screens/DashboardScreen';
import AttendanceScreen from './screens/AttendanceScreen';
import ReportScreen from './screens/ReportScreen';
import ProfileScreen from './screens/ProfileScreen';
import AnnouncementScreen from './screens/AnnouncementScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: 'Log In' }}
        />
        <Stack.Screen
          name="Signup"
          component={SignupScreen}
          options={{ title: 'Sign Up' }}
        />
        <Stack.Screen
          name="Dashboard"
          component={DashboardScreen}
          options={{ title: 'Dashboard' }}
        />
        <Stack.Screen
          name="Attendance"
          component={AttendanceScreen}
          options={{ title: 'Mark Attendance' }}
        />
        <Stack.Screen
          name="Report"
          component={ReportScreen}
          options={{ title: 'Attendance Report' }}
        />
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{ title: 'Your Profile' }}
        />
        <Stack.Screen
          name="Announcements"
          component={AnnouncementScreen}
          options={{ title: 'Church Announcements' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}