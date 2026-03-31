import AsyncStorage from "@react-native-async-storage/async-storage";

export const checkNavigationState = async () => {
  const [onboarding, token] = await Promise.all([
    AsyncStorage.getItem("onboardingSeen"),
    AsyncStorage.getItem("userToken")
  ]);
  return {
    seenOnboarding: onboarding === "true",
    userToken: token
  };
};

export default checkNavigationState;