import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, Button, TouchableOpacity, StyleSheet, SafeAreaView, TextInput } from 'react-native';
import { supabase } from '../supabase';
import { useFocusEffect } from '@react-navigation/native';

export default function HomeScreen({ navigation }) {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useFocusEffect(
    useCallback(() => {
      fetchItems();
    }, [])
  );

  const fetchItems = async () => {
    const { data, error } = await supabase.from('inventory').select('*');
    if (!error) {
      setItems(data);
      setFilteredItems(data); // Initially, display all items
    } else console.error(error);
  };

  const deleteItem = async (id) => {
    const { error } = await supabase.from('inventory').delete().eq('id', id);
    if (error) console.error(error);
    else fetchItems();
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query === '') {
      setFilteredItems(items); // If the search is empty, show all items
    } else {
      setFilteredItems(
        items.filter((item) =>
          item.name.toLowerCase().includes(query.toLowerCase())
        )
      );
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Search Input */}
        <TextInput
          style={styles.searchInput}
          placeholder="Search items..."
          value={searchQuery}
          onChangeText={handleSearch}
        />

        {/* FlatList for displaying filtered items */}
        <FlatList
          data={filteredItems}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text>Quantity: {item.quantity}</Text>
              <Text>Price: ₱{item.price}</Text>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={() => navigation.navigate('Edit Item', { item })}
                >
                  <Text style={styles.editButtonText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => deleteItem(item.id)}
                >
                  <Text style={styles.deleteButtonText}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />

        {/* Button to add a new item */}
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('Add Item')}
        >
          <Text style={styles.addButtonText}>Add Item</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#e0dede',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  searchInput: {
    height: 45,
    borderColor: '#202052',
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 15,
    marginBottom: 20,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  itemContainer: {
    marginVertical: 12,
    padding: 18,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#202052',
    backgroundColor: '#ffffff',
    shadowColor: '#202052',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  itemName: {
    fontWeight: 'bold',
    color: '#202052',
    fontSize: 18,
    marginBottom: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',  // Align buttons to the left
    marginTop: 10,
    width: '100%',  // Make sure it takes up the full width to avoid overflow
  },
  editButton: {
    backgroundColor: '#6200ee',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    marginRight: 10,  // Space between buttons
    width: 80,
    alignItems: 'center',
  },
  editButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: '#f44336',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    width: 80,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#fcb312',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
