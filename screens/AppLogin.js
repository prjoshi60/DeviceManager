import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';
import httpLib from '../lib/httpServiceLib';

import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';

import UserNavigation from './user/testUserNavigation';

class AppLogin extends React.Component {
  constructor(props) {
    super(props);
    GoogleSignin.configure();

    this.state = {
      userInfo: null,
      userRegistered: null
    };
  }

  async componentDidMount() {
    await this._getCurrentUser();
  }

  async _getCurrentUser() {
    console.log("This Get user.");

    try {
      const userInfo = await GoogleSignin.signInSilently();
      this.setState({ userInfo: userInfo, error: null });
      if (userInfo.user.email) {
        this.saveUserDetails(userInfo);
      } else {

      }
      this.props.toggleUserStatus(userInfo);
    } catch (error) {
      const errorMessage =
        error.code === statusCodes.SIGN_IN_REQUIRED ? 'Please sign in :)' : error.message;

      this.setState({
        error: new Error(errorMessage),
      });
    }
  }

  async saveUserDetails(userInfo) {

    let body = {
      firstName: userInfo.user.givenName,
      lastName: userInfo.user.familyName,
      name: userInfo.user.name,
      email: userInfo.user.email,
      photo: userInfo.user.email,
      id: userInfo.user.email
    };

    let params = {
      method: 'post',
      body: body,
      endPoint: 'SAVE_USERS_INFO',
    };

    await httpLib.makeHttpPostRequest(params, (err, data) => {
      if (err) {
        console.log(' Service error ', err);
        this.props.setValidUser(false);
      } else {
        console.log(' Service success.', data);
        this.props.setValidUser(true);
      }
    });
  }

  renderSignInButton() {
    return (
      <>
        <GoogleSigninButton
          size={GoogleSigninButton.Size.Standard}
          color={GoogleSigninButton.Color.Auto}
          onPress={this._signIn}
        />
        <Text style={styles.information}>Please use Google Account for login.</Text>
      </>

    );
  }

  renderUserInfo(userInfo) {
    return (
      <View style={styles.container}>
        <Text style={styles.userInfo}>{userInfo.user.name}</Text>
        <Text>Your user info: {JSON.stringify(userInfo.user)}</Text>
      </View>
    );
  }

  _signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      await GoogleSignin.signIn();
      this._getCurrentUser();
    } catch (error) {

      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        Alert.alert("Ohh. Signin process is cancelled.");
      } else if (error.code === statusCodes.IN_PROGRESS) {
        Alert.alert("Please wait. Signin process is in progress.");
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert("Play service are not available.");
      } else {
        Alert.alert("Unable to so signin.");
        // some other error happened
      }
    }
  };

  render() {

    const { loggedInUser, isValidUser } = this.props;
    console.log("isValidUser: " + isValidUser);
    return loggedInUser && isValidUser ? (
      <UserNavigation />
    ) : (
        <View style={styles.container}>
          <View style={styles.content}>
            <View style={{ flex: 1, justifyContent: 'flex-start' }}>
              <Text style={styles.logoText}>Device Manager</Text>
            </View>
            <View style={{ flex: 1, alignItems: 'center', flexDirection: 'column' }}>
              {this.renderSignInButton()}
            </View>
          </View>
        </View>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  clsButtonCls: {
    height: 50,
    width: "100%",
    margin: 30,
    backgroundColor: '#242582',
    alignItems: "center",
    borderRadius: 10
  },
  clsButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    margin: 10
  },
  content: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: "80%",
    height: '52%',
  },
  logoText: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 30,
    margin: 10
  },
  information: {
    color: '#68505F',
    fontSize: 16,
    margin: 10,
    marginTop: 20
  },
});


function mapStateToProps(state) {
  return {
    loggedInUser: state.loggedInUser,
    isValidUser: state.isValidUser
  }
}

const mapDispatchToProps = (dispach) => {
  return {
    toggleUserStatus: (data) => dispach({ type: 'SET_USER_INFO', args: { user: data } }),
    setValidUser: (data) => dispach({ type: 'SET_VALID_USER', args: { valid: data } }),
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(AppLogin);
