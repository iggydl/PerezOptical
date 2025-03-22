import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
  Animated,
  Alert,
  Modal,
} from "react-native";
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';

export default function OrdersScreen() {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(-250)).current;
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const getRandomName = () => {
    const firstNames = ["John", "Jane", "Michael", "Sarah", "David", "Emily", "Robert", "Emma", "Chris", "Olivia"];
    const lastNames = ["Smith", "Johnson", "Brown", "Davis", "Miller", "Wilson", "Moore", "Taylor", "Anderson", "Thomas"];
    const randomFirstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const randomLastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    return `${randomFirstName} ${randomLastName}`;
  };

  const [orders, setOrders] = useState(
    Array.from({ length: 20 }, (_, i) => ({
      id: i + 1,
      date: `2024-0${(i % 9) + 1}-0${(i % 9) + 1}`,
      quantity: (i % 5) + 1,
      total: `${(i + 1) * 1500}`,
      status: ["Completed", "Pending", "Shipped", "Processing"][i % 4],
      name: getRandomName(),
      address: `123 Street, City ${i + 1}`,
      paymentMethod: i % 2 === 0 ? "Credit Card" : "Cash on Delivery",
    }))
  );

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const openModal = (order) => {
    setSelectedOrder(order);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedOrder(null);
  };

  const handleStatusChange = (newStatus) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === selectedOrder.id ? { ...order, status: newStatus } : order
      )
    );
    setSelectedOrder({ ...selectedOrder, status: newStatus });
  };

  const handleLogout = () => {
    Alert.alert("Success", "Logout successfully!", [
      { text: "OK", onPress: () => navigation.navigate("RegisterScreen") }
    ]);
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

  const handleSort = () => {
    const sortedOrders = [...orders].sort((a, b) => {
      return sortOrder === "asc" ? new Date(a.date) - new Date(b.date) : new Date(b.date) - new Date(a.date);
    });
    setOrders(sortedOrders);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const filteredOrders = orders.filter(order =>
    order.total.includes(searchQuery) || order.status.toLowerCase().includes(searchQuery.toLowerCase()) || order.quantity.toString().includes(searchQuery)
  );


  const totalOrders = orders.length;
  const ShipOrders = orders.filter(order => order.status === "Shipped").length;
  const pendingOrders = orders.filter(order => order.status === "Pending").length;
  const deliveredOrders = orders.filter(order => order.status === "Delivered").length;
  const cancelledOrders = orders.filter(order => order.status === "Cancelled").length;

  return (
    <View style={{ flex: 1, backgroundColor: '#F8F8F8' }}>
      {isMenuVisible && <TouchableOpacity style={styles.overlay} onPress={closeMenu} />}

      <Animated.View style={[styles.sideMenu, { transform: [{ translateX: slideAnim }] }]}>
        <View style={styles.profileContainer}>
          <Image source={require('../assets/img/admin_profile.png')} style={styles.profileImage} />
          <Text style={styles.profileName}>John Perez</Text>
          <Text style={styles.profileRole}>Admin</Text>
        </View>

        {/* 🔹 Menu Items */}
        <TouchableOpacity style={[styles.menuItem]} onPress={() => navigation.navigate("Dashboard")}>
          <Text style={styles.menuText}>🏠 Dashboard</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Inventory")} style={styles.menuItem}>
          <Text style={styles.menuText}>📦 Inventory</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Orders")} style={[styles.menuItem, styles.activeMenuItem]}>
          <Text style={styles.menuText}>🛒 Orders</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Appointment")} style={styles.menuItem}>
          <Text style={styles.menuText}>📅 Appointment</Text>
        </TouchableOpacity>

        {/* 🔹 Bottom Section */}
        <View style={styles.bottomMenu}>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>⚙️ Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleLogout} style={styles.menuItem}>
            <Text style={styles.menuText}>🚪 Log Out</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>

      <View style={styles.header}>
        <TouchableOpacity onPress={openMenu} style={{ marginTop: 20 }}>
          <Image source={require("../assets/img/menu.png")} style={styles.icon} />
        </TouchableOpacity>
        <Image source={require("../assets/img/logo.png")} style={styles.logo} />
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ fontSize: 30, fontWeight: 'bold', marginTop: 10 }}>Orders</Text>
          <TouchableOpacity style={{ marginLeft: 225, marginTop: 10 }}>
            <Image source={require("../assets/img/admin_profile.png")} style={{ width: 40, height: 40 }} />
          </TouchableOpacity>
        </View>
      </View>

      {/* 🔹 Total Orders Summary */}
      <View style={styles.summaryContainer}>
        <View style={styles.summaryCard}>
         <Image source={require('../assets/img/totalproduct.png')}  />
          <Text style={styles.summaryTitle}>Total Orders</Text>
          <Text style={styles.summaryValue}>{totalOrders}</Text>
        </View>
        <View style={styles.summaryCard}>
         <Image source={require('../assets/img/pending.png')}  />
          <Text style={styles.summaryTitle}>Pending</Text>
          <Text style={styles.summaryValue}>{pendingOrders}</Text>
        </View>
        <View style={styles.summaryCard}>
           <Image source={require('../assets/img/shipped.png')}  />
          <Text style={styles.summaryTitle}>Shipped</Text>
          <Text style={styles.summaryValue}>{ShipOrders}</Text>
        </View>
        <View style={styles.summaryCard}>
        <Image source={require('../assets/img/delivery.png')} />
          <Text style={styles.summaryTitle}>Delivered</Text>
          <Text style={styles.summaryValue}>{deliveredOrders}</Text>
        </View>
        <View style={styles.summaryCard}>
           <Image source={require('../assets/img/cancelledd.png')}  />
          <Text style={styles.summaryTitle}>Cancelled</Text>
          <Text style={styles.summaryValue}>{cancelledOrders}</Text>
        </View>
      </View>

      {/* 🔹 Order List */}
      <View style={{ backgroundColor: 'white', borderRadius: 10, padding: 10 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Order List</Text>
          <TouchableOpacity style={styles.sortButton} onPress={handleSort}>
            <Text style={styles.sortText}>Sort</Text>
          </TouchableOpacity>
        </View>

        <TextInput
          style={styles.searchInput}
          placeholder="Search by Price, Status, or Quantity"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />

        <ScrollView style={styles.orderList}>
          <View style={styles.tableHeader}>
            <Text style={[styles.cell, styles.columnDate]}>Created</Text>
            <Text style={[styles.cell, styles.columnQuantity]}>Qty</Text>
            <Text style={[styles.cell, styles.columnTotal]}>Total</Text>
            <Text style={[styles.cell, styles.columnStatus]}>Status</Text>
            <Text style={[styles.cell, styles.columnActions]}>Actions</Text>
          </View>

          {filteredOrders.map((order, index) => (
            <View key={index} style={styles.orderRow}>
              <Text style={[styles.cell, styles.columnDate]}>{order.date}</Text>
              <Text style={[styles.cell, styles.columnQuantity]}>{order.quantity}</Text>
              <Text style={[styles.cell, styles.columnTotal]}>₱ {order.total}</Text>
              <Text style={[styles.cell, styles.columnStatus]}>{order.status}</Text>
              <TouchableOpacity style={[styles.columnActions]} onPress={() => openModal(order)}>
                <Image source={require("../assets/img/editproduct.png")} style={styles.eyeIcon} />
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>

    
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
  <View style={styles.modalContainer}>
    <View style={styles.modalContent}>
      <Text style={styles.modalTitle}>Order Details</Text>
      {selectedOrder && (
        <>
          <Text>Name: {selectedOrder.name}</Text>
          <Text>Address: {selectedOrder.address}</Text>
          <Text>Payment Method: {selectedOrder.paymentMethod}</Text>
          <Text>Total: ₱ {selectedOrder.total}</Text>
          <Text>Status:</Text>
          <Picker
            selectedValue={selectedOrder.status}
            onValueChange={(newStatus) => {
          
              setSelectedOrder({ ...selectedOrder, status: newStatus });
            }}
          >
            <Picker.Item label="Pending" value="Pending" />
            <Picker.Item label="Shipped" value="Shipped" />
            <Picker.Item label="Processing" value="Processing" />
            <Picker.Item label="Delivered" value="Delivered" />
            <Picker.Item label="Cancelled" value="Cancelled" />
          </Picker>
          <TouchableOpacity
            style={styles.confirmButton}
            onPress={() => {
            
              if (selectedOrder.status === orders.find(order => order.id === selectedOrder.id)?.status) {
              
                closeModal();
              } else {
              
                Alert.alert(
                  "Update Status",
                  "Are you sure you want to update the status?",
                  [
                    {
                      text: "Cancel",
                      style: "cancel",
                    },
                    {
                      text: "Confirm",
                      onPress: () => {
                  
                        handleStatusChange(selectedOrder.status); 
                        closeModal();
                        Alert.alert("Success", "Order status updated successfully!");
                      },
                    },
                  ]
                );
              }
            }}
          >
            <Text style={styles.closeText}>Confirm</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
            <Text style={styles.closeText}>Close</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  </View>
</Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  closeButton: {
    marginTop: 10,
    backgroundColor: "#D24D57",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  confirmButton: {
    marginTop: 10,
    backgroundColor: "green",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  closeText: {
    color: "#fff",
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  orderRow: {
    flexDirection: 'row',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    alignItems: 'center',
  },
  sortButton: {
    backgroundColor: 'red',
    paddingVertical: 5,
    paddingHorizontal: 25,
    borderRadius: 5,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 9,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 5,
  },
  profileName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  profileRole: {
    color: '#bbb',
    fontSize: 14,
  },
  cell: {
    flex: 1,
    fontSize: 11,
  },
  menuItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  menuText: {
    fontSize: 16,
    color: '#ddd',
  },
  activeMenuItem: {
    backgroundColor: '#D24D57',
  },
  activeMenuText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  bottomMenu: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    width: '100%',
    padding: 20,
    backgroundColor: 'white',
    flexWrap: 'wrap',
  },
  icon: {
    width: 30,
    height: 30,
  },
  logo: {
    marginTop: 20,
    width: 250,
    height: 40,
    marginLeft: 20,
    fontSize: 18,
    fontWeight: "bold",
    color: "#D21818",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 10,
  },
  summaryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
    marginBottom:15,
    paddingHorizontal: 10,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 5,
    marginHorizontal: 5,
    borderRadius: 10,
    alignItems: "center",
    elevation: 2,
  },
  summaryTitle: {
    fontSize: 10,
    fontWeight:'bold',
    color: '#666',
    marginBottom: 5,
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  eyeIcon: {
    width: 25,
    height: 25,
    tintColor: "#D24D57",
  },
  columnDate: { flex: 2, alignItems: "center" },
  columnQuantity: { flex: 2, alignItems: "center" },
  columnTotal: { flex: 2, alignItems: "center" },
  columnStatus: { flex: 2, alignItems: "center" },
  columnActions: { flex: 1, alignItems: "center" },
  sideMenu: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 250,
    backgroundColor: '#1E1E1E',
    paddingTop: 50,
    elevation: 10,
    zIndex: 10,
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
  searchInput: {
    width: '100%',
  },
});