import { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { apiRequest } from '../utils/api';
import { Colors, Typography } from './theme';
import { useRouter } from 'expo-router';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from '@react-native-picker/picker'; 

const AddLead = () => {
  const [customers, setCustomers] = useState([]);
  const [form, setForm] = useState({
    customer_id: '',
    status: 'New', 
    deal_value: '',
    notes: ''
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchCustomers = async () => {
      const token = await AsyncStorage.getItem("userToken");
      const res = await apiRequest('/customers', 'GET', null, token);
      if (res.success && res.data?.length > 0) {
        setCustomers(res.data);
        setForm(prev => ({ ...prev, customer_id: res.data[0].id.toString() }));
      }
    };
    fetchCustomers();
  }, []);

const handleSaveLead = async () => {
  if (!form.customer_id || !form.deal_value) {
    Alert.alert("Error", "Please select a customer and value");
    return;
  }

  setLoading(true);
  const token = await AsyncStorage.getItem("userToken");

  const payload = {
    customer_id: String(form.customer_id), // Lead API uses underscore
    status: "New",
    deal_value: form.deal_value.replace(/[^0-9]/g, ''), 
    notes: form.notes || "Lead created",
    contact_date: new Date().toISOString().split('T')[0] // FIX: Required YYYY-MM-DD
  };

  const res = await apiRequest('/leads', 'POST', payload, token);
  setLoading(false);

  if (res && (res.id || res.success || res.data?.id)) {
    Alert.alert("Success", "Lead saved!");
    router.replace('/dashboard');
  } else {
    Alert.alert("Error", res.message || "Check field formatting");
  }
};

return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>New Lead</Text>
      
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Customer</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={form.customer_id}
            onValueChange={(val) => setForm({ ...form, customer_id: val })}
          >
            {customers.map(c => <Picker.Item key={c.id} label={c.name} value={c.id.toString()} />)}
          </Picker>
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Deal Value (₦)</Text>
        <TextInput 
          style={styles.input} 
          keyboardType="numeric" 
          onChangeText={(val) => setForm({...form, deal_value: val})} 
        />
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleSaveLead} disabled={loading}>
        <Text style={styles.saveText}>{loading ? "Saving..." : "Create Lead"}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background, padding: 20 },
  header: { fontSize: 24, fontFamily: Typography.bold, color: Colors.primary, marginBottom: 25 },
  inputGroup: { marginBottom: 20 },
  label: { fontSize: 14, color: Colors.textMain, marginBottom: 8, fontWeight: '600' },
  
input: { 
  backgroundColor: Colors.surface, 
  borderWidth: 1, 
  borderColor: Colors.border, 
  borderRadius: 8, 
  padding: 15,
  fontSize: 16,
  color: Colors.textMain, 
  fontFamily: Typography.regular
},
  pickerContainer: { borderWidth: 1, borderColor: Colors.border, borderRadius: 8, backgroundColor: Colors.surface },
  saveButton: { backgroundColor: Colors.accent, padding: 18, borderRadius: 8, alignItems: 'center' },
  saveText: { color: Colors.secondary, fontWeight: 'bold' }
});

export default AddLead;