import { StyleSheet
} from "react-native";
 export const styles = StyleSheet.create({
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
    card: {
      flexDirection:'column',
      marginTop: 10,
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
      marginRight:10
    },
    addButton: {
      backgroundColor: 'red',
      paddingVertical: 5,
      paddingHorizontal: 25,
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
      marginRight: 6,
      fontSize: 25,
      width: 30,
      height: 30,
    },
    cell: {
      flex: 1,
      fontSize: 11,
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
    logo: {
      marginTop:20,
      width: 250,
      height: 40,
      marginLeft: 20,
      fontSize: 18,
      fontWeight: "bold",
      color: "#D21818",
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
    input: {
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 5,
      padding: 10,
      marginBottom: 10,
    },
    modalButtons: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 20,
    },
    cancelButton: {
      backgroundColor: '#000000',
      padding: 7,
      borderRadius: 5,
      width:150,
      marginRight: 5,
    },
    radioButtonContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
    },
    radioButtonLabel: {
      fontSize: 16,
    },
    buttonText: {
      color: 'white',
      textAlign: 'center',
    },
  });
  