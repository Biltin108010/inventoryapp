import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import { supabase } from '../supabase';

export default function ProfileScreen({ navigation }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch current user info
    const fetchUser = async () => {
      const { data: userInfo, error } = await supabase.auth.getUser();
      if (error) {
        Alert.alert('Error', error.message);
      } else {
        setUser(userInfo.user);
      }
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      Alert.alert('Error', error.message);
    } else {
      Alert.alert('Logged out', 'You have been logged out successfully.');
      navigation.reset({ index: 0, routes: [{ name: 'Login' }] }); // Clear navigation stack
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      {user ? (
        <>
          <Text style={styles.info}>Email: {user.email}</Text>
          <Button title="Log Out" color="#6200ee" onPress={handleLogout} />
        </>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#e0dede' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center', color: '#202052' },
  info: { fontSize: 16, marginBottom: 20, textAlign: 'center' },
});
