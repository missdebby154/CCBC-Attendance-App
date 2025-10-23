import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from './screens/SplashScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import DashboardScreen from './screens/DashboardScreen';
import AttendanceScreen from './screens/AttendanceScreen';
import ReportScreen from './screens/ReportScreen';
import AnnouncementScreen from './screens/AnnouncementScreen';

// Profile-related screens
import ProfileScreen from './screens/ProfileScreen'; 
import EditProfile from './Profile/EditProfile';
import Settings from './Profile/Settings';
import Help from './Profile/Help';
import Privacy from './Profile/Privacy';
import About from './Profile/About';

const Stack = createNativeStackNavigator();
const ProfileStackNav = createNativeStackNavigator();

function ProfileStack() {
  return (
    <ProfileStackNav.Navigator
      initialRouteName="ProfileMain"
      screenOptions={{
        headerTitleAlign: 'center',   // Center the header title
        headerTitleStyle: {           // Make title bold
          fontWeight: 'bold',
          fontSize: 25,
        },
      }}
    >
      <ProfileStackNav.Screen
        name="ProfileMain"
        component={ProfileScreen}
        options={{ title: 'Your Profile', headerShown: false }}
      />
      <ProfileStackNav.Screen
        name="EditProfile"
        component={EditProfile}
        options={{ title: 'Edit Profile' }}
      />
      <ProfileStackNav.Screen
        name="Settings"
        component={Settings}
        options={{ title: 'Settings' }}
      />
      <ProfileStackNav.Screen
        name="Help"
        component={Help}
        options={{ title: 'Help' }}
      />
      <ProfileStackNav.Screen
        name="Privacy"
        component={Privacy}
        options={{ title: 'Privacy' }}
      />
      <ProfileStackNav.Screen
        name="About"
        component={About}
        options={{ title: 'About' }}
      />
    </ProfileStackNav.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerTitleAlign: 'center',   // Center titles
          headerTitleStyle: {
            fontWeight: 'bold',         // Bold titles
            fontSize: 25,
          },
        }}
      >
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
          component={ProfileStack}
          options={{ headerShown: false }}
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
