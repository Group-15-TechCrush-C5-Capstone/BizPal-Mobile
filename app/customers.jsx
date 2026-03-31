import { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import { apiRequest } from '../utils/api';
import { Colors, Typography } from './theme';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { StatusBar } from 'expo-status-bar';

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchCustomers = async () => {
    setLoading(true);
    const token = await AsyncStorage.getItem("userToken"); // Retrieve JWT 
    
    // GET /customers requires a valid Bearer Token [cite: 10, 78]
    const res = await apiRequest('/customers', 'GET', null, token); 
    if (res.success) {
      setCustomers(res.data || []); // Standardized response uses "data" key [cite: 16]
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleLogout = async () => {
    Alert.alert("Logout", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      { 
        text: "Logout", 
        style: "destructive", 
        onPress: async () => {
          try {
            await AsyncStorage.removeItem("userToken"); // Clear the session token 
            router.replace("/login"); 
          } catch (e) {
            Alert.alert("Error", "Could not log out.");
          }
        } 
      }
    ]);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.headerRow}>
        <View>
            <Text style={styles.header}>BizPal Customers</Text>
            {/* Added a Logout trigger here */}
            <TouchableOpacity onPress={handleLogout}>
                <Text style={{ color: "#C0392B", fontSize: 12 }}>Logout</Text>
            </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => router.push('/add-customer')} style={styles.addButton}>
          <Text style={styles.addButtonText}>+ New</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color={Colors.accent} />
      ) : (
        <FlatList
          data={customers}
          keyExtractor={(item) => item.id?.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.subText}>{item.location || 'No Location'} | {item.business_type || 'General'}</Text>
            </View>
          )}
          ListEmptyComponent={<Text style={styles.emptyText}>No customers added yet.</Text>}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F0F4F8', padding: 20 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  header: { fontSize: 22, fontWeight: 'bold', color: '#0D1B3E' },
  addButton: { backgroundColor: Colors.accent, paddingVertical: 8, paddingHorizontal: 15, borderRadius: 20 },
  addButtonText: { color: Colors.secondary, fontWeight: 'bold' },
  card: { backgroundColor: '#FFF', padding: 15, borderRadius: 10, marginBottom: 10, borderLeftWidth: 5, borderLeftColor: Colors.accent },
  name: { fontSize: 18, fontFamily: Typography.semiBold },
  subText: { color: Colors.textMuted, marginTop: 5 },
  emptyText: { textAlign: 'center', marginTop: 50, color: Colors.textMuted }
});