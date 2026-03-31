import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { Colors } from './theme';

export default function Index() {
  return (
    <View style={styles.centered}>
      <ActivityIndicator size="large" color={Colors.accent} />
    </View>
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.secondary
  },
});