import { useState, useRef } from "react";
import { View, Text, TouchableOpacity, Image, FlatList, Dimensions, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { Colors, Typography } from './theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';


const { width } = Dimensions.get("window");



const slides = [
  {
    id: "1",
    title: "Welcome to BizPal",
    description: "Manage your customers easily and efficiently.",
    image: require("../assets/images/onboarding-1.png"),
  },
  {
    id: "2",
    title: "Track Sales",
    description: "Keep track of all your sales in one place.",
    image: require("../assets/images/onboarding-2.png"),
  },
  {
    id: "3",
    title: "Grow Your Business",
    description: "Analyze data and make smarter decisions.",
    image: require("../assets/images/onboarding-3.png"),
  },
];

export default function Onboarding() {

  const insets = useSafeAreaInsets();
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);
  const router = useRouter();

  
  const finishOnboarding = async () => {
    try {
      
      await AsyncStorage.setItem("onboardingSeen", "true");
      
     
      router.replace("/login"); 
    } catch (e) {
      console.error("Save error:", e);
    }
  };


  
const getItemLayout = (_, index) => ({
  length: width,
  offset: width * index,
  index,
});

const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      flatListRef.current?.scrollToIndex({ 
        index: currentIndex + 1, 
        animated: true 
      });
    } else {
      finishOnboarding(); 
    }
  };





  
  const renderItem = ({ item }) => (
    <View style={[styles.slide, { width }]}>
      <Image source={item.image} style={styles.image} resizeMode="contain" />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );

  const onViewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems.length > 0) setCurrentIndex(viewableItems[0].index);
  };

  const viewConfigRef = { viewAreaCoveragePercentThreshold: 50 };
  
  return (
    <View style={styles.container}>
      <FlatList
        data={slides}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        ref={flatListRef}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewConfigRef}
        
        keyExtractor={(item) => item.id}
        getItemLayout={getItemLayout}
      />

      
      <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, 20) }]}>
        <View style={styles.dots}>
          {slides.map((_, i) => (
            <View
              key={i}
              style={[
                styles.dot,
                { backgroundColor: i === currentIndex ? "#204070" : "#ccc" },
              ]}
            />
          ))}
        </View>

        <TouchableOpacity style={styles.button} onPress={handleNext}>
          <Text style={styles.buttonText}>
            {currentIndex === slides.length - 1 ? "Get Started" : "Next"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: Colors.secondary},

  slide: { 
    flex: 1, 
    alignItems: "center", 
    justifyContent: "center", 
    padding: 20 },

  image: { 
    width: 250, 
    height: 250, 
    marginBottom: 20 },

  title: { 
    fontFamily: Typography.bold,
    fontSize: 24, 
    color: Colors.background, 
    marginBottom: 10, 
    textAlign: "center" },

  description: { 
    fontFamily: Typography.regular,
    fontSize: 16, 
    color: Colors.surface, 
    textAlign: "center" },

  footer: { 
    padding: 20,
 },

  dots: { 
    flexDirection: "row", 
    justifyContent: "center", 
    marginBottom: 20 },

  dot: { 
    width: 10, 
    height: 10, 
    borderRadius: 5, 
    marginHorizontal: 5 },

  button: { 
    
    backgroundColor: Colors.accent, 
    padding: 15, 
    borderRadius: 10, 
    alignItems: "center" },

  buttonText: { 
    color: Colors.background, 
    fontWeight: "bold", 
    fontSize: 16 },
});