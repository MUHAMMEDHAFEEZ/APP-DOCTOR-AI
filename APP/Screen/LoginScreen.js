import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import app from './../../assets/images/app.png';
import * as WebBrowser from "expo-web-browser";
import Google from './../../assets/images/Google.png';
import Rectangle from './../../assets/images/Rectangle.png';
import icon from './../../assets/images/icon.png';
import Colors from '../Utils/Colors';
import { useOAuth } from "@clerk/clerk-expo";
import { useWarmUpBrowser } from '../../hooks/warmUpBrowser';

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  useWarmUpBrowser();
 
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
 
  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow();
 
      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);
 
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Image source={app} style={styles.appImage} />
      <TouchableOpacity 
      onPress={onPress}
      style={styles.overlayContainer}>
        <Image source={Rectangle} style={styles.rectangleImage} />
        <Image source={Google} style={styles.googleImage} />
        <Image source={icon} style={styles.iconImage} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  appImage: {
    width: 1100,
    height: 900,
    resizeMode: 'contain',
    marginTop: 50,
  },
  overlayContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  googleImage: {
    top: 637, // Adjust the top position as needed
    left: 185, // Adjust the left position as needed
  },
  iconImage: {
    top: 615, // Adjust the top position as needed
    left: 155, // Adjust the left position as needed
  },
  rectangleImage: {
    // backgroundColor: Colors.WHITE,
    width: 376,
    height: 67,
    borderRadius: 15,
    // marginRight:25,
    // marginLeft:50,
    top: 675, // Adjust the top position as needed
    left:20,
    // left:5, // Adjust the left position as needed
    right:50,
  },
});
