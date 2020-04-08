import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert} from "react-native";
import AsyncStorage from '@react-native-community/async-storage';
import {connect} from 'react-redux';
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

    // this.state = {
    //   userInfo: null,
    //   error: null,
    // };
  }

  async componentDidMount() {
    await this._getCurrentUser();
  }

  async _getCurrentUser() {
    try {
      const userInfo = await GoogleSignin.signInSilently();
      //this.setState({ userInfo:userInfo, error: null });
      this.props.toggleUserStatus(userInfo);
    } catch (error) {
      const errorMessage =
        error.code === statusCodes.SIGN_IN_REQUIRED ? 'Please sign in :)' : error.message;
      
      this.setState({
        error: new Error(errorMessage),
      });
    }
  }

  renderSignInButton() {
    return (
      <View style={styles.container}>
        <GoogleSigninButton
          size={GoogleSigninButton.Size.Standard}
          color={GoogleSigninButton.Color.Auto}
          onPress={this._signIn}
        />
      </View>
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

    const {loggedInUser} = this.props;
    return loggedInUser ? <UserNavigation /> : (
      <View style={[styles.container, styles.pageContainer]}>
        {this.renderSignInButton()}
       </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
  backgroundColor:'#fff',  
  flex:1, 
  alignItems:'center',
  justifyContent:'center'
  },
      clsButtonCls: {
        height:50,
        width:"100%",
        margin:30,
        backgroundColor:'#242582',
        alignItems:"center",
        borderRadius:10
     },
      clsButtonText:{
        color: 'black',
        fontWeight: 'bold',
        fontSize: 18,
        margin:10
      },
      content:{
        alignItems:'center',
        flexDirection:'column', 
        width:"80%"
      }
    });


function mapStateToProps(state) 
    {
      return {
        loggedInUser:state.loggedInUser
      }
    }
    
    const mapDispatchToProps = (dispach) => {
      return {
        toggleUserStatus: (data) => dispach({ type : 'SET_USER_INFO', args :{user: data }})
      }
    };
export default connect(mapStateToProps, mapDispatchToProps)(AppLogin);
