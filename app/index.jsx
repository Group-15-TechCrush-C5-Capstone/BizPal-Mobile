import { StyleSheet, ActivityIndicator, Text } from 'react-native'
import { WebView } from 'react-native-webview'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { View } from 'react-native'

const Index = () => {

  // Activity indicator (loading indicator)

  const loadingIndicator = ()=> (
    <View style={styles.indicatorContainer}>
      <ActivityIndicator color='#fff' size='large' style={styles.activityIndicator} />
    </View>
  );

  return (
    <SafeAreaView style={styles.mainview}>
      <StatusBar style="light"/>
      <WebView style={styles.webview} 
      source={{ uri: 'https://bizpal.cmngsn.com/'}}
      renderLoading={loadingIndicator} 
      startInLoadingState={true} 
      onError={(syntheticEvent) => {
      const { nativeEvent } = syntheticEvent;
      console.warn('WebView error: ', nativeEvent);
  }}
  renderError={() => <View><Text>Check your internet connection!</Text></View>}/>
    </SafeAreaView>
  )
}

export default Index

const styles = StyleSheet.create({

  indicatorContainer: {
    backgroundColor: '#0B172A',
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },

  activityIndicator:{
    
  },

  mainview: {
    flex: 1,
    backgroundColor: "#0B172A"
  },
  webview:{
    flex: 1,
  }
})