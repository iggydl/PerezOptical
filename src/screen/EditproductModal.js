import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, StyleSheet, Alert } from 'react-native';
import { RadioButton } from 'react-native-paper';

const EditProductModal = ({ isVisible, onClose, product, onSave, categories }) => {
 
  const [editedProduct, setEditedProduct] = useState({
    id: '',
    name: '',
    category: '',
    quantity: '',
    price: '',
  });


  useEffect(() => {
    if (product) {
      setEditedProduct(product);
    } else {
  
      setEditedProduct({
        id: '',
        name: '',
        category: '',
        quantity: '',
        price: '',
      });
    }
  }, [product]);

  const handleSave = () => {
    if (!editedProduct.name || !editedProduct.category || !editedProduct.quantity || !editedProduct.price) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

  
    onSave(editedProduct);
    onClose(); 
  };

  return (
    <Modal visible={isVisible} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Edit Product</Text>

     
          <TextInput
            style={styles.input}
            placeholder="Product Name"
            value={editedProduct.name}
            onChangeText={(text) => setEditedProduct({ ...editedProduct, name: text })}
          />

    
          <Text style={styles.label}>Category</Text>
          {categories.map((category, index) => (
            <View key={index} style={styles.radioButtonContainer}>
              <RadioButton
                value={category}
                status={editedProduct.category === category ? 'checked' : 'unchecked'}
                onPress={() => setEditedProduct({ ...editedProduct, category })}
              />
              <Text style={styles.radioButtonLabel}>{category}</Text>
            </View>
          ))}

    
          <TextInput
            style={styles.input}
            placeholder="Quantity"
            keyboardType="numeric"
            value={editedProduct.quantity.toString()}
            onChangeText={(text) => {
              if (/^\d*$/.test(text)) {
                setEditedProduct({ ...editedProduct, quantity: text });
              }
            }}
          />

    
          <TextInput
            style={styles.input}
            placeholder="Price"
            keyboardType="numeric"
            value={editedProduct.price.toString()}
            onChangeText={(text) => {
              if (/^\d*$/.test(text)) {
                setEditedProduct({ ...editedProduct, price: text });
              }
            }}
          />

    
          <View style={styles.modalButtons}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.addButton} onPress={handleSave}>
              <Text style={styles.buttonText}>Save Changes</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  radioButtonLabel: {
    fontSize: 16,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  cancelButton: {
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 10,
  },
  addButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    flex: 1,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default EditProductModal;