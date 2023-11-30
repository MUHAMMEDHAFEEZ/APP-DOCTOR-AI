import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ChatScreen = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const flatListRef = useRef(null);

  const apiUrl = 'https://doctorai.pythonanywhere.com/myapp/api/';

  const sendMessageToBot = async () => {
    try {
      // Send user message
      setMessage('');
      const userMessage = { text: message, sender: 'user', key: String(messages.length) };
      setMessages((prevMessages) => [...prevMessages, userMessage]);

      // Fetch response from the bot
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: message }),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log('API Response Data:', responseData);

        // Display bot's response immediately
        const botMessage = { text: responseData.message, sender: 'bot', key: String(messages.length + 1) };
        setMessages((prevMessages) => [...prevMessages, botMessage]);

      } else {
        console.error('API Error:', response.status);
        Alert.alert('API Error', 'An error occurred while communicating with the bot.');
      }
    } catch (error) {
      console.error('Error sending/receiving messages:', error);
      Alert.alert('Error', 'An unexpected error occurred.');
    }
  };

  useEffect(() => {
    // Scroll to the end of the list when messages change
    flatListRef.current.scrollToEnd();
  }, [messages]);

  const renderMessage = ({ item }) => (
    <View style={{ marginBottom: 10, alignSelf: item.sender === 'user' ? 'flex-end' : 'flex-start' }}>
      <Text style={{
        fontSize: 16,
        backgroundColor: item.sender === 'user' ? '#313131' : item.sender === 'bot' ? '#00A859' : '#e6e6fa',
        padding: 8,
        borderRadius: 8,
        color: 'white', // Set the font color to white
      }}>
        {item.text}
      </Text>
    </View>
  );

  return (
    <View style={{ flex: 1, padding: 16, marginTop: 30 }}>
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.key}
        extraData={messages}
      />

      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TextInput
          style={{ flex: 1, borderWidth: 1, padding: 8, borderRadius: 15 }}
          placeholder="Type your message"
          value={message}
          onChangeText={(text) => setMessage(text)}
        />
        
        <TouchableOpacity
          style={{ backgroundColor: '#00A859', borderRadius: 15, padding: 10, alignItems: 'center', marginLeft: 8 }}
          onPress={sendMessageToBot}
        >
          <Ionicons name="send" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatScreen;
