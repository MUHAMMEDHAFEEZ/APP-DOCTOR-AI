import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import app from './../../assets/images/app.png';
import { FontAwesome } from '@expo/vector-icons'; // Import FontAwesome
import * as WebBrowser from "expo-web-browser";
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
      <View style={styles.sendMessageContainer}>
        <TouchableOpacity
          style={{ flexDirection: 'row', borderColor: '#00A859', borderWidth: 2, borderRadius: 15, padding: 10, width: 376, height: 67, alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent' }}
          onPress={onPress}
        >
          <FontAwesome name="google" size={25} color={Colors.PRIMARY} style={{ marginRight: 10 }} />
          <Text style={{ color: Colors.PRIMARY, fontWeight: 'bold', fontSize: 18, padding: 1 }}>Google</Text>
        </TouchableOpacity>
      </View>
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
  sendMessageContainer: {
    position: 'absolute',
    bottom: 20, // Adjust the bottom position as needed
    alignSelf: 'center',
    marginBottom: 120
  },
});
