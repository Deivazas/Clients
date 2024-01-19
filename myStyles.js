// Updated styles for the client project
import { StyleSheet, StatusBar } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    padding: 16,
  },
  orderItem: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginBottom: 8,
    marginLeft: 16,
    marginRight: 16,
    borderColor: 'black',
    borderWidth: 3,
  },
  statusItem: {
    backgroundColor: 'yellow',
    padding: 20,
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 20,
    fontSize: 20,
    fontWeight: 'bold',
    borderColor: 'black',
    borderWidth: 3,
  },
  textStyle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  buttonPressable: {
    height: 50,
    width: 250,
    backgroundColor: 'yellow',
    marginBottom: 16,
  },
  buttonText: {
    textAlignVertical: 'center',
    alignItems: 'flex-end',
    fontWeight: 'bold',
    fontSize: 25,
    textAlign: 'left',
  },
  smallButton: {
    backgroundColor: 'yellow',
    width: 50,
    borderColor: 'black',
    borderWidth: 1,
  },
  driver1: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default styles;
