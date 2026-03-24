import  { useState, useRef, useEffect } from 'react';
import { StyleSheet, ActivityIndicator, Text, View, TouchableOpacity, BackHandler, ScrollView, RefreshControl  } from 'react-native';
import { WebView } from 'react-native-webview';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Colors, Typography } from './theme';
import CustomModal from './components/CustomModal';

const Index = () => {
  const [progress, setProgress] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [showExitModal, setShowExitModal] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const [errorDetails, setErrorDetails] = useState({ status: false, message: "" });
  const [canGoBack, setCanGoBack] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);
  const webViewRef = useRef(null);
  const showExitModalRef = useRef(false);

useEffect(() => {
  showExitModalRef.current = showExitModal;
}, [showExitModal]);


  const onRefresh = () => {
  setRefreshing(true);
  if (webViewRef.current) {
    webViewRef.current.reload(); 
  }
  
};



  const loadingIndicator = () => (
    <View style={styles.indicatorContainer}>
      <ActivityIndicator color={Colors.accent} size='large' />
    </View>
  );

  useEffect(() => {
    const handleBackPress = () => {
     
      if (showExitModal) {
        setShowExitModal(false);
        return true;
      }

      
      if (canGoBack && webViewRef.current) {
        webViewRef.current.goBack();
        return true;
      }

      setShowExitModal(true);
      return true;
    };

    const subscription = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackPress
    );

    return () => subscription.remove();

  }, [canGoBack, showExitModal]);


  const handleRetry = () => {
    setErrorDetails({ status: false, message: "" });
    setIsNavigating(true);
    
  };

  return (
    <SafeAreaView edges={['top', 'bottom']} style={styles.mainview}>
    <StatusBar style="light" />

    
    {errorDetails.status ? (
      <View style={styles.errorContainer}>
        
        <Text style={styles.errorText}>
          {errorDetails.message.includes("URL") ? "URL Error" : "Connection Error"}
        </Text>
        
        <Text style={styles.errorSubtext}>{errorDetails.message}</Text>
        
        <TouchableOpacity style={styles.retryButton} onPress={handleRetry}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    ) : (
      <View style={{ flex: 1 }}>
       
        {progress < 1 && (
          <View style={[styles.progressBar, { width: `${progress * 100}%` }]} />
        )}

        <ScrollView
          contentContainerStyle={{ flex: 1 }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[Colors.warning]}
              progressBackgroundColor={Colors.primary}
              enabled={isAtTop}
            />
          }
        >
          <WebView
            ref={webViewRef}
            style={styles.webview}
            source={{ uri: 'https://bizpal.vercel.app' }}

   
  onScroll={(event) => {
    const scrollY = event.nativeEvent.contentOffset.y;
    // Only allow pull-to-refresh if the user is at the absolute top
    setIsAtTop(scrollY <= 0);
  }}
  // ... other props

            onNavigationStateChange={(navState) => setCanGoBack(navState.canGoBack)}
            
            
            onLoadProgress={({ nativeEvent }) => setProgress(nativeEvent.progress)}

            renderLoading={() => null}
            startInLoadingState={true}

            
            onLoadStart={() => {
              setProgress(0); 
              if (!refreshing) setIsNavigating(true);
            }}

            
            onLoadEnd={() => {
              setProgress(1);
              setIsNavigating(false);
              setRefreshing(false);
            }}

            onError={(syntheticEvent) => {
              const { nativeEvent } = syntheticEvent;
              setIsNavigating(false);
              let userFriendlyMessage = "An unexpected error occurred.";
              if (nativeEvent.description.includes("ERR_NAME_NOT_RESOLVED")) {
                userFriendlyMessage = "Invalid Website Address.";
              } else if (nativeEvent.description.includes("ERR_INTERNET_DISCONNECTED")) {
                userFriendlyMessage = "No Internet Connection.";
              }
              setErrorDetails({ status: true, message: userFriendlyMessage });
            }}
          />
        </ScrollView>
      </View>
    )}

    
    
{(isNavigating && !errorDetails.status && !refreshing) && loadingIndicator()}

    <CustomModal 
  visible={showExitModal} 
  onClose={() => setShowExitModal(false)} 
  onConfirm={() => {
    setShowExitModal(false); 
    setTimeout(() => {
      BackHandler.exitApp(); 
    }, 100); 
  }} 
  title="Exit BizPal?"
  message="Are you sure you want to close the app?"
/>
    </SafeAreaView>
  );
};

export default Index;

const styles = StyleSheet.create({
  indicatorContainer: {
    backgroundColor: Colors.primary,
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  mainview: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  webview: {
    flex: 1,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary, 
    padding: 20,
  },
  errorText: {
    fontFamily: Typography.bold,
    color: Colors.error, 
    fontSize: 22,
    marginBottom: 10,
  },
  errorSubtext: {
    fontFamily: Typography.regular,
    color: Colors.textMuted,
    textAlign: 'center',
    marginBottom: 20,
  },

  retryButton: {
    fontFamily: Typography.semiBold,
    backgroundColor: Colors.accent, 
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25,
  },
  retryButtonText: {
    fontFamily: Typography.bold,
    color: Colors.textMain,
    fontSize: 16,
  },

  progressBar: {
    height: 3,
    backgroundColor: Colors.accent,
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 20,
  },
});