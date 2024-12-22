import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { supabase } from '../supabase';
import Icon from 'react-native-vector-icons/FontAwesome';
import Toast from 'react-native-toast-message'; // Import Toast

export default function AddItemScreen({ navigation }) {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');

  const addItem = async () => {
    if (!name || !quantity || !price) {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Missing Fields',
        text2: 'Please fill in all the fields.',
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

    const { error } = await supabase.from('inventory').insert({
      name,
      quantity: parseInt(quantity),
      price: parseFloat(price),
    });

    if (error) {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Error',
        text2: 'Failed to add item. Please try again.',
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
        text1: 'Success',
        text2: 'Item added successfully!',
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

      setName('');
      setQuantity('');
      setPrice('');

      setTimeout(() => {
        navigation.goBack();
      }, 2000);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.heading}>Add New Item</Text>

          <Text style={styles.label}>Item Name</Text>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Enter item name"
            style={styles.input}
          />

          <Text style={styles.label}>Quantity</Text>
          <TextInput
            value={quantity}
            onChangeText={setQuantity}
            placeholder="Enter quantity"
            keyboardType="number-pad"
            style={styles.input}
          />

          <Text style={styles.label}>Price (₱)</Text>
          <TextInput
            value={price}
            onChangeText={setPrice}
            placeholder="Enter price"
            keyboardType="decimal-pad"
            style={styles.input}
          />

          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.addButton} onPress={addItem}>
              <View style={styles.buttonContent}>
                <Icon name="plus" size={20} color="white" />
                <Text style={styles.addButtonText}>Add Item</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    paddingTop: 30,
  },
  container: {
    flexGrow: 1,
    paddingHorizontal: 30,
    paddingVertical: 40,
    backgroundColor: 'white',
    borderRadius: 15,
    marginTop: 5,
    marginHorizontal: 20,
    shadowColor: '#202052',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 10,
    marginBottom: 10,
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#30336b',
    textAlign: 'center',
    marginBottom: 25,
  },
  label: {
    color: '#30336b',
    fontWeight: '600',
    marginBottom: 8,
    fontSize: 18,
  },
  input: {
    height: 50,
    borderWidth: 1.5,
    borderColor: '#dcdde1',
    borderRadius: 10,
    marginBottom: 18,
    paddingLeft: 15,
    fontSize: 16,
    backgroundColor: '#fafafa',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  addButton: {
    flex: 1,
    backgroundColor: '#ffc022',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginRight: 10,  // Adjusted to give space between buttons
    flexDirection: 'row',
    justifyContent: 'center',
    shadowColor: '#ff6f61',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#d1d8e0',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginLeft: 10,  // Adjusted to give space between buttons
    shadowColor: '#7f8c8d',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  cancelButtonText: {
    color: '#34495e',
    fontWeight: 'bold',
    fontSize: 15,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
    marginLeft: 10,
  },
});
