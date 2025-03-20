import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import { LineChart } from 'react-native-chart-kit';

const AppointmentsScreen = () => {
  const [selectedTab, setSelectedTab] = useState('Requests');
  const [selectedDate, setSelectedDate] = useState('');
  
  const [requests, setRequests] = useState([
    { id: '1', name: 'Mark Dela Cruz', gender: 'Male', age: 28, service: 'Comprehensive Eye Exam', date: '2025-03-10', time: '10:30 AM', status: 'Pending' },
    { id: '2', name: 'Hanni Santos', gender: 'Female', age: 24, service: 'Contact Lens Fitting', date: '2025-03-05', time: '2:00 PM', status: 'Pending' },
    { id: '3', name: 'Peter Tan', gender: 'Male', age: 25, service: 'Follow Check-up', date: '2025-03-20', time: '4:00 PM', status: 'Pending' },
  ]);

  const [appointments, setAppointments] = useState([]);
  const [markedDates, setMarkedDates] = useState({});

  const handleAccept = (appointment) => {
    setMarkedDates((prevDates) => ({
      ...prevDates,
      [appointment.date]: { selected: true, selectedColor: 'green' },
    }));

    setAppointments((prev) => [
      ...prev.filter((a) => a.id !== appointment.id),
      { ...appointment, status: 'Confirmed' }
    ]);

    setRequests((prev) => prev.filter((req) => req.id !== appointment.id));
  };

  const handleDecline = (appointment) => {
    setAppointments((prev) => [
      ...prev.filter((a) => a.id !== appointment.id),
      { ...appointment, status: 'Cancelled' }
    ]);

    setRequests((prev) => prev.filter((req) => req.id !== appointment.id));
  };

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

      {/* Stats Cards */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
        <View style={styles.card}><Text>🛒 Total Appointments</Text><Text style={styles.statNumber}>{appointments.length}</Text></View>
        <View style={styles.card}><Text>📅 This Month</Text><Text style={styles.statNumber}>200</Text></View>
        <View style={styles.card}><Text>📆 This Week</Text><Text style={styles.statNumber}>200</Text></View>
      </View>

      {/* Tab Navigation */}
      <View style={{ flexDirection: 'row', marginBottom: 10 }}>
        <TouchableOpacity onPress={() => setSelectedTab('Requests')} style={[styles.tabButton, selectedTab === 'Requests' && styles.activeTab]}>
          <Text style={{ color: selectedTab === 'Requests' ? 'white' : 'black' }}>Requests</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelectedTab('Status')} style={[styles.tabButton, selectedTab === 'Status' && styles.activeTab]}>
          <Text style={{ color: selectedTab === 'Status' ? 'white' : 'black' }}>Status</Text>
        </TouchableOpacity>
      </View>

      {selectedTab === 'Requests' ? (
        <ScrollView style={{ flex: 1 }} nestedScrollEnabled={true}>
          {/* Appointment Requests */}
          <FlatList
             data={requests.filter((req) => req.status === 'Pending')}
            keyExtractor={(item) => item.id}
            ListHeaderComponent={<Text style={styles.sectionTitle}>Appointment Requests</Text>}
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

          {/* Calendar */}
          <View style={{ backgroundColor: 'white', borderRadius: 10, padding: 10, marginTop: 20 }}>
            <Text style={styles.sectionTitle}>Appointment Calendar</Text>
            <Calendar onDayPress={(day) => setSelectedDate(day.dateString)} markedDates={markedDates} />
          </View>
        </ScrollView>
      ) : (
        <ScrollView style={{ flex: 1 }} nestedScrollEnabled={true}>
          {/* Search Bar */}
          <TextInput style={styles.searchBox} placeholder="Search" />

          {/* Appointment Status Table */}
          <View style={styles.statusContainer}>
            <FlatList
              data={appointments}
              keyExtractor={(item) => item.id}
              ListHeaderComponent={() => (
                <View style={styles.tableHeader}>
                  <Text style={[styles.headerText, { flex: 2 }]}>Patient Name ⬍</Text>
                  <Text style={[styles.headerText, { flex: 2 }]}>Date & Time ⬍</Text>
                  <Text style={[styles.headerText, { flex: 2 }]}>Type of Check-Up ⬍</Text>
                  <Text style={[styles.headerText, { flex: 1 }]}>Status ⬍</Text>
                </View>
              )}
              renderItem={({ item }) => (
                <View style={styles.tableRow}>
                  <Text style={[styles.cell, { flex: 2 }]}>{item.name}</Text>
                  <Text style={[styles.cell, { flex: 2 }]}>{item.date}, {item.time}</Text>
                  <Text style={[styles.cell, { flex: 2 }]}>{item.service}</Text>
                  <View style={[styles.statusBadge, styles.statusColors[item.status]]}>
                    <Text style={styles.statusText}>{item.status}</Text>
                  </View>
                </View>
              )}
            />
          </View>
        </ScrollView>
      )}
    </View>
  );
};




// Function to apply different colors based on status
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
  card: { flex: 1, backgroundColor: 'white', padding: 15, borderRadius: 10, alignItems: 'center', marginHorizontal: 5, elevation: 2 },
  statNumber: { fontSize: 20, fontWeight: 'bold', marginTop: 5 },
  tabButton: { flex: 1, padding: 10, alignItems: 'center', borderRadius: 5, backgroundColor: '#ddd' },
  activeTab: { backgroundColor: 'red' },
  searchBox: { backgroundColor: 'white', borderRadius: 10, padding: 10, marginBottom: 10 },
  requestBox: { backgroundColor: 'white', padding: 10, borderRadius: 10, marginBottom: 10 },
  acceptButton: { backgroundColor: 'green', padding: 10, borderRadius: 5, flex: 1, alignItems: 'center', marginRight: 5 },
  declineButton: { backgroundColor: 'red', padding: 10, borderRadius: 5, flex: 1, alignItems: 'center' },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  cell: { flex: 1, padding: 10, textAlign: 'center' },
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
  },
  statusBadge: {
    flex: 1,
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusText: {
    color: 'white',
    fontWeight: 'bold',
  },
  statusColors: {
    Pending: { backgroundColor: '#F6C23E' },
    Confirmed: { backgroundColor: '#1CC88A' },
    Canceled: { backgroundColor: '#E74A3B' },
    Rescheduled: { backgroundColor: '#36A2EB' },
    Completed: { backgroundColor: '#6D36EB' },
  },
};

export default AppointmentsScreen;
