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

  const [products, setProducts] = useState([
    { id: '1', name: 'Ray-Ban Aviator', category: 'Eyeglasses', quantity: 25, price: '450', date: '2024-03-20' },
    { id: '2', name: 'Oakley Holbrook', category: 'Sunglasses', quantity: 66, price: '325', date: '2024-03-19' },
    { id: '3', name: 'Foster Grant Readers', category: 'Reading Glasses', quantity: 3, price: '25', date: '2024-03-18' },
    { id: '4', name: 'Acuvue Oasys', category: 'Contact Lens & Solution', quantity: 120, price: '1500', date: '2024-03-17' },
    { id: '5', name: 'Microfiber Cleaning Cloth', category: 'Accessories', quantity: 15, price: '999', date: '2024-03-16' },
    { id: '6', name: 'Warby Parker Haskell', category: 'Eyeglasses', quantity: 25, price: '450', date: '2024-03-20' },
    { id: '7', name: 'Maui Jim Peahi', category: 'Sunglasses', quantity: 66, price: '325', date: '2024-03-19' },
    { id: '8', name: 'Magnivision Readers', category: 'Reading Glasses', quantity: 3, price: '25', date: '2024-03-18' },
    { id: '9', name: 'Dailies AquaComfort Plus', category: 'Contact Lens & Solution', quantity: 120, price: '1500', date: '2024-03-17' },
    { id: '10', name: 'Eyeglass Repair Kit', category: 'Accessories', quantity: 15, price: '999', date: '2024-03-16' },
  ]);
  const getAvailability = (quantity) => {
    if (quantity === 0) return 'Out of Stock';
    if (quantity < 20) return 'Low';
    if (quantity < 50) return 'Medium';
    return 'High';
  };
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
    data: [350000, 400000, 450000, 490000, 200000, 550000, 500000],
  },
  yearly: {
    labels: ["2019", "2020", "2021", "2022", "2023", "2024", "2025"],
    data: [900000, 850000, 950000, 920000, 880000, 870000, 860000],
  },
};
const groupedProducts = products.reduce((acc, product) => {
  if (!acc[product.category]) {
    acc[product.category] = [];
  }
  acc[product.category].push(product);
  return acc;
}, {});
  return (
    <View style={{ flex: 1,  backgroundColor: '#F8F8F8' }}>

   
      {isMenuVisible && <TouchableOpacity style={styles.overlay} onPress={closeMenu} />}

     
      <Animated.View style={[styles.sideMenu, { transform: [{ translateX: slideAnim }] }]}>
   
        <View style={styles.profileContainer}>
          <Image source={require('../assets/img/admin_profile.png')} style={styles.profileImage} />
          <Text style={styles.profileName}>John Perez</Text>
          <Text style={styles.profileRole}>Admin</Text>
        </View>

 
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

      
        <View style={styles.bottomMenu}>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>⚙️ Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleLogout} style={styles.menuItem}>
            <Text style={styles.menuText}>🚪 Log Out</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>

     
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
                   

    
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Sales Overview</Text>
          <View style={styles.row}>
            <TouchableOpacity style={styles.statCard}>
              <Image source={require('../assets/img/Sales.png')} style={styles.smallIcon} />
              <View style={{flexDirection:'column',marginLeft:10}}>
              <Text>Sales</Text>
              <Text>₱25,000</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.statCard}>
              <Image source={require('../assets/img/Profit.png')} style={styles.smallIcon} />
              <View style={{flexDirection:'column',marginLeft:10}}>
              <Text>Profit</Text>
              <Text>₱15,000</Text>
              </View>
            </TouchableOpacity>
            </View>
            <View style={styles.row}>
            <TouchableOpacity style={styles.statCard}>
              <Image source={require('../assets/img/Revenue.png')} style={styles.smallIcon} />
              <View style={{flexDirection:'column',marginLeft:10}}>
              <Text>Revenue</Text>
              <Text>₱18,000</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.statCard}>
              <Image source={require('../assets/img/Cost.png')} style={styles.smallIcon} />
              <View style={{flexDirection:'column',marginLeft:10}}>
              <Text>Cost</Text>
              <Text>₱21,000</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

    
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Appointment Overview</Text>
          <View style={styles.row}>
            <TouchableOpacity style={styles.statCard}>
              <Image source={require('../assets/img/menuadmin.png')} style={[styles.smallIcon,styles.menuadmin]} />
              <View style={{flexDirection:'column',marginLeft:10}}>
              <Text>All</Text>
              <Text>20</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={{flexDirection:'row',marginLeft:36}}>
              <Image source={require('../assets/img/people.png')} style={[styles.smallIcon,styles.people]} />
              <View style={{flexDirection:'column',marginLeft:10}}>
              <Text>New</Text>
              <Text>5</Text>
              </View>
            </TouchableOpacity>
            </View>
            <View style={styles.row}>
            <TouchableOpacity style={styles.statCard}>
              <Image source={require('../assets/img/calendar.png')} style={[styles.smallIcon,styles.calendar]} />
              <View style={{flexDirection:'column',marginLeft:10}}>
              <Text>Today</Text>
              <Text>3</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={{flexDirection:'row',marginLeft:15}}>
              <Image source={require('../assets/img/cancelled.png')} style={[styles.smallIcon,styles.cancelled]} />
              <View style={{flexDirection:'column',marginLeft:10}}>
              <Text>Cancelled</Text>
              <Text>2</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.card}>
  <Text style={styles.sectionTitle}>Sales and Purchase</Text>


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


  <BarChart
  data={{
    labels: chartData[selectedPeriod].labels,
    datasets: [{ data: chartData[selectedPeriod].data }],
  }}
  width={screenWidth - 40}
  height={220}
  yAxisLabel="₱"
  yAxisSuffix=""
  fromZero
  chartConfig={{
    backgroundColor: "#FFFFFF",
    backgroundGradientFrom: "#6C5B7B", 
    backgroundGradientTo: "#C06C84", 
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`, 
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16, 
    },
    propsForDots: {
      r: "4", 
      strokeWidth: "2", 
      stroke: "#FFA07A", 
    },
    fillShadowGradient: "#FF6F61", 
    fillShadowGradientOpacity: 1,
    barPercentage: 0.5, 
    propsForBackgroundLines: {
      stroke: "#FFFFFF", 
      strokeOpacity: 0.2, 
    },
    propsForLabels: {
      fontSize: 12, 
      fontWeight: "bold", 
    },
  }}
  style={styles.chart}
/>
</View>;

        
<View style={styles.card}>
          <Text style={styles.sectionTitle}>Stock Summaries</Text>
          {Object.entries(groupedProducts).map(([category, items]) => {
            const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
            const availability = getAvailability(totalQuantity);

            return (
              <View key={category} style={styles.stockItem}>
                <Text style={styles.categoryTitle}>{category}</Text>
                <Text style={styles.quantityText}>Remaining Stocks: {totalQuantity}</Text>
                <Text style={[styles.availabilityText, styles[availability.toLowerCase()]]}>
                  {availability}
                </Text>
              </View>
            );
          })}
        </View>
      </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f4f4' },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  stockItem: {
    marginBottom: 16,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  quantityText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  availabilityText: {
    fontSize: 14,
    fontWeight: 'bold',
    padding: 4,
    borderRadius: 4,
    textAlign: 'center',
  },
  low: {
    backgroundColor: '#FFCCCB',
    color: '#D32F2F',
  },
  medium: {
    backgroundColor: '#FFF3CD',
    color: '#856404',
  },
  high: {
    backgroundColor: '#D4EDDA',
    color: '#155724',
  },
  'out of stock': {
    backgroundColor: '#F8D7DA',
    color: '#721C24',
  },

  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap:  60, 
    marginLeft: 49,
    marginTop: 15,
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
  statCard:{flexDirection:'row',
  },
  smallIcon:{
    alignItems:'center',
    backgroundColor:'black',
    borderRadius:10,
    padding:5,
  },
  // 🔹 Stock Summary Fix
  stockRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 5,marginBottom:10, },
  stockIcon: { width: 20, height: 20, marginRight: 10 },
  calendar:{backgroundColor:'#ECEAFF',borderRadius:10},
  menuadmin:{backgroundColor:'#E8F1FD',borderRadius:10},
  people:{backgroundColor:'#FFEEDB',borderRadius:10},
  cancelled:{backgroundColor:'#EBFFED',borderRadius:10},
});

