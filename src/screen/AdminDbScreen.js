import React, { useState, useRef } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, Dimensions, Animated } from 'react-native';
import { BarChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get("window").width;

export default function DashboardScreen() {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(-250)).current; 

  // Open Side Menu
  const openMenu = () => {
    setIsMenuVisible(true);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  // Close Side Menu
  const closeMenu = () => {
    Animated.timing(slideAnim, {
      toValue: -250,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setIsMenuVisible(false));
  };

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
        <TouchableOpacity style={[styles.menuItem, styles.activeMenuItem]}>
          <Text style={styles.activeMenuText}>🏠 Dashboard</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>📦 Inventory</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>🛒 Orders</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>📅 Appointment</Text>
        </TouchableOpacity>

        {/* 🔹 Bottom Section */}
        <View style={styles.bottomMenu}>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>⚙️ Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>🚪 Log Out</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>

      {/* 🔹 Main Dashboard Content */}
      <ScrollView style={styles.content}>
        <View style={styles.header}>
          <TouchableOpacity onPress={openMenu}>
            <Image source={require('../assets/img/menu.png')} style={styles.icon} />
          </TouchableOpacity>
          <Text style={styles.title}>Dashboard</Text>
          <TouchableOpacity>
            <Image source={require('../assets/img/profile.png')} style={styles.icon} />
          </TouchableOpacity>
        </View>

        {/* 🔹 Sales Overview */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Sales Overview</Text>
          <View style={styles.row}>
            <TouchableOpacity style={styles.statCard}>
              <Image source={require('../assets/img/search.png')} style={styles.smallIcon} />
              <Text>Sales: ₱20,000</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.statCard}>
              <Image source={require('../assets/img/search.png')} style={styles.smallIcon} />
              <Text>Profit: ₱20,000</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* 🔹 Appointment Overview */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Appointment Overview</Text>
          <View style={styles.row}>
            <TouchableOpacity style={styles.statCard}>
              <Text>📅 All: 20</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.statCard}>
              <Text>⭐ New: 5</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* 🔹 Sales Chart */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Sales and Purchase</Text>
          <BarChart
            data={{
              labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
              datasets: [{ data: [50000, 48000, 52000, 51000, 49000, 47000, 45000] }],
            }}
            width={screenWidth - 40}
            height={220}
            yAxisLabel="₱"
            chartConfig={{
              backgroundColor: "#fff",
              backgroundGradientFrom: "#fff",
              backgroundGradientTo: "#fff",
              color: () => `#D24D57`,
              decimalPlaces: 0,
            }}
            style={styles.chart}
          />
        </View>

        {/* 🔹 Stock Summaries (Restored) */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Stock Summaries</Text>
          <View style={styles.stockRow}>
            <Image source={require('../assets/img/glasses.jpg')} style={styles.stockIcon} />
            <Text>Anti-Radiation: 10 (Low)</Text>
          </View>
          <View style={styles.stockRow}>
            <Image source={require('../assets/img/banner.jpg')} style={styles.stockIcon} />
            <Text>Optical: 0 (Out of Stock)</Text>
          </View>
        </View>
      </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f4f4' },

  // 🔹 Sidebar Styles (Dark Theme)
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

  // 🔹 Bottom Menu Section
  bottomMenu: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
  },

  // 🔹 Header
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 15, backgroundColor: '#D24D57' },
  title: { fontSize: 22, fontWeight: 'bold', color: 'white' },
  icon: { width: 30, height: 30 },

  // 🔹 Card & Sections
  card: { backgroundColor: '#fff', padding: 15, borderRadius: 12, marginVertical: 10, marginHorizontal: 10 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#333', marginBottom: 10 },

  // 🔹 Chart Fix
  chart: { borderRadius: 10, marginTop: 10 },

  // 🔹 Stock Summary Fix
  stockRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 5 },
  stockIcon: { width: 20, height: 20, marginRight: 10 },
});

