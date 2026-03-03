import { useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Hr from "./components/hr";
import Header from "./components/header";
import Picture from "./components/picture";
import PostHeader from "./components/postHeader";
import PostBottom from "./components/PostBottom";
import PostContent from "./components/postContent";
import Space from "./components/space";
const profilepic = require("../assets/images/prof.png");

export default function Home() {
  const [More, setMore] = useState(false);

  return (
    <SafeAreaView style={styles.mainview}> 
    <ScrollView style={styles.safe} stickyHeaderIndices={[0]}>
      
        <Header />
        <View style={styles.root}>
          <Picture source={profilepic} style={styles.avatar} />
          <PostHeader
            profileName={"Aminu Garba Ahmad"}
            Dot={"."}
            connectionLevel={"3rd"}
            shortBio={"Domain Investor | Mobile Developer"}
            timeStamp={"2d"}
          />
        </View>
        
        <View style={styles.viewall}>
        <PostContent body={`Building in public has taught me one thing: consistency beats motivation.
Whether you’re launching a startup, learning a new skill, or growing a brand,
small daily progress compounds faster than you expect.
What’s one habit that helped you stay consistent?
`}
        numberOfLines={More ? undefined : 3}>
            <Text onPress={() => setMore(!More)} >
              <Text style={styles.toggleText}>
                {More ? "Show less" : "Show more"}
              </Text>
            </Text>
            </PostContent>
           
            <Hr />
          <PostBottom/>
          </View>
        <Space/>

        <View style={styles.root}>
          <Picture source={profilepic} style={styles.avatar} />
          <PostHeader
            profileName={"Idris"}
            Dot={"."}
            connectionLevel={"3rd"}
            shortBio={"Domain Investor | Domain Broker"}
            timeStamp={"2d"}
          />
        </View>

        <View style={styles.viewall}>
        <PostContent body={
          `Early in my career, I focused too much on tools and not enough on fundamentals.

Frameworks change.
Best practices evolve.
But problem-solving skills always stay relevant.

Invest in fundamentals. They pay lifetime dividends.
`
        }
        numberOfLines={More ? undefined : 3}>
            <Text onPress={() => setMore(!More)} >
              <Text style={styles.toggleText}>
                {More ? "Show less" : "Show more"}
              </Text>
            </Text>
            </PostContent>
            <Hr />
          <PostBottom/>
          </View>
          <Space/>

        <View style={styles.root}>
          <Picture source={profilepic} style={styles.avatar} />
          <PostHeader
            profileName={"Adefolarin"}
            Dot={"."}
            connectionLevel={"3rd"}
            shortBio={"Domain Investor | Domain Broker"}
            timeStamp={"2d"}
          />
        </View>

        <View style={styles.viewall}>
        <PostContent body={`Clients don’t pay for code.
They pay for clarity, reliability, and results.

The moment I understood this, my approach to projects changed completely.

Deliver outcomes, not just features.
`}
        numberOfLines={More ? undefined : 3}>
            <Text onPress={() => setMore(!More)} >
              <Text style={styles.toggleText}>
                {More ? "Show less" : "Show more"}
              </Text>
            </Text>
            </PostContent>
            <Hr />
          <PostBottom/>
          </View>
          <Space/>

        <View style={styles.root}>
          <Picture source={profilepic} style={styles.avatar} />
          <PostHeader
            profileName={"Tech Crush"}
            Dot={"."}
            connectionLevel={"3rd"}
            shortBio={"Mobile Developer | Frontend"}
            timeStamp={"2d"}
          />
        </View>

        <View style={styles.viewall}>
        <PostContent body={`CoreConnectSolutions.com\n\nIn today’s fast-moving digital world, strong connections are everything. Businesses that build reliable digital infrastructure stand out and scale faster.`}
        numberOfLines={More ? undefined : 3}>
            <Text onPress={() => setMore(!More)} >
              <Text style={styles.toggleText}>
                {More ? "Show less" : "Show more"}
              </Text>
            </Text>
            </PostContent>
            <Image source={require("../assets/images/profile.jpeg")} style={{height: 200, width: 300, alignSelf: "center"}} />
            <Hr />
          <PostBottom/>
          </View>
          <Space/>

        <View style={styles.root}>
          <Picture source={profilepic} style={styles.avatar} />
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
            <Text onPress={() => setMore(!More)} >
              <Text style={styles.toggleText}>
                {More ? "Show less" : "Show more"}
              </Text>
            </Text>
            </PostContent>
            <Image source={require("../assets/images/profile.jpeg")} style={{height: 200, width: 300, alignSelf: "center"}} />
            <Hr />
          <PostBottom/>
          </View>
          <Space/>

        <View style={styles.root}>
          <Picture source={profilepic} style={styles.avatar} />
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
            <Text onPress={() => setMore(!More)} >
              <Text style={styles.toggleText}>
                {More ? "Show less" : "Show more"}
              </Text>
            </Text>
            </PostContent>
            <Image source={require("../assets/images/profile.jpeg")} style={{height: 200, width: 300, alignSelf: "center"}} />
            <Hr />
          <PostBottom/>
          </View>
          <Space/>

        <View style={styles.root}>
          <Picture source={profilepic} style={styles.avatar} />
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
            <Text onPress={() => setMore(!More)} >
              <Text style={styles.toggleText}>
                {More ? "Show less" : "Show more"}
              </Text>
            </Text>
            </PostContent>
            <Image source={require("../assets/images/profile.jpeg")} style={{height: 200, width: 300, alignSelf: "center"}} />
            <Hr />
          <PostBottom/>
          </View>
          <Space/>

        <View style={styles.root}>
          <Picture source={profilepic} style={styles.avatar} />
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
            <Text onPress={() => setMore(!More)} >
              <Text style={styles.toggleText}>
                {More ? "Show less" : "Show more"}
              </Text>
            </Text>
            </PostContent>
            <Image source={require("../assets/images/profile.jpeg")} style={{height: 200, width: 400, alignSelf: "center"}} />
            <Hr />
          <PostBottom/>
          </View>
          <Space/>

        <View style={styles.root}>
          <Picture source={profilepic} style={styles.avatar} />
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
            <Text onPress={() => setMore(!More)} >
              <Text style={styles.toggleText}>
                {More ? "Show less" : "Show more"}
              </Text>
            </Text>
            </PostContent>
            <Image source={require("../assets/images/profile.jpeg")} style={{height: 200, width: 400, alignSelf: "center"}} />
            <Hr />
          <PostBottom/>
          </View>
            <Space/>
        
        <View style={styles.root}>
          <Picture source={profilepic} style={styles.avatar} />
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
            <Text onPress={() => setMore(!More)} >
              <Text style={styles.toggleText}>
                {More ? "Show less" : "Show more"}
              </Text>
            </Text>
            </PostContent>
            <Image source={require("../assets/images/khalhus.png")} style={{height: 200, width: 400, alignSelf: "center"}} />
            <Hr />
          <PostBottom/>
          </View>
           </ScrollView>
      </SafeAreaView>
   
  );
}

const styles = StyleSheet.create({
  avatar: {
    height: 50,
    width: 50,
    borderRadius: 50,
    marginRight: 10,
  },

  mainview: {
    flex: 1
  },

  safe: { 
    flex: 1, 
    backgroundColor: "#eef3f8" },

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
