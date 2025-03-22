import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Animated,
  Image,
  Modal,
  Alert,
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import { LineChart } from 'react-native-chart-kit';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';

const screenWidth = Dimensions.get('window').width;

const AppointmentsScreen = () => {
  const [selectedTab, setSelectedTab] = useState('Requests');
  const [selectedDate, setSelectedDate] = useState('');
  const navigation = useNavigation();
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(-250)).current;

  const [requests, setRequests] = useState([
    { id: '1', name: 'Mark Dela Cruz', gender: 'Male', age: 28, service: 'Comprehensive Eye Exam', date: '2025-03-10', time: '10:30 AM', status: 'Pending' },
    { id: '2', name: 'Hanni Santos', gender: 'Female', age: 24, service: 'Contact Lens Fitting', date: '2025-03-05', time: '2:00 PM', status: 'Pending' },
    { id: '3', name: 'Peter Tan', gender: 'Male', age: 25, service: 'Follow Check-up', date: '2025-03-20', time: '4:00 PM', status: 'Pending' },
    { id: '4', name: 'Iggy De Leon', gender: 'Male', age: 25, service: 'Follow Check-up', date: '2025-03-20', time: '4:00 PM', status: 'Rescheduled' },
    { id: '5', name: 'Mikaela Parayno', gender: 'Female', age: 25, service: 'Follow Check-up', date: '2025-03-21', time: '4:00 PM', status: 'Completed' },
    { id: '6', name: 'John Doe', gender: 'Male', age: 30, service: 'Comprehensive Eye Exam', date: '2025-03-15', time: '9:00 AM', status: 'Pending' },
    { id: '7', name: 'Jane Smith', gender: 'Female', age: 22, service: 'Contact Lens Fitting', date: '2025-03-18', time: '11:00 AM', status: 'Cancelled' },
    { id: '8', name: 'Alice Johnson', gender: 'Female', age: 35, service: 'Follow Check-up', date: '2025-03-22', time: '3:00 PM', status: 'Pending' },
  ]);

  const [appointments, setAppointments] = useState([]);
  const [markedDates, setMarkedDates] = useState({});
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState('Pending');

  const handleLogout = () => {
    Alert.alert('Success', 'Logout successfully!', [
      { text: 'OK', onPress: () => navigation.navigate('RegisterScreen') },
    ]);
  };
  const currentDate = new Date(); 
  const currentMonth = currentDate.getMonth() + 1; 
  const currentYear = currentDate.getFullYear();

  
  const startOfWeek = new Date(currentDate);
  startOfWeek.setDate(currentDate.getDate() - currentDate.getDay()); 
  startOfWeek.setHours(0, 0, 0, 0); 

  
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  endOfWeek.setHours(23, 59, 59, 999);

  
  const appointmentsThisMonth = appointments.filter((appointment) => {
    const appointmentDate = new Date(appointment.date);
    return (
      appointmentDate.getMonth() + 1 === currentMonth &&
      appointmentDate.getFullYear() === currentYear
    );
  });

  
  const appointmentsThisWeek = appointments.filter((appointment) => {
    const appointmentDate = new Date(appointment.date);
    return appointmentDate >= startOfWeek && appointmentDate <= endOfWeek;
  });

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

  const handleAccept = (appointment) => {
    setMarkedDates((prevDates) => ({
      ...prevDates,
      [appointment.date]: { selected: true, selectedColor: 'green' },
    }));

    setAppointments((prev) => [
      ...prev.filter((a) => a.id !== appointment.id),
      { ...appointment, status: 'Confirmed' },
    ]);

    setRequests((prev) => prev.filter((req) => req.id !== appointment.id));
  };

  const handleDecline = (appointment) => {
    setAppointments((prev) => [
      ...prev.filter((a) => a.id !== appointment.id),
      { ...appointment, status: 'Cancelled' },
    ]);

    setRequests((prev) => prev.filter((req) => req.id !== appointment.id));
  };

  const openEditModal = (appointment) => {
    setSelectedAppointment(appointment);
    setSelectedStatus(appointment.status);
    setIsEditModalVisible(true);
  };

  const handleStatusUpdate = () => {
    if (selectedAppointment) {
      const updatedAppointments = appointments.map((app) =>
        app.id === selectedAppointment.id ? { ...app, status: selectedStatus } : app
      );
      setAppointments(updatedAppointments);

      const updatedRequests = requests.map((req) =>
        req.id === selectedAppointment.id ? { ...req, status: selectedStatus } : req
      );
      setRequests(updatedRequests);

      setIsEditModalVisible(false);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#F8F8F8' }}>
      {isMenuVisible && <TouchableOpacity style={styles.overlay} onPress={closeMenu} />}

      <Animated.View style={[styles.sideMenu, { transform: [{ translateX: slideAnim }] }]}>
        <View style={styles.profileContainer}>
          <Image source={require('../assets/img/admin_profile.png')} style={styles.profileImage} />
          <Text style={styles.profileName}>John Perez</Text>
          <Text style={styles.profileRole}>Admin</Text>
        </View>

        <TouchableOpacity style={[styles.menuItem]} onPress={() => navigation.navigate('Dashboard')}>
          <Text style={styles.menuText}>🏠 Dashboard</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Inventory')} style={styles.menuItem}>
          <Text style={styles.menuText}>📦 Inventory</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Orders')} style={[styles.menuItem]}>
          <Text style={styles.menuText}>🛒 Orders</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Appointment')} style={[styles.menuItem, styles.activeMenuItem]}>
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

      <View style={styles.header}>
        <TouchableOpacity onPress={openMenu} style={{ marginTop: 20 }}>
          <Image source={require('../assets/img/menu.png')} style={styles.icon} />
        </TouchableOpacity>
        <Image source={require('../assets/img/logo.png')} style={styles.logo} />
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ fontSize: 30, fontWeight: 'bold', marginTop: 10 }}>Appointments</Text>
          <TouchableOpacity style={{ marginLeft: 130, marginTop: 10 }}>
            <Image source={require('../assets/img/admin_profile.png')} style={{ width: 40, height: 40 }} />
          </TouchableOpacity>
        </View>
      </View>

      
     

    <ScrollView style={{ flex: 1 }} nestedScrollEnabled={true}>
  {/* Tab Navigation */}
  <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
      {/* Total Appointments */}
      <View style={styles.card}>
        <Text style={{ textAlign: 'center', fontSize: 24 }}>👥</Text>
        <Text style={{ textAlign: 'center', fontSize: 11 }}>Total Appointment</Text>
        <Text style={{ textAlign: 'center', fontSize: 16, fontWeight: 'bold', marginTop: 5 }}>
          {appointments.length}
        </Text>
      </View>

      {/* This Month */}
      <View style={styles.card}>
        <Text style={{ textAlign: 'center', fontSize: 24 }}>📅</Text>
        <Text style={{ textAlign: 'center', fontSize: 11 }}>This Month</Text>
        <Text style={{ textAlign: 'center', fontSize: 16, fontWeight: 'bold', marginTop: 5 }}>
          {appointmentsThisMonth.length}
        </Text>
      </View>

      {/* This Week */}
      <View style={styles.card}>
        <Text style={{ textAlign: 'center', fontSize: 24 }}>📑</Text>
        <Text style={{ textAlign: 'center', fontSize: 11 }}>This Week</Text>
        <Text style={{ textAlign: 'center', fontSize: 16, fontWeight: 'bold', marginTop: 5 }}>
          {appointmentsThisWeek.length}
        </Text>
      </View>
    </View>
  <View style={{ flexDirection: 'row', marginBottom: 10 }}>
    <TouchableOpacity onPress={() => setSelectedTab('Requests')} style={[styles.tabButton, selectedTab === 'Requests' && styles.activeTab]}>
      <Text style={{ color: selectedTab === 'Requests' ? 'white' : 'black' }}>Requests</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => setSelectedTab('Status')} style={[styles.tabButton, selectedTab === 'Status' && styles.activeTab]}>
      <Text style={{ color: selectedTab === 'Status' ? 'white' : 'black' }}>Status</Text>
    </TouchableOpacity>
  </View>

  {selectedTab === 'Requests' ? (
    <>
      <FlatList
        data={requests.filter((req) => req.status === 'Pending')}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={<Text style={styles.sectionTitle}>Appointment Requests</Text>}
        ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 20, color: '#888' }}>No Appointment Requests Available</Text>}
        renderItem={({ item }) => (
          <View style={styles.requestBox}>
            <Text style={{ fontWeight: 'bold' }}>{item.name}</Text>
            <Text>{item.gender}, {item.age}</Text>
            <Text>{item.service}</Text>
            <Text>{item.date}, {item.time}</Text>
            <View style={{ flexDirection: 'row', marginTop: 10 }}>
              <TouchableOpacity style={styles.acceptButton} onPress={() => handleAccept(item)}>
                <Text style={{ color: 'white' }}>Accept</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.declineButton} onPress={() => handleDecline(item)}>
                <Text style={{ color: 'white' }}>Decline</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      <View style={{ backgroundColor: 'white', borderRadius: 10, padding: 10, marginTop: 20 }}>
        <Text style={styles.sectionTitle}>Appointment Calendar</Text>
        <Calendar onDayPress={(day) => setSelectedDate(day.dateString)} markedDates={markedDates} />
      </View>
    </>
  ) : (
    <>
      <View style={styles.statusContainer}>
        <FlatList
          data={[...requests, ...appointments]}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={() => (
            <View style={styles.tableHeader}>
              <Text style={[styles.headerText, { flex: 2 }]}>Patient Name</Text>
              <Text style={[styles.headerText, { flex: 2 }]}>Date & Time</Text>
              <Text style={[styles.headerText, { flex: 2 }]}>Type of Check-Up</Text>
              <Text style={[styles.headerText, { flex: 1 }]}>Status</Text>
              <Text style={[styles.headerText, { flex: 1 }]}>Action</Text>
            </View>
          )}
          renderItem={({ item }) => (
            <View style={styles.tableRow}>
              <Text style={[styles.cell, { flex: 2 }]}>{item.name}</Text>
              <Text style={[styles.cell, { flex: 2 }]}>{item.date}, {item.time}</Text>
              <Text style={[styles.cell, { flex: 2 }]}>{item.service}</Text>
              <View style={[styles.statusBadge, styles.statusColors[item.status || 'Pending']]}>
                <Text style={styles.statusText}>{item.status || 'Pending'}</Text>
              </View>
              <TouchableOpacity onPress={() => openEditModal(item)}>
                <Image source={require('../assets/img/editproduct.png')} style={styles.smallIcon} />
              </TouchableOpacity>
            </View>
          )}
        />
      </View>

      {/* Line Chart */}
      <View style={{ marginTop: 20, backgroundColor: 'white', padding: 16, borderRadius: 10, elevation: 3 }}>
        <Text style={styles.sectionTitle}>Appointment Reports</Text>
        <LineChart
          data={{
            labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'],
            datasets: [
              {
                data: [1000, 1500, 1200, 1400, 1300, 1250, 1800],
                color: () => '#4CAF50',
                strokeWidth: 2,
              },
              {
                data: [500, 700, 650, 800, 750, 900, 850],
                color: () => '#1976D2',
                strokeWidth: 2,
              },
              {
                data: [400, 600, 500, 950, 600, 580, 620],
                color: () => '#D32F2F',
                strokeWidth: 2,
              },
            ],
          }}
          width={screenWidth - 40}
          height={220}
          yAxisLabel=""
          chartConfig={{
            backgroundColor: '#fff',
            backgroundGradientFrom: '#fff',
            backgroundGradientTo: '#fff',
            color: () => '#444',
            decimalPlaces: 0,
          }}
          bezier
          style={styles.chart}
        />
      </View>
    </>
  )}
</ScrollView>

      {/* Edit Status Modal */}
      <Modal visible={isEditModalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Status</Text>
            <Picker
              selectedValue={selectedStatus}
              onValueChange={(itemValue) => setSelectedStatus(itemValue)}
            >
              <Picker.Item label="Pending" value="Pending" />
              <Picker.Item label="Confirmed" value="Confirmed" />
              <Picker.Item label="Cancelled" value="Cancelled" />
              <Picker.Item label="Completed" value="Completed" />
              <Picker.Item label="Rescheduled" value="Rescheduled" />
            </Picker>
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.cancelButton} onPress={() => setIsEditModalVisible(false)}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveButton} onPress={handleStatusUpdate}>
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};





const getStatusStyle = (status) => ({
  
  backgroundColor:
    status === 'Confirmed' ? 'green' :
    status === 'Cancelled' ? 'red' :
    status === 'Pending' ? 'yellow' :
    'gray',
  color: 'white',
  padding: 5,
  borderRadius: 5,
  textAlign: 'center'
});

const styles = {
  smallIcon:{
    marginLeft:5,
    width:25,
    height:25,
  },
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
  saveButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    flex: 1,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  card: { flex: 1, backgroundColor: 'white', padding: 15, borderRadius: 10, alignItems: 'center', marginHorizontal: 5, elevation: 2 },
  statNumber: { fontSize: 20, fontWeight: 'bold', marginTop: 5 },
  tabButton: { flex: 1, padding: 10, alignItems: 'center', borderRadius: 5, backgroundColor: '#ddd' },
  activeTab: { backgroundColor: 'red' },
  searchBox: { backgroundColor: 'white', borderRadius: 10, padding: 10, marginBottom: 10 },
  requestBox: { backgroundColor: 'white', padding: 10, borderRadius: 10, marginBottom: 10 },
  acceptButton: { backgroundColor: 'green', padding: 10, borderRadius: 5, flex: 1, alignItems: 'center', marginRight: 5 },
  declineButton: { backgroundColor: 'red', padding: 10, borderRadius: 5, flex: 1, alignItems: 'center' },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  cell: { flex: 1, padding: 10, textAlign: 'center'},
  statusContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
    elevation: 3, // Shadow effect
  },
  tableHeader: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    backgroundColor: '#f8f8f8',
  },
  headerText: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#444',
    fontSize: 10, // Set font size to 10
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  cell: {
    textAlign: 'center',
    color: '#333',
    fontSize: 10, // Set font size to 10
  },
  statusBadge: {
    flex: 1,
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 9, // Set font size to 10
  },
  statusColors: {
    Pending: { backgroundColor: '#F6C23E' },
    Confirmed: { backgroundColor: '#1CC88A' },
    Cancelled: { backgroundColor: '#E74A3B' }, 
    Rescheduled: { backgroundColor: '#36A2EB' },
    Completed: { backgroundColor: '#6D36EB' },
  },
  logo:{
    marginTop:20,
    width: 250,
    height: 40,
    marginLeft: 20,
    fontSize: 18,
    fontWeight: "bold",
    color: "#D21818",
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
  header: { flexDirection: 'row',width:'100%',padding: 20,  backgroundColor: 'white', flexWrap:'wrap', },
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
};

export default AppointmentsScreen;
