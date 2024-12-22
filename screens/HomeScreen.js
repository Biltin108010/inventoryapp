import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, SafeAreaView, TextInput, Modal, Pressable } from 'react-native';
import { supabase } from '../supabase';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message'; // Import Toast

export default function HomeScreen({ navigation }) {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

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

  const deleteItem = async () => {
    const { error } = await supabase.from('inventory').delete().eq('id', itemToDelete.id);
    if (error) {
      console.error(error);
    } else {
      fetchItems(); // Refresh the list after deletion
      setIsModalVisible(false); // Close the modal after deletion

      // Show success toast
      Toast.show({
        type: 'success',
        position: 'top',
        text1: 'Item Deleted',
        text2: 'The item has been successfully deleted.',
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
    }
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

  const toggleDetails = (id) => {
    setFilteredItems(filteredItems.map(item => 
      item.id === id ? { ...item, showDetails: !item.showDetails } : item
    ));
  };

  const openDeleteModal = (item) => {
    setItemToDelete(item);
    setIsModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Search Input */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#888" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search items..."
            value={searchQuery}
            onChangeText={handleSearch}
          />
        </View>

        {/* FlatList for displaying filtered items */}
        <FlatList
          data={filteredItems}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.itemContainer}
              onPress={() => toggleDetails(item.id)}  // Toggle the visibility of item details
            >
              <View style={styles.itemHeader}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Ionicons
                  name={item.showDetails ? "chevron-up" : "chevron-down"}
                  size={20}
                  color="#888"
                  style={styles.chevronIcon}
                />
              </View>

              {item.showDetails && ( // Conditionally render details if 'showDetails' is true
                <View style={styles.itemDetails}>
                  <Text style={styles.itemText}>Quantity: {item.quantity}</Text>
                  <Text style={styles.itemText}>Price: ₱{item.price}</Text>
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity
                      style={styles.editButton}
                      onPress={() => navigation.navigate('Edit Item', { item })}
                    >
                      <Text style={styles.buttonText}>Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.deleteButton}
                      onPress={() => openDeleteModal(item)} // Open modal for confirmation
                    >
                      <Text style={styles.buttonText}>Delete</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </TouchableOpacity>
          )}
        />
      </View>

      {/* Floating Action Button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('Add Item')}
      >
        <Ionicons name="add" size={30} color="#fff" />
      </TouchableOpacity>

      {/* Custom Modal for Deletion Confirmation */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Confirm Deletion</Text>
            <Text style={styles.modalMessage}>Are you sure you want to delete this item?</Text>
            <View style={styles.modalButtons}>
              <Pressable
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setIsModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </Pressable>
              <Pressable
                style={[styles.modalButton, styles.modalDeleteButton]}  
                onPress={deleteItem}
              >
                <Text style={styles.modalButtonText}>Delete</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F1F1F5',
    paddingTop: 30,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
    marginTop: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    height: 50,
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  itemContainer: {
    marginVertical: 12,
    padding: 18,
    borderRadius: 15,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemName: {
    fontWeight: '600',
    color: '#333333',
    fontSize: 18,
    marginBottom: 8,
  },
  chevronIcon: {
    marginLeft: 10,
  },
  itemDetails: {
    marginTop: 10,
  },
  itemText: {
    color: '#666666',
    fontSize: 14,
    marginBottom: 6,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 15,
  },
  
  editButton: {
    backgroundColor: '#ffc022',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 30,
    marginRight: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  deleteButton: {
    backgroundColor: '#FF6347',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#ffc022',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 15,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  modalMessage: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    width: '45%',
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#ccc',
  },
  modalDeleteButton: { // Renamed the modal delete button style
    backgroundColor: '#FF6347',
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  buttonText: { // Added this to ensure button text is white
    color: '#fff',
    fontWeight: '600',
  },
});
