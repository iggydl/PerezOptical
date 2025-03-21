import React, { useState } from "react";
import { View, Text, TextInput, Image, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import { useNavigation } from '@react-navigation/native';
export default function HomepageScreen() {
  const [selectedCategory, setSelectedCategory] = useState("MENS");
  const navigation = useNavigation();

  const categories = ["MENS", "WOMENS", "KIDS"];
  const products = [
    { id: "1", name: "Viseo VS220954", price: "₱139.00", image: require("../assets/img/glasses.jpg") },
    { id: "2", name: "Viseo VS320954", price: "₱179.00", image: require("../assets/img/glasses.jpg") },
   
  ];

  return (
    <View style={styles.container}>
      
 
      <View style={styles.header}>
        <View style={styles.searchContainer}>
        <Image
                    source={require('../assets/img/search.png')}
                    style={{ width: 32, height: 32 }}
                  /> 
          <TextInput style={styles.searchInput} placeholder="Search" />
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
  <Image
    source={require('../assets/img/profile.png')}
    style={{ width: 45, height: 45 }}
  />
</TouchableOpacity>
        <TouchableOpacity>
        <Image
                    source={require('../assets/img/menu.png')}
                    style={{ width: 45, height: 45 }}
                  />
         
        </TouchableOpacity>
      </View>

    
      <Image source={require("../assets/img/banner.jpg")} style={styles.banner} />

   
      <View style={styles.categoryContainer}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[styles.categoryButton, selectedCategory === category && styles.activeCategory]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text style={[styles.categoryText, selectedCategory === category && styles.activeText]}>
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

   
      <View style={styles.productHeader}>
        <Text style={styles.sectionTitle}>SEE ALL</Text>
      </View>
      
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        horizontal
        renderItem={({ item }) => (
          <View style={styles.productCard}>
            <Image source={item.image} style={styles.productImage} />
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productPrice}>{item.price}</Text>
          </View>
        )}
      />

     
      <View style={styles.bottomNav}>
        <TouchableOpacity>
        <Image
                    source={require('../assets/img/home.png')}
                    style={{ width: 45, height: 45 }}
                  />
          
        </TouchableOpacity>
        <TouchableOpacity>
        <Image
                    source={require('../assets/img/heart.png')}
                    style={{ width: 45, height: 45 }}
                  />
        </TouchableOpacity>
        <TouchableOpacity>
        <Image
                    source={require('../assets/img/cart.png')}
                    style={{ width: 45, height: 45 }}
                  />
        </TouchableOpacity>
      </View>
      
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
  searchContainer: {
    flexDirection: "row",
    backgroundColor: "#F0F0F0",
    padding: 10,
    borderRadius: 10,
    flex: 1,
    marginRight: 10,
    alignItems: "center",
  },
  searchIcon: {
    marginRight: 5,
    fontSize: 16, 
  },
  searchInput: {
    flex: 1,
  },
  iconText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  banner: {
    width: "100%",
    height: 150,
    borderRadius: 10,
    marginVertical: 15,
  },
  categoryContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10,
  },
  categoryButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    width: 110,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 20,
    marginHorizontal: 10,
   
  },
  activeCategory: {
    backgroundColor: "red",
    borderColor: "red",
  },
  categoryText: {
    color: "black",
    textAlign: "center",
  },
  activeText: {
    color: "white",
  },
  productHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  productCard: {
    backgroundColor: "white",
    width:150,
    height: 200,
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    marginRight: 15,
    marginLeft: 15,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  productImage: {
    width: 80,
    height: 80,
    resizeMode: "contain",
  },
  productName: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 5,
  },
  productPrice: {
    fontSize: 14,
    color: "black",
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    borderTopColor: "#ddd",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "white",
  },
  navText: {
    fontSize: 14,
    fontWeight: "bold",
  },
});
