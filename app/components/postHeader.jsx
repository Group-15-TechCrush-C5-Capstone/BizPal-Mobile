import {StyleSheet, Text, View } from "react-native";




const PostHeader = ({
 
  profileName,
  timeStamp,
  shortBio,
  Dot,
  connectionLevel,
}) => {
  return (
    <View style={postStyles.contain}>
      <View style={postStyles.head}>
        <View>
          <View style={postStyles.nameRow}>
            
            <Text style={postStyles.profileName}>{profileName}</Text>
            <Text style={postStyles.dot}>{Dot}</Text>
            <Text style={postStyles.connect}>{connectionLevel}</Text>
          </View>
          
          <Text style={postStyles.shortBio}>{shortBio}</Text>
          <Text style={postStyles.timeStamp}>{timeStamp}</Text>
        </View>

         </View>
     
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
    

  },

postBottom:{ 
  flexDirection: "row",
  justifyContent: "space-around",
  paddingVertical: 10,
  backgroundColor: "red"
  }
});

export default PostHeader;
