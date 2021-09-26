import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import Form from './form';


export default function App() {
  return (
    <View style={styles.container}>
      <Form
        title="MyForm"
        lineNames={[
          "FirstName",
          "LastName",
          "BirthDate",
          "Salary",
          "Social Security"
        ]}
        style={styles.form}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    padding: 10
  }
});
