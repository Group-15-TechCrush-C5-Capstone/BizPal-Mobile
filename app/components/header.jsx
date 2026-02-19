import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Image, StyleSheet, TextInput, View } from "react-native";
const profilepic = require("../../assets/images/prof.png");
const Header = () => {
  return (
    <View
      style={{
        flexDirection: "row",
        backgroundColor: "white",
        alignItems: "center",
        padding: 10,
        marginBottom: 5,
      }}
    >
      <Image source={profilepic} style={styles.img} />
      <View style={styles.search}>
        <Ionicons name="search" size={24} color="black" />
        <TextInput placeholder="search" style={styles.input} />
      </View>
      <AntDesign name="message" size={24} color="black" />
    </View>
  );
};

export const styles = StyleSheet.create({
  search: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10,
    paddingHorizontal: 10,
    height: 36,
    backgroundColor: "white",
    borderColor: "#eef3f8",
    borderWidth: 2,
    borderStyle: "solid",
    borderRadius: 30,
    fontSize: 20,
  },
  background: {
    // backgroundColor: "red",
  },

  input: {
    flex: 1,
    marginLeft: 6,
    fontSize: 14,
  },

  img: {
    height: 36,
    width: 36,
    borderRadius: 18,
  },
});

export default Header;
