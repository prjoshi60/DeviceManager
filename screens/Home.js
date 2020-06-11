import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import AsyncStorage from '@react-native-community/async-storage';
import Navigator from './device/testDeviceNavigation';
import { connect } from 'react-redux';
import AppLogin from './AppLogin';
import Images from '../lib/Images';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.getDeviceUsageType();
  }

  clickRegisterDevice = () => {
    this.props.toggleUserStatus();
  };

  setUserAsTestDevice = async () => {
    try {
      await AsyncStorage.setItem('deviceUsageType', 'test_device');
      this.getDeviceUsageType();
    } catch (error) {
      // Error retrieving data
      console.log(error.message);
    }
  };

  setEndUser = async () => {
    try {
      await AsyncStorage.setItem('deviceUsageType', 'end_user');
      this.getDeviceUsageType();
    } catch (error) {
      // Error retrieving data
      console.log(error.message);
    }
  };

  getDeviceUsageType = async () => {
    try {
      const value = await AsyncStorage.getItem('deviceUsageType');
      if (value !== null) {
        this.props.toggleUserStatus(value);
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  render() {
    return (
      this.props.deviceType ? ((this.props.deviceType == "test_device") ? <Navigator /> : <AppLogin />) :

        <View style={styles.container}>
          <View style={{ flex: 1 }}>
            <Image style={styles.logoimage} source={Images.MindstixLogo}></Image>
            <Text style={styles.logoText}>DEVICE MANAGER</Text>
          </View>
          <View style={{ flex: 2 }}>
            <View style={styles.content}>
              <TouchableOpacity style={styles.clsButtonCls} onPress={this.setEndUser}>
                <Image style={styles.image} source={Images.UserProfileIcon}></Image>
                <View style={styles.textView}>
                  <Text style={styles.clsButtonText}>USER DEVICE</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={styles.clsButtonCls} onPress={this.setUserAsTestDevice}>
                <Image style={styles.image} source={Images.DeviceIcon}></Image>
                <View style={styles.textView}>
                  <Text style={styles.clsButtonText}>TEST DEVICE</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View >

    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'column'
  },
  clsButtonCls: {
    height: 'auto',
    width: "100%",
    margin: 30,
    backgroundColor: '#736187',
    alignItems: "center",
    borderRadius: 10,
    flexDirection: 'row'
  },
  clsButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 24,
  },
  content: {
    alignItems: 'center',
    flexDirection: 'column',
    width: "80%",
    justifyContent: 'center'
  },
  image: {
    margin: 10,
    height: 120,
    width: 120,
    backgroundColor: 'transparent',
    flex: 1
  },
  textView: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    flex: 2
  },
  logoimage: {
    marginTop: 80,
    height: 100,
  },
  logoText: {
    color: 'green',
    fontSize: 22,
    marginTop: 20,
    fontWeight: 'bold'
  }
});


function mapStateToProps(state) {
  return {
    deviceType: state.deviceType
  }
}

const mapDispatchToProps = (dispach) => {
  return {
    toggleUserStatus: (data) => dispach({ type: 'SET_DEVICE_TYPE', args: { deviceType: data } })
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
