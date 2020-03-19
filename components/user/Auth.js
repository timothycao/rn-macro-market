import React from 'react';
import { View, Text, ScrollView, KeyboardAvoidingView, Button, StyleSheet } from 'react-native';

import Input from '../../components/ui/Input';
import Card from '../../components/ui/Card';
import Colors from '../../constants/Colors';

const Auth = props => {
  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={50}
      style={styles.screen}
    >
      <Text style={styles.title}>Macro Market</Text>
      <Card style={styles.authContainer}>
        <ScrollView>
          <Input
            id="email"
            label="E-Mail"
            keyboardType="email-address"
            required
            email
            autoCapitalize="none"
            errorMessage="Please enter a valid email address."
            onChangeInput={() => {}}
            initialValue=""
          />
          <Input
            id="password"
            label="Password"
            keyboardType="default"
            secureTextEntry
            required
            minLength={5}
            autoCapitalize="none"
            errorMessage="Please enter a valid password."
            onChangeInput={() => {}}
            initialValue=""
          />
          <View style={styles.buttonContainer}>
            <Button title="Login" color={Colors.primary} onPress={() => {}} />
          </View>
          <View style={styles.buttonContainer}>
            <Button title="New Account" onPress={() => {}} />
          </View>
        </ScrollView>
      </Card>
    </KeyboardAvoidingView>
  )
};

Auth.navigationOptions = {
  headerShown: false
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary
  },
  title: {
    fontSize: 30,
    fontFamily: 'open-sans-bold',
    color: Colors.secondary,
    margin: 20
  },
  authContainer: {
    width: '80%',
    maxWidth: 400,
    maxHeight: 400,
    padding: 20
  },
  buttonContainer: {
    marginTop: 10
  }
});

export default Auth;
