import { View, Text, StyleSheet } from "react-native";
import Picture from "./picture";




const PostContent = ({children, numberOfLines, body}) => {

    return(

        <View  >
        
          <Text style={contentStyles.body} numberOfLines={numberOfLines}>
            
            {body}
            
          </Text>
            {children}
          <View >
            
<Picture source={require("../../assets/images/facebook.png")} style={{height: 200, width: 300}} />
</View>

        </View>


    );


};
    
export const contentStyles = StyleSheet.create({
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
    
    marginTop: 10,
  },

  pAction:{
    

  },

});



export default PostContent;

             