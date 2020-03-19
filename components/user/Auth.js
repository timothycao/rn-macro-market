import React from 'react';
import { View, ScrollView, KeyboardAvoidingView, Button, StyleSheet } from 'react-native';

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
          <Button title="Login" color={Colors.primary} onPress={() => {}} />
          <Button title="New Account" onPress={() => {}} />
        </ScrollView>
      </Card>
    </KeyboardAvoidingView>
  )
};

Auth.navigationOptions = {
  headerTitle: 'Login'
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  authContainer: {
    width: '80%',
    maxWidth: 400,
    maxHeight: 400,
    padding: 20
  }
});

export default Auth;
