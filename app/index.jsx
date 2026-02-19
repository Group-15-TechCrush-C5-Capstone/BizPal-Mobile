import { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "./components/header";
import Picture from "./components/picture";
import PostHeader from "./components/postHeader";
import PostBottom from "./components/PostBottom";
import PostContent from "./components/postContent";

const profilepic = require("../assets/images/prof.png");

export default function Home() {
  const [More, setMore] = useState(false);

  return (
    <ScrollView style={styles.safe}>
      <SafeAreaView style={styles.mainview}> 
        <Header />
        <View style={styles.root}>
          <Picture source={profilepic} style={styles.img} />
          <PostHeader
            profileName={"Aminu Garba Ahmad"}
            Dot={"."}
            connectionLevel={"3rd"}
            shortBio={"Domain Investor | Domain Broker"}
            timeStamp={"2d"}
          />
          
         
        </View>
        <View style={styles.viewall}>
        <PostContent body={`CoreConnectSolutions.com\n\nIn today’s fast-moving digital world, strong connections are everything. Businesses that build reliable digital infrastructure stand out and scale faster.`}
        numberOfLines={More ? undefined : 3}>
            <Text onPress={() => setMore(!More)}>
              <Text style={styles.toggleText}>
                {More ? "Show less" : "Show more"}
              </Text>
            </Text>
            </PostContent>
          <PostBottom/>
          </View>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  img: {
    height: 30,
    width: 30,
    borderRadius: 50,
    marginRight: 10,
  },

  safe: { flex: 1, backgroundColor: "#eef3f8" },
  root: {
    flexDirection: "row",
    backgroundColor: "white",
    padding: 16,
    
  },
  textStyle: { fontSize: 14, color: "#333" },

  toggleText: {
    color: "blue",
    fontWeight: "bold",
    marginTop: 4,
  },
 
  viewall: {
    paddingHorizontal: 10,
    backgroundColor: "white"
  }
  
});
