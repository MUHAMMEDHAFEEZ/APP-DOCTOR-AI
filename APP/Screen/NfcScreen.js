import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { NfcTech, Ndef, NfcManager } from 'react-native-nfc-manager';

export default function NfcScreen() {
  const [nfcData, setNfcData] = useState(null);

  useEffect(() => {
    const readNfc = async () => {
      try {
        await NfcTech.Ndef.makeResponseAndroid([
          Ndef.textRecord('Hello, NFC!'),
        ]);

        const tag = await NfcTech.Ndef.read();

        if (tag) {
          const payload = tag.ndefMessage[0].payload;
          const text = Ndef.text.decodePayload(payload);
          setNfcData(text);
        }
      } catch (error) {
        console.error('Error reading NFC:', error);
      }
    };

    const startNfcListener = async () => {
      try {
        await NfcManager.start();
        await NfcManager.requestTechnology(NfcTech.Ndef);
        console.log('NFC listener started');
      } catch (error) {
        console.error('Error starting NFC listener:', error);
      }
    };

    readNfc();
    startNfcListener();

    return async () => {
      await NfcManager.stop();
      console.log('NFC listener stopped');
    };
  }, []);

  return (
    <View>
      <Text>NfcScreen</Text>
      {nfcData && <Text>NFC Data: {nfcData}</Text>}
    </View>
  );
}
