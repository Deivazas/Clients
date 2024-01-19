import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, Image, TouchableOpacity, Button } from 'react-native';
import { getDatabase, ref, get, update } from 'firebase/database';
import { db } from './firebaseConfig';

const StatusScreen = ({ navigation }) => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      // Reference to the "orders" collection in the database
      const ordersRef = ref(db, 'orders');

      // Fetch data from the database
      const snapshot = await get(ordersRef);

      // Extract the data from the snapshot
      if (snapshot.exists()) {
        const ordersData = Object.entries(snapshot.val()).map(([id, order]) => ({ id, ...order }));
        setOrders(ordersData);
      } else {
        console.log('No orders available');
      }
    } catch (error) {
      console.error('Error fetching orders:', error.message);
    }
  };

  const handleRefresh = () => {
    // Fetch orders again to reflect the changes
    fetchOrders();
  };

  useEffect(() => {
    // Fetch data when the component mounts
    fetchOrders();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Order Status</Text>
      <Button title="Refresh" onPress={handleRefresh} />
      {orders.length > 0 ? (
        <FlatList
          data={orders}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.orderItem}>
              <Image source={{ uri: item.imageURL }} style={styles.orderImage} />
              <View style={styles.orderDetails}>
                <Text>Name: {item.name}</Text>
                <Text>Description: {item.description}</Text>
                <Text>Price: ${item.price}</Text>
                <Text>Status: {item.status}</Text>
              </View>
            </View>
          )}
        />
      ) : (
        <Text>No orders available</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 20,
    marginBottom: 16,
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    padding: 8,
  },
  orderImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 10,
  },
  orderDetails: {
    flex: 1,
  },
});

export default StatusScreen;
