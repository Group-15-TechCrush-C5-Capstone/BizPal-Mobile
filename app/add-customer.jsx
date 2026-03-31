import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { apiRequest } from '../utils/api';
import { Colors } from './theme';
import { useRouter } from 'expo-router';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function AddCustomer() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    business_type: '',
    location: '',
    notes: ''
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSave = async () => {
    if (!form.name || !form.phone) {
      Alert.alert("Missing Info", "Name and Phone are required."); // [cite: 71, 72]
      return;
    }

    setLoading(true);
    const token = await AsyncStorage.getItem("userToken"); 
    
    
    const res = await apiRequest('/customers', 'POST', form, token);
    setLoading(false);

    if (res.success) {
      Alert.alert("Success", "Customer added to BizPal!");
      router.replace('/customers'); 
    } else {
      Alert.alert("Error", res.message || "Could not save customer.");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>New Customer</Text>
      
      {/* Name Input [cite: 71] */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Full Name *</Text>
        <TextInput 
          style={styles.input} 
          placeholder="e.g. John Doe"
          placeholderTextColor="#7A8B9A"
          onChangeText={(val) => setForm({...form, name: val})}
        />
      </View>

      {/* Phone Input [cite: 72] */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Phone Number *</Text>
        <TextInput 
          style={styles.input} 
          placeholder="080..."
          placeholderTextColor="#7A8B9A"
          keyboardType="phone-pad"
          onChangeText={(val) => setForm({...form, phone: val})}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Business Type</Text>
        <TextInput 
          style={styles.input} 
          placeholder="e.g. Retail, Tech"
          placeholderTextColor="#7A8B9A"
          onChangeText={(val) => setForm({...form, business_type: val})}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Location</Text>
        <TextInput 
          style={styles.input} 
          placeholder="City or Street"
          placeholderTextColor="#7A8B9A"
          onChangeText={(val) => setForm({...form, location: val})}
        />
      </View>

      <TouchableOpacity 
        style={[styles.saveButton, loading && {opacity: 0.7}]} 
        onPress={handleSave}
        disabled={loading}
      >
        {loading ? <ActivityIndicator color="#FFF" /> : <Text style={styles.saveText}>Create Customer</Text>}
      </TouchableOpacity>
    </ScrollView>
  );
}



const styles = StyleSheet.create({
  container: 
  { flex: 1, 
    backgroundColor: 
    Colors.background, padding: 20 },

  header: 
  { fontSize: 24, 
    fontWeight: 'bold', color: Colors.primary, marginBottom: 25 },
  inputGroup: { marginBottom: 20 },
  label: { fontSize: 14, color: Colors.textMuted, marginBottom: 8, fontWeight: '600' },
  input: { 
    backgroundColor: Colors.surface, 
    borderWidth: 1, 
    borderColor: Colors.border, 
    borderRadius: 8, 
    padding: 15, 
    fontSize: 16,
    color: Colors.textMain
  },
  saveButton: { 
    backgroundColor: Colors.accent, 
    padding: 18, 
    borderRadius: 8, 
    alignItems: 'center', 
    marginTop: 10,
    // Matching the shadow/elevation from your design system
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  saveText: { color: Colors.secondary, fontWeight: 'bold', fontSize: 18 }
});