import React, { useContext } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import AuthForm from '../components/Authform';
import Navlink from '../components/Navlink';
import { Context } from '../context/AuthContext';

const SigninScreen = () => {
  const { state, Signin, clearErrorMessage } = useContext(Context);

  return (
    <View style={styles.container}>
      <NavigationEvents onWillBlur={clearErrorMessage} />
      <AuthForm
        headerText="Sign In to Your Account"
        errorMessage={state.errorMessage}
        onSubmit={Signin}
        submitButtonText="Sign In"
      />
      <Navlink
        text="Dont have an account? Sign up instead"
        routeName="Signup"
      />
    </View>
  );
};

// SigninScreen.navigationOptions = {
//   header: null
// };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 250
  }
});

export default SigninScreen;