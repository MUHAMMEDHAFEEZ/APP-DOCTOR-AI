import { View, Text, Image, StyleSheet } from 'react-native';
import React from 'react';
import { useAuth, useUser } from "@clerk/clerk-expo";

export default function HomeScreen() {
  const { isLoaded, userId, sessionId, getToken } = useAuth();
  const { user } = useUser();
  
  // In case the user signs out while on the page.
  if (!isLoaded || !userId) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        {user.profileImageUrl && (
          <Image source={{ uri: user.profileImageUrl }} style={styles.profileImage} />
        )}
        <View style={styles.textContainer}>
          <Text style={styles.welcomeText}>Welcome Back</Text>
          <Text style={styles.userName}>{user.fullName}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginTop: 50,
    marginLeft: 16,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  textContainer: {
    marginLeft: 8,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 8,
  },
  welcomeText: {
    fontSize: 12,
    fontWeight: 'light',
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
