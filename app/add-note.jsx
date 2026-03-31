import { useState, useEffect, useRef } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, StyleSheet, 
  ScrollView, ActivityIndicator, Animated, KeyboardAvoidingView, Platform 
} from 'react-native';
import { apiRequest } from '../utils/api';
import { Colors, Typography, Spacing } from './theme';
import { useRouter } from 'expo-router';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from '@react-native-picker/picker';

const AddNote = () => {
  const [customers, setCustomers] = useState([]);
  const [form, setForm] = useState({ customerId: '', note: '' });
  const [loading, setLoading] = useState(false);
  
  // Notification State
  const [snackbar, setSnackbar] = useState({ visible: false, message: '', type: 'error' });
  const snackAnim = useRef(new Animated.Value(150)).current; 
  const router = useRouter();

  // Unified Notification Function
  const showNotification = (message, type = 'success') => {
    setSnackbar({ visible: true, message, type });
    Animated.spring(snackAnim, { toValue: 0, useNativeDriver: true, tension: 80, friction: 10 }).start();
    
    setTimeout(() => {
      Animated.timing(snackAnim, { toValue: 150, duration: 400, useNativeDriver: true }).start();
    }, 3000);
  };

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const token = await AsyncStorage.getItem("userToken");
        const res = await apiRequest('/customers', 'GET', null, token);
        const data = Array.isArray(res) ? res : (res.data || []);
        if (data.length > 0) {
          setCustomers(data);
          setForm(prev => ({ ...prev, customerId: data[0].id.toString() }));
        }
      } catch (e) {
        showNotification("Failed to load customers");
      }
    };
    fetchCustomers();
  }, []);

  const handleSaveNote = async () => {
    if (!form.note.trim()) return showNotification("Please enter a note details");
    
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem("userToken");
      const res = await apiRequest('/notes', 'POST', {
        customerId: String(form.customerId), 
        note: form.note.trim()
      }, token);

      if (res && (res.id || res.note || res.success)) { 
        showNotification("Note saved successfully!", "success");
        setTimeout(() => router.push('/dashboard'), 2000);
      } else {
        showNotification(res.message || "Server error occurred");
      }
    } catch (err) {
      showNotification("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      style={{ flex: 1, backgroundColor: Colors.background }}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
        <Text style={styles.header}>Add Note</Text>
        
        {/* Customer Selection - High Contrast Picker */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Select Customer</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={form.customerId}
              dropdownIconColor={Colors.primary}
              style={styles.picker}
              onValueChange={(val) => setForm({ ...form, customerId: val })}
            >
              {customers.map(c => (
                <Picker.Item 
                  key={c.id} 
                  label={c.name} 
                  value={c.id.toString()} 
                  color={Colors.primary} // High Contrast Text
                  style={{ backgroundColor: Colors.surface}} // High Contrast BG
                />
              ))}
            </Picker>
          </View>
        </View>

        {/* Note Details - Fixed Placeholder & Text */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Note Details</Text>
          <TextInput 
            style={styles.textArea} 
            multiline 
            placeholder="What happened with this customer today?" 
            placeholderTextColor="#9CA3AF" // High Contrast Placeholder
            onChangeText={(val) => setForm({...form, note: val})}
            textAlignVertical="top"
          />
        </View>

        <TouchableOpacity 
          style={[styles.saveButton, loading && { opacity: 0.7 }]} 
          onPress={handleSaveNote}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Text style={styles.saveText}>Save Note</Text>
          )}
        </TouchableOpacity>
      </ScrollView>

      {/* Snackbar / Bottom Sheet Notification */}
      <Animated.View style={[
        styles.snackbar, 
        { 
          transform: [{ translateY: snackAnim }], 
          backgroundColor: snackbar.type === 'success' ? '#10B981' : '#EF4444' 
        }
      ]}>
        <Text style={styles.snackText}>{snackbar.message}</Text>
      </Animated.View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: { padding: 20, paddingBottom: 100 },
  header: { fontSize: 24, fontFamily: Typography.semiBold, color: Colors.primary, marginBottom: 25 },
  inputGroup: { marginBottom: 22 },
  label: { fontSize: 14, color: Colors.textMuted, marginBottom: 8, fontWeight: '600' },
  
  // High Contrast Picker Styling
  pickerWrapper: { 
    borderWidth: 1.5, 
    borderColor: Colors.border, 
    borderRadius: 12, 
    backgroundColor: Colors.accent, 
    overflow: 'hidden',
    justifyContent: 'center'
  },
  picker: { 
    height: 55, 
    color: Colors.primary, // Darker text for readability
  },

  // Input Styling
  textArea: { 
    backgroundColor: Colors.surface, 
    borderWidth: 1.5, 
    borderColor: Colors.border, 
    borderRadius: 12, 
    padding: 15, 
    fontSize: 16, 
    color: Colors.textMain, 
    minHeight: 150 
  },
  
  saveButton: { 
    backgroundColor: Colors.accent, 
    padding: 18, 
    borderRadius: 12, 
    alignItems: 'center', 
    marginTop: 10,
    shadowColor: Colors.accent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5
  },
  saveText: { color: '#112240', fontWeight: '700', fontSize: 16 },

  // Notification Bottom Sheet
  snackbar: { 
    position: 'absolute', 
    bottom: 0, left: 0, right: 0, 
    padding: 20, 
    borderTopLeftRadius: 20, 
    borderTopRightRadius: 20, 
    flexDirection: 'row', 
    justifyContent: 'center',
    elevation: 20
  },
  snackText: { color: '#FFF', fontWeight: 'bold', fontSize: 14 }
});

export default AddNote;