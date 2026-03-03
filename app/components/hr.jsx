import { StyleSheet, View } from 'react-native'


export default function Hr() {
  return (
    <View style={styles.hr}>
      
    </View>
  )
}

const styles = StyleSheet.create({
    hr  :{
borderTopColor: "lightgrey",
borderTopWidth: .7,
borderStyle: "solid",
marginTop: 10
    }
})