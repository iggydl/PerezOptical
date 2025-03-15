import { StyleSheet } from 'react-native';

export const formStyle = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '70%',
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
  },
  tabContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    paddingTop: 10,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 6,
  },
  activeTab: {
    backgroundColor: '#C8181E',
  },
  tabText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  activeTabText: {
    color: 'white',
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    width: '100%',
  },
  input: {
    height: 45,
    width: '90%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingLeft: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 7,
    alignSelf: 'flex-start',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  eyeButton: {
    position: 'absolute',
    right: 10,
  },
  eyeButtonText: {
    fontSize: 16,
    color: '#007BFF',
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
