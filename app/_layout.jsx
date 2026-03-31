import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect, useState, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SplashScreen from 'expo-splash-screen';
import { View, ActivityIndicator } from 'react-native';
import { useFonts, Poppins_400Regular, Poppins_700Bold, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import { Colors } from './theme';

SplashScreen.preventAutoHideAsync();

export default function Layout() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [authState, setAuthState] = useState({ seenOnboarding: false, userToken: null });
  
  const router = useRouter();
  const segments = useSegments();

  const [fontsLoaded] = useFonts({
    'Poppins-Regular': Poppins_400Regular,
    'Poppins-SemiBold': Poppins_600SemiBold,
    'Poppins-Bold': Poppins_700Bold,
  });


  const loadState = useCallback(async () => {
    try {
      const [onboarding, token] = await Promise.all([
        AsyncStorage.getItem("onboardingSeen"),
        AsyncStorage.getItem("userToken")
      ]);
      setAuthState({
        seenOnboarding: onboarding === "true",
        userToken: token
      });
    } catch (e) {
      console.warn(e);
    } finally {
      if (fontsLoaded) {
        setAppIsReady(true);
        await SplashScreen.hideAsync();
      }
    }
  }, [fontsLoaded]);

  

  useEffect(() => {
    loadState();
  }, [loadState, segments]); // Re-check state every time the URL/Segment changes

  useEffect(() => {
    if (!appIsReady) return;

    const inAuthGroup = segments[0] === "login" || segments[0] === "signup" || segments[0] === "verify";
    const inOnboarding = segments[0] === "onboarding";
    
    if (!authState.seenOnboarding) {
      if (!inOnboarding) router.replace("/onboarding");
      return;
    }

if (authState.userToken) {
  // If they have a token and are trying to go to login/signup/onboarding
  if (inAuthGroup || inOnboarding || segments[0] === undefined || segments[0] === "index") {
    router.replace("/dashboard");
  }
}

    
  }, [appIsReady, authState, segments]);

  

  if (!appIsReady) {
  return (
    <View style={{ flex: 1, backgroundColor: Colors.secondary, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color={Colors.accent} />
    </View>
  );
}

return (
  <Stack 
    screenOptions={{ headerShown: false }}
    initialRouteName="index" 
  >
    <Stack.Screen name="index" /> 
    <Stack.Screen name="onboarding" />
    <Stack.Screen name="login" />
    <Stack.Screen name="signup" />
    <Stack.Screen name="customers" />
    <Stack.Screen name="add-customer" />
    <Stack.Screen name="verify" />
    <Stack.Screen name="dashboard" />
    
    <Stack.Screen name="add-lead" />
    <Stack.Screen name="add-note" />
  </Stack>
);
}