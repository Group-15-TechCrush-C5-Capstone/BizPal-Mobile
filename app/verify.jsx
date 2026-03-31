import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { apiRequest } from '../utils/api';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Colors, Typography } from './theme';

export default function Verify() {
  const [code, setCode] = useState('');
  const { email } = useLocalSearchParams(); // Get email passed from signup
  const router = useRouter();

  const handleVerify = async () => {
  if (!code) {
    Alert.alert("Error", "Please enter the verification code.");
    return;
  }

  const res = await apiRequest('/auth/verify-email', 'POST', { email, code });

  // Handle the case where the server returns the HTML error page
  if (!res || typeof res !== 'object') {
    Alert.alert("Server Error", "The verification service is currently unavailable. Please try again later.");
    return;
  }

  if (res.success) {
    Alert.alert("Success", "Email verified! You can now login.");
    router.replace('/login');
  } else {
    // This handles the "Invalid Code" or "Expired Code" messages
    Alert.alert("Verification Failed", res.message || "Invalid Code");
  }
};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verify Email</Text>
      <Text style={styles.subtitle}>Enter the code sent to {email}</Text>
      <TextInput 
        style={styles.input} 
        placeholder="123456" 
        keyboardType="number-pad"
        onChangeText={setCode}
        placeholderTextColor="#7A8B9A"
      />
      <TouchableOpacity style={styles.button} onPress={handleVerify}>
        <Text style={styles.buttonText}>Verify</Text>
      </TouchableOpacity>
    </View>
  );
}



const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: 'center', backgroundColor: Colors.background },
  title: { fontSize: 24, fontFamily: Typography.bold, color: Colors.primary, textAlign: 'center' },
  subtitle: { textAlign: 'center', marginBottom: 20, color: Colors.textMuted },
  input: 
  { borderWidth: 1, 
    borderColor: Colors.border, 
    padding: 15, borderRadius: 8,
    textAlign: 'center', 
    fontSize: 20 ,
    color: Colors.textMain
},
  button: { backgroundColor: Colors.accent, padding: 18, borderRadius: 8, marginTop: 20, alignItems: 'center' },
  buttonText: { color: Colors.secondary, fontFamily: Typography.bold }
});