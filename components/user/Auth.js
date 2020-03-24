import React, { useState, useReducer, useCallback } from 'react';
import { View, Text, ScrollView, KeyboardAvoidingView, Button, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';

import Input from '../../components/ui/Input';
import Card from '../../components/ui/Card';
import Colors from '../../constants/Colors';
import * as authActions from '../../store/actions/auth';

const UPDATE_FORM_INPUT = 'UPDATE_FORM_INPUT';

const formReducer = (state, action) => {
  if (action.type === UPDATE_FORM_INPUT) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid
    };
    let updatedIsFormValid = true;
    for (const key in updatedValidities) {
      updatedIsFormValid = updatedIsFormValid && updatedValidities[key];
    }
    return {
      isFormValid: updatedIsFormValid,
      inputValues: updatedValues,
      inputValidities: updatedValidities
    };
  }
  return state;
};

const Auth = props => {
  const [isSignup, setIsSignup] = useState(false);
  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: '',
      password: ''
    },
    inputValidities: {
      email: false,
      password: false
    },
    isFormValid: false
  });

  const authHandler = () => {
    let action;
    if (isSignup) {
      action = authActions.signup(
          formState.inputValues.email,
          formState.inputValues.password
      );
    } else {
      action = authActions.login(
        formState.inputValues.email,
        formState.inputValues.password
      );
    }
    dispatch(action);
  };

  const changeInputHandler = useCallback((inputIdentifier, inputValue, isInputValid) => {
    dispatchFormState({
      type: UPDATE_FORM_INPUT,
      value: inputValue,
      isValid: isInputValid,
      input: inputIdentifier
    });
  }, [dispatchFormState]);

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
            errorText="Please enter a valid email address."
            onChangeInput={changeInputHandler}
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
            errorText="Please enter a valid password."
            onChangeInput={changeInputHandler}
            initialValue=""
          />
          <View style={styles.buttonContainer}>
            <Button title={isSignup ? 'Sign Up' : 'Login'} color={Colors.primary} onPress={authHandler} />
          </View>
          <View style={styles.buttonContainer}>
            <Button title={isSignup ? 'Existing User' : 'New Account'} onPress={() => {
              setIsSignup(prevState => !prevState);
            }} />
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
