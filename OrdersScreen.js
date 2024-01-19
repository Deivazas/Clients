import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, Image, Button } from 'react-native';
import { getDatabase, ref, get, push } from 'firebase/database';
import { db } from './firebaseConfig';

const OrdersScreen = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    try {
      // Reference to the "items" collection in the database
      const itemsRef = ref(db, 'items');

      // Fetch data from the database
      const snapshot = await get(itemsRef);

      // Extract the data from the snapshot
      if (snapshot.exists()) {
        setMenuItems(Object.values(snapshot.val()));
      } else {
        console.log('No menu items available');
      }
    } catch (error) {
      console.error('Error fetching menu items:', error.message);
    } finally {
      // Set refreshing to false when data fetching is complete
      setRefreshing(false);
    }
  };

  useEffect(() => {
    // Fetch data when the component mounts
    fetchData();
  }, []);

  const handleRefresh = () => {
    // Set refreshing to true and fetch data again
    setRefreshing(true);
    fetchData();
  };

  const handleOrder = async (item) => {
    try {
      // Reference to the "orders" collection in the database
      const ordersRef = ref(db, 'orders');

      // Push a new order to the "orders" collection
      await push(ordersRef, item);
      console.log('Order placed successfully!');
    } catch (error) {
      console.error('Error placing order:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Menu Items</Text>
        <Button title="Refresh" onPress={handleRefresh} disabled={refreshing} />
      </View>
      {menuItems.length > 0 ? (
        <FlatList
          data={menuItems}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.menuItem}>
              {item.imageURL && (
                <Image source={{ uri: item.imageURL }} style={styles.photo} />
              )}
              <View style={styles.itemDetails}>
                {/* Display individual menu items */}
                <Text style={styles.itemName}>Name: {item.name}</Text>
                <Text>Description: {item.description}</Text>
                <Text>Price: ${item.price}</Text>
              </View>
              <Button title="Order" onPress={() => handleOrder(item)} />
            </View>
          )}
          refreshing={refreshing}
          onRefresh={handleRefresh}
        />
      ) : (
        <Text>No menu items available</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  itemDetails: {
    marginLeft: 10,
    flex: 1,
  },
  itemName: {
    fontWeight: 'bold',
  },
  photo: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
});

export default OrdersScreen;
