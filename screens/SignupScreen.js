import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { supabase } from '../supabase';
import Toast from 'react-native-toast-message'; // Import Toast

const ADMIN_PASSWORD = "admin123";

export default function SignupScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [isPasswordVisible, setPasswordVisible] = useState(false); // State for toggling password visibility
  const [isConfirmPasswordVisible, setConfirmPasswordVisible] = useState(false); // State for confirm password visibility
  const [isAdminPasswordVisible, setAdminPasswordVisible] = useState(false); // State for admin password visibility

  const handleSignup = async () => {
    // Check for empty fields
    if (!email || !password || !confirmPassword || !adminPassword) {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Error',
        text2: 'All fields must be filled.',
        visibilityTime: 3000,
        autoHide: true,
        topOffset: 20,
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
  
    if (password !== confirmPassword) {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Error',
        text2: 'Passwords do not match.',
        visibilityTime: 3000,
        autoHide: true,
        topOffset: 20,
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
  
    if (adminPassword !== ADMIN_PASSWORD) {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Error',
        text2: 'Invalid admin password.',
        visibilityTime: 3000,
        autoHide: true,
        topOffset: 20,
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
  
    // Sign up the user
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Error',
        text2: error.message,
        visibilityTime: 3000,
        autoHide: true,
        topOffset:20,
        text1Style: {
          fontSize: 18,
          fontWeight: 'bold',
        },
        text2Style: {
          fontSize: 14,
        },
      });
    } else {
      // Auto-login the user
      const { error: loginError } = await supabase.auth.signInWithPassword({ email, password });
      if (loginError) {
        Toast.show({
          type: 'error',
          position: 'top',
          text1: 'Error',
          text2: 'Account created, but login failed. Please log in manually.',
          visibilityTime: 3000,
          autoHide: true,
          topOffset: 20,
          text1Style: {
            fontSize: 18,
            fontWeight: 'bold',
          },
          text2Style: {
            fontSize: 14,
          },
        });
        navigation.navigate('Login');
      } else {
        Toast.show({
          type: 'success',
          position: 'top',
          text1: 'Success!',
          text2: 'Account created and logged in!',
          visibilityTime: 3000,
          autoHide: true,
          topOffset: 20,
          text1Style: {
            fontSize: 20,
            fontWeight: 'bold',
          },
          text2Style: {
            fontSize: 16,
          },
        });

        navigation.navigate('HomeTabs'); // Navigate to home screen
      }
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#f3f4f6" />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.innerContainer}>
            <Text style={styles.title}>Sign Up</Text>

            {/* Email Label and Input */}
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

            {/* Password Label and Input */}
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

            {/* Confirm Password Label and Input */}
            <Text style={styles.label}>Confirm Password</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                placeholder="Re-enter your password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                style={styles.passwordInput}
                secureTextEntry={!isConfirmPasswordVisible}
                placeholderTextColor="#b0b0b0"
              />
              <TouchableOpacity
                style={styles.showPasswordButton}
                onPress={() => setConfirmPasswordVisible(!isConfirmPasswordVisible)}
              >
                <Text style={styles.showPasswordText}>
                  {isConfirmPasswordVisible ? 'Hide' : 'Show'}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Admin Password Label and Input */}
            <Text style={styles.label}>Admin Password</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                placeholder="Enter admin password"
                value={adminPassword}
                onChangeText={setAdminPassword}
                style={styles.passwordInput}
                secureTextEntry={!isAdminPasswordVisible}
                placeholderTextColor="#b0b0b0"
              />
              <TouchableOpacity
                style={styles.showPasswordButton}
                onPress={() => setAdminPasswordVisible(!isAdminPasswordVisible)}
              >
                <Text style={styles.showPasswordText}>
                  {isAdminPasswordVisible ? 'Hide' : 'Show'}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Custom Sign-Up Button */}
            <TouchableOpacity style={styles.button} onPress={handleSignup}>
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>

            {/* Sign-In Link */}
            <Text style={styles.link} onPress={() => navigation.navigate('Login')}>
              Already have an account? <Text style={styles.linkHighlight}>Log in</Text>
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#202052',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    alignSelf: 'flex-start',
    fontSize: 14,
    color: '#2b2e4a',
    marginBottom: 5,
    marginLeft: 2,
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
    elevation: 2,
  },
  passwordContainer: {
    position: 'relative',
    width: '100%',
  },
  passwordInput: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 20,
    paddingLeft: 15,
    fontSize: 16,
    backgroundColor: '#fff',
    elevation: 2,
    paddingRight: 70, // Adds space for the toggle button
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
    backgroundColor: '#ffc022',
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
    marginTop: 15,
    color: '#8a8d9b',
    textAlign: 'center',
    fontSize: 14,
    fontWeight: 'bold',
  },
  linkHighlight: {
    fontWeight: 'bold',
    color: '#ffc022',
  },
});
