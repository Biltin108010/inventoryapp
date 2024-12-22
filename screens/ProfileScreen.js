import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { supabase } from '../supabase';
import { Ionicons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message'; // Import Toast

export default function ProfileScreen({ navigation }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: userInfo, error } = await supabase.auth.getUser();
      if (error) {
        Toast.show({
          type: 'error',
          position: 'top',
          text1: 'Error',
          text2: error.message,
          visibilityTime: 3000,
          autoHide: true,
          topOffset: 50,
          text1Style: { fontSize: 18, fontWeight: 'bold' },
          text2Style: { fontSize: 14 },
        });
      } else {
        setUser(userInfo.user);
      }
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Error',
        text2: error.message,
        visibilityTime: 3000,
        autoHide: true,
        topOffset: 50,
        text1Style: { fontSize: 18, fontWeight: 'bold' },
        text2Style: { fontSize: 14 },
      });
    } else {
      Toast.show({
        type: 'success',
        position: 'top',
        text1: 'Logged out',
        text2: 'You have been logged out successfully.',
        visibilityTime: 3000,
        autoHide: true,
        topOffset: 50,
        text1Style: { fontSize: 20, fontWeight: 'bold' },
        text2Style: { fontSize: 16 },
      });
      navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
    }
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>

      {/* Title */}
      <Text style={styles.title}>Profile</Text>

      {/* Profile Image Placeholder */}
      <View style={styles.profileImageContainer}>
        <View style={styles.profileImagePlaceholder}>
          <Ionicons name="person-outline" size={40} color="#ffc022" />
        </View>
      </View>

      {/* Email Label */}
      <Text style={styles.label}>Email</Text>

      {/* Email Input */}
      <TextInput
        style={styles.input}
        value={user?.email || ''}
        editable={false}
        placeholder="example email here"
        placeholderTextColor="#A9A9A9"
      />

      {/* Log Out Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 60,
    marginBottom: 30,
    color: '#000',
  },
  profileImageContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  profileImagePlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#ffc022',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    color: '#000',
    textAlign: 'left',
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#D3D3D3',
    borderRadius: 8,
    paddingLeft: 10,
    marginBottom: 20,
    color: '#000',
  },
  logoutButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#ffc022',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  
  logoutButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
