import React, { useState, useRef } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, Dimensions, Animated,Alert } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { useNavigation } from '@react-navigation/native';


export default function DashboardScreen() {
  const screenWidth = Dimensions.get("window").width;
  const navigation = useNavigation();
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(-250)).current; 
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
  const [selectedPeriod, setSelectedPeriod] = useState("daily");


const chartData = {
  daily: {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    data: [50000, 48000, 52000, 51000, 49000, 47000, 45000],
  },
  weekly: {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    data: [100000,150000,200000,300000],
  },
  monthly: {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    data: [900000, 850000, 950000, 920000, 880000, 870000, 860000],
  },
  yearly: {
    labels: ["2019", "2020", "2021", "2022", "2023", "2024", "2025"],
    data: [900000, 850000, 950000, 920000, 880000, 870000, 860000],
  },
};

  return (
    <View style={{ flex: 1,  backgroundColor: '#F8F8F8' }}>

      {/* 🔹 Overlay when menu opens */}
      {isMenuVisible && <TouchableOpacity style={styles.overlay} onPress={closeMenu} />}

      {/* 🔹 Side Navigation Menu */}
      <Animated.View style={[styles.sideMenu, { transform: [{ translateX: slideAnim }] }]}>
        {/* 🔹 Profile Section */}
        <View style={styles.profileContainer}>
          <Image source={require('../assets/img/admin_profile.png')} style={styles.profileImage} />
          <Text style={styles.profileName}>John Perez</Text>
          <Text style={styles.profileRole}>Admin</Text>
        </View>

        {/* 🔹 Menu Items */}
        <TouchableOpacity style={[styles.menuItem, styles.activeMenuItem]}>
          <Text style={styles.activeMenuText}>🏠 Dashboard</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Inventory")} style={styles.menuItem}>
          <Text style={styles.menuText}>📦 Inventory</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Orders")} style={styles.menuItem}>
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

      {/* 🔹 Main Dashboard Content */}
      <ScrollView style={styles.content}>
             
                    <View style={styles.header}>
                      <TouchableOpacity onPress={openMenu} style={{marginTop:20,}}>
                        <Image source={require("../assets/img/menu.png")} style={styles.icon} />
                      </TouchableOpacity>
                      <Image source={require("../assets/img/logo.png")} style={styles.logo} />
                     <View style={{flexDirection:'row',alignItems:'center',
                     }}>
                    <Text style={{fontSize:30,fontWeight:'bold',marginTop: 20,}}>Dashboard</Text>
                    <TouchableOpacity style={{marginLeft:170,marginTop: 20,}}>
                        <Image source={require("../assets/img/admin_profile.png")} style={{width:40,height:40}} />
                      </TouchableOpacity>
                      </View>
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
            <TouchableOpacity style={styles.statCard}>
              <Image source={require('../assets/img/search.png')} style={styles.smallIcon} />
              <Text>Profit: ₱20,000</Text>
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
            
              <Text style={styles.statCard}>📅 All: 20</Text>
            
            
              <Text style={styles.statCard}>⭐ New: 5</Text>
            
          </View>
        </View>

        <View style={styles.card}>
  <Text style={styles.sectionTitle}>Sales and Purchase</Text>

  {/* 🔹 Chart Filter Buttons */}
  <View style={styles.filterRow}>
    {["daily", "weekly", "monthly", "yearly"].map((period) => (
      <TouchableOpacity
        key={period}
        style={[
          styles.filterButton,
          selectedPeriod === period && styles.activeFilterButton,
        ]}
        onPress={() => setSelectedPeriod(period)}
      >
        <Text
          style={[
            styles.filterText,
            selectedPeriod === period && styles.activeFilterText,
          ]}
        >
          {period.charAt(0).toUpperCase() + period.slice(1)}
        </Text>
      </TouchableOpacity>
    ))}
  </View>

  {/* 🔹 Bar Chart */}
  <BarChart
    data={{
      labels: chartData[selectedPeriod].labels,
      datasets: [{ data: chartData[selectedPeriod].data }],
    }}
    width={screenWidth - 40}
    height={220}
    yAxisLabel="₱ "
    chartConfig={{
      backgroundColor: "#fff",
      backgroundGradientFrom: "#fff",
      backgroundGradientTo: "#fff",
      color: () => `#D24D57`,
      decimalPlaces: 0,
    }}
    style={styles.chart}
  />
</View>;

        
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

  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap:  60, // Adjust the spacing as needed
    marginLeft: 50,
  },
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
  filterRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 10,
    backgroundColor: "#e0e0e0",
  },
  activeFilterButton: {
    backgroundColor: "#D24D57",
  },
  filterText: {
    fontSize: 14,
    color: "#333",
  },
  activeFilterText: {
    color: "#fff",
    fontWeight: "bold",
  },

  
  header: { flexDirection: 'row',width:'100%',padding: 20,  backgroundColor: 'white', flexWrap:'wrap', },
  title: { fontSize: 22, fontWeight: 'bold', color: 'white' },
  icon: { width: 30, height: 30 },
  logo: { width: 250, height: 35 ,marginTop:20,marginLeft:30},

  // 🔹 Card & Sections
  card: { backgroundColor: '#fff', padding: 15, borderRadius: 12, marginVertical: 10, marginHorizontal: 10 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#333', marginBottom: 10 },

  // 🔹 Chart Fix
  chart: { borderRadius: 10, marginTop: 10 },

  // 🔹 Stock Summary Fix
  stockRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 5 },
  stockIcon: { width: 20, height: 20, marginRight: 10 },
});

