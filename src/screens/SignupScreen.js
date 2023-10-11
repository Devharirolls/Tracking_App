

import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { Context as AuthContext } from '../context/AuthContext';
import AuthForm from '../components/Authform';
import Navlink from '../components/Navlink';
import { Button } from 'react-native-elements';

const SignupScreen = ({ navigation }) => {
  const { state, Signup, clearErrorMessage } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <NavigationEvents onWillBlur={clearErrorMessage} />
      <AuthForm
        headerText="Sign Up for Tracker"
        errorMessage={state.errorMessage}
        submitButtonText="Sign Up"
        onSubmit={Signup}
      />
      <Navlink
        routeName="Signin"
        text="Already have an account? Sign in instead!"
      />
      <Button title={'tracker'} onPress={()=>navigation.navigate('main')}/>
    </View>
  );
};

// SignupScreen.navigationOptions = () => {
//   return {
//     header: null
//   };
// };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 250
  }
});

export default SignupScreen;