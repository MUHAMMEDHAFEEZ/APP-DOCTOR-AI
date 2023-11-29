import React from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { ClerkProvider, SignedIn, SignedOut } from '@clerk/clerk-expo';
import LoginScreen from './APP/Screen/LoginScreen';
import TabNavigation from './APP/Navigations/TabNavigation';

const App = () => {
  return (

    <ClerkProvider publishableKey="pk_test_Z2VudGxlLXNwYW5pZWwtNzUuY2xlcmsuYWNjb3VudHMuZGV2JA">
      <View style={styles.container}>
        <NavigationContainer>
          <SignedIn>
            <TabNavigation />
          </SignedIn>
          <SignedOut>
            <LoginScreen />
          </SignedOut>
        </NavigationContainer>
      </View>
    </ClerkProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default App;
