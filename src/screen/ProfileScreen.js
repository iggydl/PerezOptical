import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import { ImageBackground } from 'react-native';

export default function ProfileScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.icon}>&#8592;</Text>
        </TouchableOpacity>
        <Text style={styles.title}>MY PROFILE</Text>
        <TouchableOpacity>
          <Text style={styles.icon}>&#9998;</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.profileSection}>
        <Image source={{ uri: 'https://static-00.iconduck.com/assets.00/profile-circle-icon-1023x1024-ucnnjrj1.png' }} style={styles.profileImage} />
        <Text style={styles.profileName}>Iggy</Text>
      </View>

      <View style={styles.cardContainer}>
        <TouchableOpacity style={styles.card}>
          <Text style={styles.cardIcon}>📦</Text>
          <Text style={styles.cardText}>Orders</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card}>
          <Text style={styles.cardIcon}>❤️</Text>
          <Text style={styles.cardText}>Favorites</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D24D57',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  icon: {
    fontSize: 24,
    color: 'white',
  },
  profileSection: {
    alignItems: 'center',
    marginTop: -10,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: 'white',
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 10,
  },
  cardContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: 20,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  card: {
    backgroundColor: '#D24D57',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  cardIcon: {
    fontSize: 30,
    color: 'white',
  },
  cardText: {
    color: 'white',
    marginTop: 5,
    fontWeight: 'bold',
  },
});
