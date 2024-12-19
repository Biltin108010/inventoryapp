import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import { supabase } from '../supabase';

// Replace this with your actual admin password
const ADMIN_PASSWORD = "admin123";

export default function SignupScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [adminPassword, setAdminPassword] = useState('');

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }

    if (adminPassword !== ADMIN_PASSWORD) {
      Alert.alert('Error', 'Invalid admin password.');
      return;
    }

    // Sign up the user
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) {
      Alert.alert('Error', error.message);
    } else {
      // Auto-login the user
      const { error: loginError } = await supabase.auth.signInWithPassword({ email, password });
      if (loginError) {
        Alert.alert('Error', 'Account created, but login failed. Please log in manually.');
        navigation.navigate('Login');
      } else {
        Alert.alert('Success', 'Account created and logged in!');
        navigation.navigate('HomeTabs'); // Navigate to home screen
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />
      <TextInput
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        style={styles.input}
        secureTextEntry
      />
      <TextInput
        placeholder="Admin Password"
        value={adminPassword}
        onChangeText={setAdminPassword}
        style={styles.input}
        secureTextEntry
      />

      {/* Custom Sign-Up Button */}
      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      {/* Sign-In Link */}
      <Text style={styles.link} onPress={() => navigation.navigate('Login')}>
        Already have an account? Log in
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 40,
    backgroundColor: '#f3f4f6', // Light background for a fresh look
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#202052',  // Darker color for a stronger contrast
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 20,
    paddingLeft: 15,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#6200ee', // A solid, attractive button color
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  link: {
    color: '#6200ee',
    marginTop: 15,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
