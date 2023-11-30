import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { NfcTech, Ndef } from 'react-native-nfc-manager';

export default function NfcScreen() {
  const [nfcData, setNfcData] = useState(null);

  useEffect(() => {
    // Add NFC reading logic here
    const readNfc = async () => {
      try {
        await NfcTech.Ndef.makeResponseAndroid([
          Ndef.textRecord('Hello, NFC!'), // You can customize the payload here
        ]);

        const tag = await NfcTech.Ndef.read();

        if (tag) {
          // Extract and set the NFC data
          const payload = tag.ndefMessage[0].payload;
          const text = Ndef.text.decodePayload(payload);
          setNfcData(text);
        }
      } catch (error) {
        console.error('Error reading NFC:', error);
      }
    };

    // Start listening for NFC events when the component mounts
    const startNfcListener = async () => {
      try {
        await NfcTech.Ndef.start();
        await NfcTech.Ndef.subscribe();
      } catch (error) {
        console.error('Error starting NFC listener:', error);
      }
    };

    readNfc(); // Read NFC data immediately
    startNfcListener(); // Start NFC listener

    // Clean up NFC listener when the component unmounts
    return () => {
      NfcTech.Ndef.stop();
      NfcTech.Ndef.unsubscribe();
    };
  }, []);

  return (
    <View>
      <Text>NfcScreen</Text>
      {nfcData && <Text>NFC Data: {nfcData}</Text>}
    </View>
  );
}
