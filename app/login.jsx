import { useState } from 'react';
import { View, Image, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage"; 
import { apiRequest } from '../utils/api'; 
import { useRouter } from 'expo-router';
import { Colors, Typography } from './theme';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
  if (!email || !password) {
    Alert.alert("Error", "Please enter both email and password");
    return;
  }

  setLoading(true);
  const res = await apiRequest('/auth/login', 'POST', { email, password });
  setLoading(false);

  // 1. Check if the API explicitly says success: true
  if (res.success) {
    // 2. Extract token from the standard data object structure
    const tokenToSave = res.data?.token || res.token; 
    
    if (tokenToSave) {
      await AsyncStorage.setItem("userToken", tokenToSave);
      // This will trigger the Layout useEffect to re-run
      router.replace('/dashboard'); 
    } else {
      // Success is true but no token? This usually means verification is needed
      Alert.alert("Verify Email", "Please verify your account first.");
      router.push({ pathname: '/verify', params: { email } });
    }
  } else {
    // 3. Handle 401 or other errors using the message from the API
    Alert.alert("Login Failed", res.message || "Invalid email or password");
  }
};

  return (
    <View style={styles.container}>
      
      
       <Image 
         source={require('../assets/images/logo.png')} 
         style={styles.logo} 
         resizeMode="contain" 
                />
      

      <Text style={styles.title}>Welcome Back</Text>

      <TextInput 
        placeholder="Email" 
        style={styles.input} 
        onChangeText={setEmail} 
        placeholderTextColor="#7A8B9A"
        autoCapitalize="none"
        keyboardType="email-address"
      />
      
      <TextInput 
        placeholder="Password" 
        style={styles.input} 
        placeholderTextColor="#7A8B9A"
        secureTextEntry 
        onChangeText={setPassword} 
      />

      <TouchableOpacity 
        style={styles.button} 
        onPress={handleLogin}
        disabled={loading}
      >
        <Text style={styles.buttonText}>{loading ? "Signing in..." : "Login"}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/signup')} style={styles.link}>
        <Text style={styles.linkText}>Don&apos;t have an account? <Text style={{color: Colors.accent}}>Sign Up</Text></Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: Colors.surface, 
    padding: 24,
    justifyContent: 'center' 
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },

  logo: {
    width: 150, 
    height: 150, 
    alignSelf: "center"
  },

  title: { 
    color: Colors.primary, 
    fontSize: 28, 
    fontFamily: Typography.bold,
    marginBottom: 30,
    textAlign: 'center'
  },
  input: {
    borderColor: Colors.success,
    borderWidth: 0.5,
    backgroundColor: Colors.surface,
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    fontFamily: Typography.regular,
    color: Colors.textMain
  },
  button: { 
    backgroundColor: Colors.accent, 
    padding: 18, 
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10
  },
  buttonText: {
    color: Colors.secondary,
    fontFamily: Typography.bold,
    fontSize: 16
  },
  link: {
    marginTop: 20,
    alignItems: 'center'
  },
  linkText: {
    fontFamily: Typography.regular,
    color: Colors.textMain
  }
});