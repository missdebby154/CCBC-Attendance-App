import React from 'react';
import {
  View,
  ImageBackground,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';

export default function SplashScreen({ navigation }) {
  return (
    <ImageBackground
      source={require('../assets/newsplash.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <LinearGradient
        colors={['rgba(0,0,0,0.4)', 'transparent']}
        style={styles.overlay}
      >
        <View style={styles.content}>
          <Animatable.Text
            animation="fadeInDown"
            delay={200}
            style={[styles.logo, { color: '#cc0000' }]}
          >
            CCBC
          </Animatable.Text>

          <Animatable.Text
            animation="fadeInUp"
            delay={400}
            style={[styles.name, { color: '#003366' }]}
          >
            Central Charismatic Baptist Church
          </Animatable.Text>

          <Animatable.Text
            animation="fadeInUp"
            delay={600}
            style={styles.motto}
          >
            “Shalom” — Peace be unto you
          </Animatable.Text>
        </View>

        <Animatable.View
          animation="fadeInUp"
          delay={800}
          style={styles.buttonContainer}
        >
          <TouchableOpacity
            style={[styles.button, styles.loginButton]}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.signupButton]}
            onPress={() => navigation.navigate('Signup')}
          >
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </Animatable.View>
      </LinearGradient>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#000', // fallback color
  },
  overlay: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 80,
    paddingBottom: 60,
  },
  content: {
    alignItems: 'center',
  },
  logo: {
    fontSize: 60,
    fontWeight: 'bold',
    marginBottom: 10,
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
  name: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 5,
  },
  motto: {
    fontSize: 22,
    color: '#fff',
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 15,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 10,
    elevation: 4,
  },
  loginButton: {
    backgroundColor: '#cc0000',
  },
  signupButton: {
    backgroundColor: '#003366',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});