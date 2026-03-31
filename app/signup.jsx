import { useState } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, StyleSheet, 
  ScrollView, Alert, ActivityIndicator, Image, 
  KeyboardAvoidingView, Platform 
} from 'react-native';
import { apiRequest } from '../utils/api'; 
import { Colors, Spacing, Typography } from './theme';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

export default function Signup() {
  const [form, setForm] = useState({ 
    name: '', 
    email: '', 
    password: '', 
    phone: '',
    business_name: '' 
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignup = async () => {
    if (!form.name || !form.email || !form.password || !form.phone || !form.business_name) {
      Alert.alert("Missing Fields", "Please fill in all details.");
      return;
    }

   setLoading(true);
  const res = await apiRequest('/auth/register', 'POST', form);
  setLoading(false);

  // LOGIC: If success OR if the message explicitly says it needs verification
  if (res.success || res.message?.toLowerCase().includes("unverified")) {
    router.push({ 
      pathname: '/verify', 
      params: { email: form.email } 
    });
  } else {
    Alert.alert("Signup Issue", res.message || "Something went wrong.");
  }
};

  return (
   
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.secondary }}>
      <StatusBar style="light" />
      
      
      <View style={styles.headview}>
        <Image 
          source={require('../assets/images/signup-logo.png')} 
          style={styles.logo} 
          resizeMode="contain" 
        />
        <Text style={styles.title}>Your business fully organized</Text>
        <Text style={styles.subtitle}>Join thousands of Nigerian business owners managing customers with BizPal</Text>
      </View>

      
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1, backgroundColor: Colors.background }} 
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput 
              style={styles.input} 
              placeholder="e.g. John Doe"
              placeholderTextColor="#7A8B9A" 
              onChangeText={(val) => setForm({...form, name: val})}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Business Name</Text>
            <TextInput 
              style={styles.input} 
              placeholder="e.g. Panda Designs"
              placeholderTextColor="#7A8B9A"
              onChangeText={(val) => setForm({...form, business_name: val})}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email Address</Text>
            <TextInput 
              style={styles.input} 
              placeholder="name@company.com"
              placeholderTextColor="#7A8B9A"
              autoCapitalize="none"
              keyboardType="email-address"
              onChangeText={(val) => setForm({...form, email: val})}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Phone Number</Text>
            <TextInput 
              style={styles.input} 
              placeholder="080..."
              placeholderTextColor="#7A8B9A"
              keyboardType="phone-pad"
              onChangeText={(val) => setForm({...form, phone: val})}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Password</Text>
            <TextInput 
              style={styles.input} 
              placeholder="••••••••"
              placeholderTextColor="#7A8B9A"
              secureTextEntry
              onChangeText={(val) => setForm({...form, password: val})}
            />
          </View>

          <TouchableOpacity 
            style={[styles.button, loading && { opacity: 0.7 }]} 
            onPress={handleSignup} 
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color={Colors.secondary} />
            ) : (
              <Text style={styles.buttonText}>Create My Account</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push('/login')} style={styles.link}>
            <Text style={styles.linkText}>
              Already a member? <Text style={{color: Colors.accent, fontFamily: Typography.bold}}>Login</Text>
            </Text>
          </TouchableOpacity>

          
          <View style={{ height: 40 }} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headview: {
    backgroundColor: Colors.secondary,
    paddingHorizontal: Spacing.m,
    paddingBottom: 20,
    paddingTop: 10,
  },
  scrollContainer: { 
    padding: 16, 
    backgroundColor: Colors.background, 
    flexGrow: 1, 
  },
  title: { 
    fontSize: 24, 
    fontFamily: Typography.bold, 
    color: "#FFFFFF", 
    marginBottom: 5,
    marginTop: 5
  },
  subtitle: { 
    fontSize: 14, 
    fontFamily: Typography.regular, 
    color: Colors.surface, 
    marginBottom: 10,
  },
  logo: { 
    width: 120, 
    height: 50,
    marginLeft: -18
  },
  inputGroup: { 
    marginBottom: 12
  },
  label: { 
    fontFamily: Typography.semiBold, 
    marginBottom: 6, 
    color: Colors.textMain, 
    fontSize: 14 
  },
  input: { 
    backgroundColor: Colors.surface, 
    borderWidth: 1, 
    borderColor: Colors.border, 
    borderRadius: 10, 
    padding: 14, 
    fontSize: 16,
    fontFamily: Typography.regular,
    color: Colors.textMain,       
    textAlignVertical: 'center', 
  },
  button: { 
    backgroundColor: Colors.accent, 
    padding: 16, 
    borderRadius: 10, 
    alignItems: 'center', 
    marginTop: 10, 
    elevation: 2 
  },
  buttonText: { 
    color: Colors.secondary, 
    fontFamily: Typography.bold, 
    fontSize: 17 
  },
  link: { 
    marginTop: 20, 
    alignItems: 'center' 
  },
  linkText: { 
    fontFamily: Typography.regular, 
    color: Colors.textMain, 
    fontSize: 15 
  }
});