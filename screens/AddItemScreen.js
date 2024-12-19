import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { supabase } from '../supabase';

export default function AddItemScreen({ navigation }) {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');

  const addItem = async () => {
    const { error } = await supabase.from('inventory').insert({
      name,
      quantity: parseInt(quantity),
      price: parseFloat(price),
    });
    if (error) {
      console.error(error);
    } else {
      setName('');
      setQuantity('');
      setPrice('');
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
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

        <TouchableOpacity style={styles.addButton} onPress={addItem}>
          <Text style={styles.addButtonText}>Add Item</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  container: {
    flex: 1,
    paddingHorizontal: 25,
    paddingVertical: 30,
    backgroundColor: 'white',
    borderRadius: 10,
    marginTop: 20,
    marginHorizontal: 15,
    shadowColor: '#202052',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#202052',
    textAlign: 'center',
    marginBottom: 20,
  },
  label: {
    color: '#202052',
    fontWeight: 'bold',
    marginBottom: 5,
    fontSize: 16,
  },
  input: {
    height: 45,
    borderWidth: 1,
    borderColor: '#202052',
    borderRadius: 5,
    marginBottom: 15,
    paddingLeft: 15,
    fontSize: 16,
    backgroundColor: '#ffffff',
  },
  addButton: {
    backgroundColor: '#fcb312',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
