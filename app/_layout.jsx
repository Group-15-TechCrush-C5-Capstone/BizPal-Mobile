import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SplashScreen from 'expo-splash-screen';

import { 
  useFonts, 
  Poppins_400Regular, 
  Poppins_700Bold, 
  Poppins_600SemiBold 
} from '@expo-google-fonts/poppins';

SplashScreen.preventAutoHideAsync();

export default function Layout() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [seenOnboarding, setSeenOnboarding] = useState(false);
  const router = useRouter();
  const segments = useSegments();

  const [fontsLoaded, fontError] = useFonts({
    'Poppins-Regular': Poppins_400Regular,
    'Poppins-SemiBold': Poppins_600SemiBold,
    'Poppins-Bold': Poppins_700Bold,
  });

  
  useEffect(() => {
    async function prepare() {
      try {
        const value = await AsyncStorage.getItem("onboardingSeen");
        setSeenOnboarding(value === "true");
      } catch (e) {
        console.warn(e);
      } finally {
        if (fontsLoaded || fontError) {
          setAppIsReady(true);
          await SplashScreen.hideAsync();
        }
      }
    }
    prepare();
  }, [fontsLoaded, fontError, segments]); 


  useEffect(() => {
    if (!appIsReady) return;

    const inOnboarding = segments[0] === "onboarding";

    
    if (seenOnboarding && inOnboarding) {
      router.replace("/");
    } 
   
    else if (!seenOnboarding && !inOnboarding) {
      router.replace("/onboarding");
    }
  }, [appIsReady, seenOnboarding, segments]);

  if (!appIsReady) return null;

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="onboarding" />
    </Stack>
  );
}