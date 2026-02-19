import { Pressable, StyleSheet, Text, View } from "react-native";

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const postBottom = () => {
  return (
        
        <View style={postStyles.postBottom}>
            <Pressable style={postStyles.pAction}>
        <AntDesign name="like" size={24} color="black" />
        <Text>Like</Text>
          </Pressable>
          <Pressable style={postStyles.pAction}>
       <MaterialCommunityIcons name="comment-text-outline" size={22} color="black" />
        <Text>Comment</Text>
          </Pressable>
          <Pressable style={postStyles.pAction}>
        <FontAwesome6 name="retweet" size={24} color="black" />
        <Text>Repost</Text>
          </Pressable>
          <Pressable style={postStyles.pAction}>
        <FontAwesome name="send" size={22} color="black" />
        <Text>Send</Text>
          </Pressable>
        </View>
        
      
  );
};
export const postStyles = StyleSheet.create({
  head: {
    fontSize: 18,
    fontWeight: "400",
  },
  contain: {
    gap: 6,
    backgroundColor: "white",
  },

  nameRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileName: {
    fontWeight: "600",
    fontSize: 16

  },
  shortBio: {
    color: "grey",
    fontSize: 13
  },
  timeStamp: {
    color: "grey",
    fontSize: 13
  },
  connect: {
    color: "grey",
    fontSize: 13
  },
  dot: {
    marginHorizontal: 4,
    fontWeight: "700",
    color: "grey"
  },
  body: {
    marginRight: "30",
    marginTop: 10,
  },

  pAction:{
    alignItems: "center"

  },

postBottom:{ 
  flexDirection: "row",
  justifyContent: "space-around",
  paddingVertical: 10,
  
  }
});

export default postBottom;
