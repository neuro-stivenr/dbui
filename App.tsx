import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import Form from './form';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
})

export default function App() {
  return (
    <View style={styles.container}>
      <Form
        title="MyForm"
        lineNames={[
          "First Name",
          "Last Name",
          "Social Security",
          "Phone",
          "Email",
          "ID"
        ]}
      />
    </View>
  );
}
