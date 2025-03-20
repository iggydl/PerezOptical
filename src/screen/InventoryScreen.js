import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';

const InventoryScreen = () => {
  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const products = [
    { id: '1', name: 'Pat Black', category: 'Eyewear', quantity: 25, price: '₹450.00', date: '2024-03-20' },
    { id: '2', name: 'Angel Jones', category: 'Lenses', quantity: 66, price: '₹325.00', date: '2024-03-19' },
    { id: '3', name: 'Max Edwards', category: 'Accessories', quantity: 3, price: '₹25.00', date: '2024-03-18' },
    { id: '4', name: 'Bruce Fox', category: 'Sunglasses', quantity: 120, price: '₹1500.00', date: '2024-03-17' },
    { id: '5', name: 'Devon Fisher', category: 'Frames', quantity: 15, price: '₹999.00', date: '2024-03-16' },
    { id: '6', name: 'Pat Black', category: 'Eyewear', quantity: 25, price: '₹450.00', date: '2024-03-20' },
    { id: '7', name: 'Angel Jones', category: 'Lenses', quantity: 66, price: '₹325.00', date: '2024-03-19' },
    { id: '8', name: 'Max Edwards', category: 'Accessories', quantity: 3, price: '₹25.00', date: '2024-03-18' },
    { id: '9', name: 'Bruce Fox', category: 'Sunglasses', quantity: 120, price: '₹1500.00', date: '2024-03-17' },
    { id: '10', name: 'Devon Fisher', category: 'Frames', quantity: 15, price: '₹999.00', date: '2024-03-16' },
  ];

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const displayedProducts = products.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <View style={{ flex: 1, padding: 16, backgroundColor: '#F8F8F8' }}>
      
      {/* Header */}
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
        <TouchableOpacity>
          <Text style={{ fontSize: 30 }}>☰</Text>
        </TouchableOpacity>
        <Text style={{ fontSize: 22, fontWeight: 'bold', marginLeft: 10, color: 'red' }}>PEREZ OPTICAL</Text>
        <TouchableOpacity style={{ marginLeft: 'auto' }}>
          <Text style={{ fontSize: 30 }}>👤</Text>
        </TouchableOpacity>
      </View>

      {/* Inventory Stats */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
        <View style={styles.card}>
          <Text>🛒 Total Products</Text>
          <Text style={styles.statNumber}>200</Text>
        </View>
        <View style={styles.card}>
          <Text>📦 Total Stocks</Text>
          <Text style={styles.statNumber}>200</Text>
        </View>
        <View style={styles.card}>
          <Text>📑 Available Stocks</Text>
          <Text style={styles.statNumber}>200</Text>
        </View>
      </View>

      {/* Product Listings */}
      <View style={{ backgroundColor: 'white', borderRadius: 10, padding: 10 }}>
        
        {/* Title & Add Button */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Product Listings</Text>
          <TouchableOpacity style={styles.addButton}>
            <Text style={{ color: 'white', fontSize: 16 }}>+ Add</Text>
          </TouchableOpacity>
        </View>
        
        {/* Search Bar */}
        <TextInput
          style={styles.searchBox}
          placeholder="Search Products"
          value={searchText}
          onChangeText={setSearchText}
        />

        {/* Product Table Headers */}
        <View style={styles.tableHeader}>
          <Text style={[styles.cell, { flex: 2 }]}>Product 🔽</Text>
          <Text style={[styles.cell, { flex: 2 }]}>Category 🔽</Text>
          <Text style={styles.cell}>Quantity 🔽</Text>
          <Text style={styles.cell}>Price 🔽</Text>
          <Text style={styles.cell}>Date 🔽</Text>
        </View>

        {/* Product Table Rows */}
        <FlatList
          data={displayedProducts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.row}>
              <TouchableOpacity>
                <Text style={styles.editIcon}>✏️</Text>
              </TouchableOpacity>
              <Text style={[styles.cell, { flex: 2 }]}>{item.name}</Text>
              <Text style={[styles.cell, { flex: 2 }]}>{item.category}</Text>
              <Text style={styles.cell}>{item.quantity}</Text>
              <Text style={styles.cell}>{item.price}</Text>
              <Text style={styles.cell}>{item.date}</Text>
            </View>
          )}
        />

        {/* Pagination */}
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

const styles = {
  card: {
    flex: 1,
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 5,
    elevation: 2,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 5,
  },
  addButton: {
    backgroundColor: 'red',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  searchBox: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 8,
    marginBottom: 10,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    paddingVertical: 8,
    paddingHorizontal: 5,
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    alignItems: 'center',
  },
  editIcon: {
    marginRight: 10,
    fontSize: 18,
  },
  cell: {
    flex: 1,
    fontSize: 14,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  pageText: {
    fontSize: 14,
    marginHorizontal: 10,
  },
  pageButton: {
    fontSize: 20,
    padding: 5,
  },
};

export default InventoryScreen;
