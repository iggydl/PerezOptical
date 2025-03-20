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
} from "react-native";
import { useNavigation } from '@react-navigation/native';

export default function OrdersScreen() {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(-250)).current; 
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  
  const [orders, setOrders] = useState(Array.from({ length: 20 }, (_, i) => ({
    date: `2024-0${(i % 9) + 1}-0${(i % 9) + 1}`,
    quantity: (i % 5) + 1,
    total: `${(i + 1) * 1500}`,
    status: ["Completed", "Pending", "Shipped", "Processing"][i % 4]
  })));

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

  return (
    <View style={styles.container}>
         {/* 🔹 Overlay when menu opens */}
              {isMenuVisible && <TouchableOpacity style={styles.overlay} onPress={closeMenu} />}
        
              {/* 🔹 Side Navigation Menu */}
              <Animated.View style={[styles.sideMenu, { transform: [{ translateX: slideAnim }] }]}>
                {/* 🔹 Profile Section */}
                <View style={styles.profileContainer}>
                  <Image source={require('../assets/img/profile.png')} style={styles.profileImage} />
                  <Text style={styles.profileName}>John Perez</Text>
                  <Text style={styles.profileRole}>Admin</Text>
                </View>
        
                {/* 🔹 Menu Items */}
                <TouchableOpacity style={[styles.menuItem]} onPress ={() => navigation.navigate("Dashboard")}>
                  <Text style={styles.menuText}>🏠 Dashboard</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("Orders")} style={styles.menuItem}>
                  <Text style={styles.menuText}>📦 Inventory</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("Orders")} style={[styles.menuItem, styles.activeMenuItem]}>
                  <Text style={styles.menuText}>🛒 Orders</Text>
                </TouchableOpacity >
                <TouchableOpacity style={styles.menuItem}>
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
        <TouchableOpacity onPress={openMenu}>
          <Image source={require("../assets/img/menu.png")} style={styles.icon} />
        </TouchableOpacity>
        <Text style={styles.logo}>PEREZ OPTICAL</Text>
        <TouchableOpacity>
          <Image source={require("../assets/img/profile.png")} style={styles.icon} />
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>Orders</Text>

      <View style={styles.searchContainer}>
        <TouchableOpacity style={styles.sortButton} onPress={handleSort}>
          <Text style={styles.sortText}>Sort</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.searchInput}
          placeholder="Search by Price, Status, or Quantity"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <ScrollView style={styles.orderList}>
        <View style={styles.tableHeader}>
          <Text style={[styles.tableHeaderText, styles.columnDate]}>Created</Text>
          <Text style={[styles.tableHeaderText, styles.columnQuantity]}>Qty</Text>
          <Text style={[styles.tableHeaderText, styles.columnTotal]}>Total</Text>
          <Text style={[styles.tableHeaderText, styles.columnStatus]}>Status</Text>
          <Text style={[styles.tableHeaderText, styles.columnActions]}>Actions</Text>
        </View>

        {filteredOrders.map((order, index) => (
          <View key={index} style={styles.orderRow}>
            <Text style={[styles.orderText, styles.columnDate]}>{order.date}</Text>
            <Text style={[styles.orderText, styles.columnQuantity]}>{order.quantity}</Text>
            <Text style={[styles.orderText, styles.columnTotal]}>₱ {order.total}</Text>
            <Text style={[styles.orderText, styles.columnStatus]}>{order.status}</Text>
            <TouchableOpacity style={[ styles.columnStatus]}>
              <Image source={require("../assets/img/openeye.png")} style={styles.eyeIcon} />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    
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

  // 🔹 Profile Section
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

  // 🔹 Menu Items
  menuItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  menuText: {
    fontSize: 16,
    color: '#ddd',
  },

  // 🔹 Active Menu Item
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
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 15, backgroundColor: '#D24D57' },
  icon: {
    width: 30,
    height: 30,
  },
  logo: {
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
  },
  summaryCard: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 15,
    marginHorizontal: 5,
    borderRadius: 10,
    alignItems: "center",
    elevation: 3,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 15,
    paddingHorizontal: 15,
    paddingTop: 20,
  },
  sortButton: {
    backgroundColor: "#D21818",
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
    elevation: 2,
  },
  orderList: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    paddingHorizontal: 15,
    paddingTop: 20,
  },
  tableHeader: {
    flexDirection: "row",
    borderBottomWidth: 1,
    paddingBottom: 10,
    fontWeight: "bold",
    textAlign: "center",
    
  },
  tableHeaderText: {
    fontWeight: "bold",
    textAlign: "left",
  },
  orderRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  orderText: {
    textAlign: "center",
    paddingHorizontal: 10,
    flexWrap: "wrap",
  },
  eyeIcon: {
    width: 25,
    height: 25,
    tintColor: "#6113BC",
    marginLeft: 5,
  },
 
  columnDate: { flex: 2 , alignItems: "center"},
 
  columnQuantity: { flex: 2, alignItems: "center" },
  columnTotal: { flex: 2 , alignItems: "center"},
  columnStatus: { flex: 2 , alignItems: "center"},
  columnActions: { flex: 2, alignItems: "center" },
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
});
