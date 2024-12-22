import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { supabase } from '../supabase';
import Icon from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-toast-message'; // Import Toast

export default function EditItemScreen({ route, navigation }) {
  const { item } = route.params;

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
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Update Failed',
        text2: 'There was an error updating the item.',
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
        text2: 'Item updated successfully!',
        visibilityTime: 2000,
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

      // Clear fields and navigate back after success
      setName('');
      setQuantity('');
      setPrice('');
      setTimeout(() => {
        navigation.goBack();
      }, 2000); // Optional: delay navigation for a better user experience
    }
  };

  const cancelEdit = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.form}>
          <Text style={styles.heading}>Edit Item</Text>
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
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.updateButton} onPress={editItem}>
              <Icon name="checkmark-circle" size={18} color="white" style={styles.icon} />
              <Text style={styles.buttonText}>Update</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={cancelEdit}>
              <Icon name="close-circle" size={18} color="white" style={styles.icon} />
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  form: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#343a40',
    marginBottom: 20,
    textAlign:'center'
  },
  label: {
    color: '#6c757d',
    fontWeight: 'bold',
    marginBottom: 5,
    fontSize: 14,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 8,
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#f8f9fa',
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  updateButton: {
    backgroundColor: '#ffc022',
    padding: 12,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginRight: 10,
  },
  cancelButton: {
    backgroundColor: '#d1d8e0',
    padding: 12,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginLeft: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 5,
  },
  icon: {
    marginRight: 5,
  },
});
