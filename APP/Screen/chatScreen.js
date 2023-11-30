import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Alert } from 'react-native';

const ChatScreen = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const flatListRef = useRef(null);

  const apiUrl = 'https://doctorai.pythonanywhere.com/myapp/api/';

  const sendMessageToBot = async () => {
    try {
      // Send user message
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

      const responseData = await response.json();

      // Display bot's response after a short delay
      setTimeout(() => {
        const botMessage = { text: responseData.content, sender: 'bot', key: String(messages.length + 1) };
        setMessages((prevMessages) => [...prevMessages, botMessage]);
      }, 3000); // Adjust the delay as needed

      // Clear the input box after sending a message
      setMessage('');
    } catch (error) {
      console.error('Error sending/receiving messages:', error);
      Alert.alert('Error', 'An error occurred while communicating with the bot.');
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
        backgroundColor: item.sender === 'user' ? '#add8e6' : item.sender === 'bot' ? '#00A859' : '#e6e6fa', // Change bot's response color to green
        padding: 8,
        borderRadius: 8,
      }}>
        {item.text}
      </Text>
    </View>
  );

  return (
    <View style={{ flex: 1, padding: 20,marginTop:30 }}>
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.key}
        extraData={messages}
      />

      <TextInput
        style={{ borderWidth: 1, padding: 8, marginBottom: 16, borderRadius: 15 }}
        placeholder="Type your message"
        value={message}
        onChangeText={(text) => setMessage(text)}
      />

      <TouchableOpacity
        style={{ backgroundColor: '#00A859', borderRadius: 15, padding: 10, alignItems: 'center' }}
        onPress={sendMessageToBot}
      >
        <Text style={{ color: 'white', fontWeight: 'bold' }}>Send Message</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ChatScreen;
