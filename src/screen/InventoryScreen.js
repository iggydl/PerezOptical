import React, { useState ,useRef} from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, Image, ScrollView,StyleSheet, Animated ,Alert,Modal} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {RadioButton} from 'react-native-paper';
import { styles } from '../styles/Inventorystyle';
import EditProductModal from './EditproductModal';
const InventoryScreen = () => {
  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(-250)).current; 
  const [isAddModalVisible, setIsAddModalVisible] = useState(false); 
  const navigation = useNavigation();
  const [isEditModalVisible, setIsEditModalVisible] = useState(false); // State for edit modal visibility
  const [editingProduct, setEditingProduct] = useState(null); // State for the product being edited
  const [newProduct, setNewProduct] = useState({ 
    name: '',
    category: '',
    quantity: '',
    price: '',
  });
  const categories = [
    'Eyeglasses',
    'Sunglasses',
    'Reading Glasses',
    'Contact Lens & Solution',
    'Accessories',
  ];


  const handleLogout = () => {
    Alert.alert("Success", "Logout successfully!", [
      { text: "OK", onPress: () => navigation.navigate("RegisterScreen") }
    ]);
  };
  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.category || !newProduct.quantity || !newProduct.price) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

  
    const updatedProducts = [
      ...products,
      {
        id: (products.length + 1).toString(), 
        name: newProduct.name,
        category: newProduct.category,
        quantity: parseInt(newProduct.quantity, 10),
        price: newProduct.price,
        date: new Date().toISOString().split('T')[0], 
      },
    ];
    setProducts(updatedProducts);
    setNewProduct({ name: '', category: '', quantity: '', price: '' });
    setIsAddModalVisible(false);
  };

  const openEditModal = (product) => {
    setEditingProduct(product || {
      id: '',
      name: '',
      category: '',
      quantity: '',
      price: '',
    });
    setIsEditModalVisible(true);
  };

  // Function to handle updating a product
  const handleUpdateProduct = (updatedProduct) => {
    const updatedProducts = products.map((item) =>
      item.id === updatedProduct.id ? { ...updatedProduct, quantity: parseInt(updatedProduct.quantity, 10) } : item
    );
    setProducts(updatedProducts);
    setIsEditModalVisible(false);
  };

  const openAddModal = () => {
    setIsAddModalVisible(true);
  };


  const closeAddModal = () => {
    setIsAddModalVisible(false);
  };

  const openMenu = () => {
    setIsMenuVisible(true);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeMenu = () => {
    Animated.timing(slideAnim, {
      toValue: -250,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setIsMenuVisible(false));

  };
  const handleDeleteProduct = (productId) => {
    Alert.alert(
      'Delete Product',
      'Are you sure you want to delete this product?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            const updatedProducts = products.filter((item) => item.id !== productId);
            setProducts(updatedProducts);
          },
        },
      ]
    );
  };
  const [products, setProducts] = useState([
    { id: '1', name: 'Pat Black', category: 'Eyewear', quantity: 25, price: '450', date: '2024-03-20' },
    { id: '2', name: 'Angel Jones', category: 'Lenses', quantity: 66, price: '325', date: '2024-03-19' },
    { id: '3', name: 'Max Edwards', category: 'Accessories', quantity: 3, price: '25', date: '2024-03-18' },
    { id: '4', name: 'Bruce Fox', category: 'Sunglasses', quantity: 120, price: '1500', date: '2024-03-17' },
    { id: '5', name: 'Devon Fisher', category: 'Frames', quantity: 15, price: '999', date: '2024-03-16' },
    { id: '6', name: 'Pat Black', category: 'Eyewear', quantity: 25, price: '450', date: '2024-03-20' },
    { id: '7', name: 'Angel Jones', category: 'Lenses', quantity: 66, price: '325', date: '2024-03-19' },
    { id: '8', name: 'Max Edwards', category: 'Accessories', quantity: 3, price: '25', date: '2024-03-18' },
    { id: '9', name: 'Bruce Fox', category: 'Sunglasses', quantity: 120, price: '1500', date: '2024-03-17' },
    { id: '10', name: 'Devon Fisher', category: 'Frames', quantity: 15, price: '999', date: '2024-03-16' },
  ]);

  const getAvailability = (quantity) => {
    if (quantity === 0) return 'Out of Stock';
    if (quantity < 20) return 'Low';
    if (quantity < 50) return 'Medium';
    return 'High';
  };

  const filteredProducts = products.filter((item) => {
    const availability = getAvailability(item.quantity).toLowerCase();
    const searchTextLower = searchText.toLowerCase();

    return (
      item.name.toLowerCase().includes(searchTextLower) ||
      item.category.toLowerCase().includes(searchTextLower) ||
      availability.includes(searchTextLower) ||
      item.price.toString().includes(searchText)
    );
  });

  const totalStocks = products.reduce((sum, item) => sum + item.quantity, 0);
  const availableStocks = totalStocks;
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const displayedProducts = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <View style={{ flex: 1,  backgroundColor: '#F8F8F8' }}>

    <EditProductModal
     isVisible={isEditModalVisible}
      onClose={() => setIsEditModalVisible(false)}
      product={editingProduct} // Ensure this is not null
      onSave={handleUpdateProduct}
      categories={categories}
    />
      
      <Modal visible={isAddModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add New Product</Text>

         
            <TextInput
              style={styles.input}
              placeholder="Product Name"
              value={newProduct.name}
              onChangeText={(text) => setNewProduct({ ...newProduct, name: text })}
            />

          
            <Text style={styles.label}>Category</Text>
            {categories.map((category, index) => (
              <View key={index} style={styles.radioButtonContainer}>
                <RadioButton
                  value={category}
                  status={newProduct.category === category ? 'checked' : 'unchecked'}
                  onPress={() => setNewProduct({ ...newProduct, category })}
                />
                <Text style={styles.radioButtonLabel}>{category}</Text>
              </View>
            ))}

            {/* Quantity Input */}
            <TextInput
              style={styles.input}
              placeholder="Quantity"
              keyboardType="numeric"
              value={newProduct.quantity}
              onChangeText={(text) => {
                if (/^\d*$/.test(text)) { // Allow only numbers
                  setNewProduct({ ...newProduct, quantity: text });
                }
              }}
            />

            {/* Price Input */}
            <TextInput
              style={styles.input}
              placeholder="Price"
              keyboardType="numeric"
              value={newProduct.price}
              onChangeText={(text) => {
                if (/^\d*$/.test(text)) { 
                  setNewProduct({ ...newProduct, price: text });
                }
              }}
            />

            {/* Buttons */}
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.cancelButton} onPress={() => setIsAddModalVisible(false)}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.addButton} onPress={handleAddProduct}>
                <Text style={styles.buttonText}>Add Product</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
              
            <View style={styles.header}>
              <TouchableOpacity onPress={openMenu} style={{marginTop:20,}}>
                <Image source={require("../assets/img/menu.png")} style={styles.icon} />
              </TouchableOpacity>
              <Image source={require("../assets/img/logo.png")} style={styles.logo} />
             <View style={{flexDirection:'row',alignItems:'center',
             }}>
            <Text style={{fontSize:30,fontWeight:'bold',marginTop: 10,}}>Inventory</Text>
            <TouchableOpacity style={{marginLeft:190,marginTop: 10,}}>
                <Image source={require("../assets/img/admin_profile.png")} style={{width:40,height:40}} />
              </TouchableOpacity>
              </View>
            </View>
           
            {isMenuVisible && <TouchableOpacity style={styles.overlay} onPress={closeMenu} />}
                    <Animated.View style={[styles.sideMenu, { transform: [{ translateX: slideAnim }] }]}>
                 
                      <View style={styles.profileContainer}>
                        <Image source={require('../assets/img/admin_profile.png')} style={styles.profileImage} />
                        <Text style={styles.profileName}>John Perez</Text>
                        <Text style={styles.profileRole}>Admin</Text>
                      </View>
              
                   
                      <TouchableOpacity style={[styles.menuItem]} onPress ={() => navigation.navigate("Dashboard")}>
                        <Text style={styles.menuText}>🏠 Dashboard</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => navigation.navigate("Inventory")} style={[styles.menuItem, styles.activeMenuItem]}>
                        <Text style={styles.menuText}>📦 Inventory</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => navigation.navigate("Orders")} style={[styles.menuItem]}>
                        <Text style={styles.menuText}>🛒 Orders</Text>
                      </TouchableOpacity >
                      <TouchableOpacity onPress={() => navigation.navigate("Appointment")} style={styles.menuItem}>
                        <Text style={styles.menuText}>📅 Appointment</Text>
                      </TouchableOpacity>
              
                  
                      <View style={styles.bottomMenu}>
                        <TouchableOpacity style={styles.menuItem}>
                          <Text style={styles.menuText}>⚙️ Settings</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleLogout} style={styles.menuItem}>
                          <Text style={styles.menuText}>🚪 Log Out</Text>
                        </TouchableOpacity>
                      </View>
                    </Animated.View>
    
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
      <View style={styles.card}>
  <Text style={styles.editIcon}>🛒</Text>
  <Text >Total Products</Text>
  <Text style={styles.statNumber}>{products.length}</Text>
</View>
        <View style={styles.card}>
  <Text style={styles.editIcon}>📦</Text>
  <Text style={{ textAlign: 'center' }}>Total Stocks</Text>
  <Text style={styles.statNumber}>{totalStocks}</Text>
</View>

<View style={styles.card}>
  <Text style={styles.editIcon}>📑</Text>
  <Text style={{ textAlign: 'center',fontSize:13 }}>Available Stocks</Text>
  <Text style={styles.statNumber}>{availableStocks}</Text>
</View>
</View>
      <View style={{ backgroundColor: 'white', borderRadius: 10, padding: 10 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Product Listings</Text>
          <TouchableOpacity style={styles.addButton} onPress={openAddModal}>
            <Text style={{ color: 'white', fontSize: 16 }}>+ Add</Text>
          </TouchableOpacity>
        </View>
        
      
        <TextInput
        style={styles.searchBox}
        placeholder="Search by Name, Category, Availability, or Price"
        value={searchText}
        onChangeText={setSearchText}
      />

        <View style={styles.tableHeader}>
          <Text style={[styles.cell, { flex: 1 }]}>Product</Text>
          <Text style={[styles.cell, { flex: 1 }]}>Category</Text>
          <Text style={[styles.cell, { flex: 1 }]}>Stocks</Text>
          <Text style={[styles.cell, { flex: 1 }]}>Price</Text>
          <Text style={[styles.cell, { flex: 1 }]}>Availability</Text>
          <Text style={[styles.cell, { flex: 1 }]}>Actions</Text>
         
        </View>

     
        <FlatList
          data={displayedProducts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.row}>
              
              <Text style={[styles.cell, { flex: 1 }]}>{item.name}</Text>
              <Text style={[styles.cell, { flex: 1 }]}>{item.category}</Text>
              <Text style={[styles.cell, { flex: 1 }]}>{item.quantity}</Text>
              
              <Text style={[styles.cell, { flex: 1 }]}>₱{item.price}</Text>
              <Text style={[styles.cell, { flex: 1 }]}>{getAvailability(item.quantity)}</Text>
              <TouchableOpacity onPress={() => openEditModal(item)}>
              <Image source={require('../assets/img/editproduct.png')} style={styles.editIcon} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDeleteProduct(item.id)}>
              <Image source={require('../assets/img/delete.png')} style={styles.editIcon} />
              </TouchableOpacity>
              
            </View>
          )}
        />
        <View style={styles.pagination}>
          <TouchableOpacity
            disabled={currentPage === 1}
            onPress={() => setCurrentPage(currentPage - 1)}
          >
            <Text style={styles.pageButton}>{'⬅'}</Text>
          </TouchableOpacity>
          <Text style={styles.pageText}>Page {currentPage} of {totalPages}</Text>
          <TouchableOpacity
            disabled={currentPage === totalPages}
            onPress={() => setCurrentPage(currentPage + 1)}
          >
            <Text style={styles.pageButton}>{'➡'}</Text>
          </TouchableOpacity>
        </View>
      </View>
      
     
    </View>
  );
};

export default InventoryScreen;
