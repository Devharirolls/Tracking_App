import createDataContext from "./createDataContext";
import trackerApi from "../api/tracker";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { navigate } from '../navigationRef';

const authReducer =(state,action)=>{
    switch(action.type){
        case 'add_error':
            return { ...state, errorMessage: action.payload };
        case 'signin':
            return { errorMessage: '', token: action.payload };
        case 'clear_error_message':
            return { ...state, errorMessage: '' };
        case 'signout':
            return { token: null, errorMessage: '' };
        default:
            return state;
    };
}

const Signup = dispatch => async ({ email, password }) => {
    try {
      const response = await trackerApi.post('/signup', { email, password });
      console.log(response.data);
        await AsyncStorage.setItem('token', response.data.token);
     dispatch({ type: 'signin', payload: response.data.token });

     navigate('main');
    } catch (err) {
      dispatch({
        type: 'add_error',
        payload: 'Something went wrong with sign up'
      });
    }
  };
//         //make api respect to sign up with the email and password
//         //if we sign up ,modify our state,ans say that we are authendiacted
//         //if signing up fails , we propabily have a error message to our user

const tryLocalSignin = dispatch => async () => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    dispatch({ type: 'signin', payload: token });
   navigate('main');
  } else {
    navigate('Signup');
  }
};


const clearErrorMessage = dispatch => () => {
  dispatch({ type: 'clear_error_message' });
};
    

const Signin = dispatch => async ({ email, password }) => {
    try {
      const response = await trackerApi.post('/signin', { email, password });
      await AsyncStorage.setItem('token', response.data.token);
      dispatch({ type: 'signin', payload: response.data.token });
      navigate('main');
    } catch (err) {
      dispatch({
        type: 'add_error',
        payload: 'Something went wrong with sign in'
      });
    }
  };
//         //try to signin
//         //handle success by updating state
//         //handle failure by error message


const Signout = dispatch => async () => {
  await AsyncStorage.removeItem('token');
  dispatch({ type: 'signout' });
  navigate('loginFlow');
};

export const {Provider,Context}=createDataContext(
    authReducer,
    {Signin,Signout,Signup,clearErrorMessage,tryLocalSignin},
    {token:null,errorMessage : ''}
)