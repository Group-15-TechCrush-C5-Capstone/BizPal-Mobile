import { Image, View } from "react-native";

const Picture = ({ source, style }) => {
  return (
    <View>
      <Image source={source} style={[style]} />
    </View>
  );
};

export default Picture;
