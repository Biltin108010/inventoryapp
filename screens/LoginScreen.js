import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { supabase } from '../supabase';
import Toast from 'react-native-toast-message'; // Import Toast

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setPasswordVisible] = useState(false); 

  const handleLogin = async () => {
    if (!email || !password) {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Login Failed',
        text2: 'Please enter email or password.',
        visibilityTime: 3000,
        autoHide: true,
        topOffset: 50,
        text1Style: {
          fontSize: 18,
          fontWeight: 'bold',
        },
        text2Style: {
          fontSize: 14,
        },
      });
      return; 
    }

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Login Failed',
        text2: 'Invalid credentials.',
        visibilityTime: 3000,
        autoHide: true,
        topOffset: 50,
        text1Style: {
          fontSize: 18,
          fontWeight: 'bold',
        },
        text2Style: {
          fontSize: 14,
        },
      });
    } else {
      Toast.show({
        type: 'success',
        position: 'top',
        text1: 'Success!',
        text2: 'Logged in successfully!',
        visibilityTime: 3000,
        autoHide: true,
        topOffset: 50,
        text1Style: {
          fontSize: 20,
          fontWeight: 'bold',
        },
        text2Style: {
          fontSize: 16,
        },
      });

      setTimeout(() => {
        navigation.navigate('HomeTabs');
      }, 2000); 
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Welcome!</Text>
        <Text style={styles.subtitle}>Login or Sign up to access your account</Text>

        <Text style={styles.label}>Email</Text>
        <TextInput
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor="#b0b0b0"
        />

        <Text style={styles.label}>Password</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            style={styles.passwordInput}
            secureTextEntry={!isPasswordVisible} 
            placeholderTextColor="#b0b0b0"
          />
          <TouchableOpacity 
            style={styles.showPasswordButton} 
            onPress={() => setPasswordVisible(!isPasswordVisible)} 
          >
            <Text style={styles.showPasswordText}>
              {isPasswordVisible ? 'Hide' : 'Show'}
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>

        <Text style={styles.link} onPress={() => navigation.navigate('Signup')}>
          Don't have an account? <Text style={styles.linkHighlight}>Sign up</Text>
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingBottom: 90, 
    marginTop: 100,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2b2e4a',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#8a8d9b',
    marginBottom: 35,
    textAlign: 'center',
  },
  label: {
    alignSelf: 'flex-start',
    fontSize: 14,
    color: '#7c7c7c',
    marginBottom: 5,
    marginLeft: 2,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    marginBottom: 7,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#fff',
    elevation: 2, // Adds subtle shadow for a modern feel
  },
  passwordContainer: {
    position: 'relative',
    width: '100%',
  },
  passwordInput: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    marginBottom: 7,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#fff',
    elevation: 2, 
    paddingRight: 70, 
  },
  showPasswordButton: {
    position: 'absolute',
    right: 15,
    top: 15,
  },
  showPasswordText: {
    color: '#ffc022',
    fontWeight: 'bold',
    fontSize: 16,
  },
  button: {
    width: '100%',
    backgroundColor: '#ffc022',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 3,
    marginTop: 7,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  link: {
    marginTop: 20,
    color: '#8a8d9b',
    fontSize: 14,
    textAlign: 'center',
  },
  linkHighlight: {
    color: '#ffc022',
    fontWeight: 'bold',
  },
});
  