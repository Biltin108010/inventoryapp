import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, SafeAreaView } from 'react-native';
import { supabase } from '../supabase';

export default function EditItemScreen({ route, navigation }) {
  const { item } = route.params; // Get item details from the navigation params
  
  const [name, setName] = useState(item.name);
  const [quantity, setQuantity] = useState(item.quantity.toString());
  const [price, setPrice] = useState(item.price.toString());

  const editItem = async () => {
    const { error } = await supabase
      .from('inventory')
      .update({ name, quantity: parseInt(quantity), price: parseFloat(price) })
      .eq('id', item.id);
      
    if (error) {
      console.error(error);
    } else {
      // Clear fields and navigate back
      setName('');
      setQuantity('');
      setPrice('');
      navigation.goBack(); // Navigate back after saving the changes
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#e0dede' }}>
      <View style={styles.container}>
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
        <Button title="Update Item" onPress={editItem} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    color: '#202052',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#202052',
    marginVertical: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'white',
  },
});
