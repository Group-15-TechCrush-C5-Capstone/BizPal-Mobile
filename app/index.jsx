import { StyleSheet } from 'react-native'
import { WebView } from 'react-native-webview';
import { SafeAreaView } from 'react-native-safe-area-context'

const index = () => {
  return (
    <SafeAreaView style={styles.mainview}>
      <WebView source={{ uri: 'https://expressmoney.com.ng/?login' }} />
    </SafeAreaView>
  )
}

export default index

const styles = StyleSheet.create({
  mainview:{
    flex: 1
  }
})