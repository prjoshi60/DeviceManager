import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform, Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import DeviceInfo from 'react-native-device-info';
import { connect } from 'react-redux';
import httpLib from '../../lib/httpServiceLib';


class RegisterDevice extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      deviceId: DeviceInfo.getUniqueId(),
      model: DeviceInfo.getDeviceId(),
      os: DeviceInfo.getSystemName(),
      osVersion: DeviceInfo.getSystemVersion(),
      customName: null
    };

    this.storeDataToProps();

    DeviceInfo.getDeviceName().then(deviceName => {
      this.setState({ dName: deviceName });
    });
  }

  clickRegisterDevice = () => {

    let body = {
      deviceId: this.state.deviceId,
      id: this.state.deviceId,
      model: this.state.model,
      os: this.state.os,
      deviceName: this.state.dName,
      osVersion: this.state.osVersion,
      customName: this.state.customName
    };
    let params = {
      method: 'post',
      body: body,
      endPoint: 'REGISTER_DEVICE',
    };

    httpLib.makeHttpPostRequest(params, (err, data) => {
      if (err) {
        console.log(' Servivce error ');
        this.props.updateDeviceRegistrationStatus(false);
      } else {
        this.props.updateDeviceRegistrationStatus(true);
      }
    });
  }

  setAsEndUserDevice = async () => {
    try {
      await AsyncStorage.removeItem('deviceUsageType');
      this.props.toggleUserStatus(null);
    } catch (error) {
      // Error retrieving data
      console.log(error.message);
    }
  }

  scanThisDevice = () => {
    const navigation = this.props.navigation;
    this.retrieveDeviceData();
    navigation.navigate('DeviceScanner');
  };

  storeDataToProps = async () => {
    try {
      await AsyncStorage.setItem('uniqueDeviceId', DeviceInfo.getUniqueId());
    } catch (error) {
      // Error retrieving data
      console.log(error.message);
    }
  };

  retrieveDeviceData = async () => {
    try {
      const value = await AsyncStorage.getItem('uniqueDeviceId');
      if (value !== null) {
        this.setState({ deviceId: value });
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  updateDeviceName = (value) => {
    this.setState({
      customName: value
    });
  }


  render() {
    return (
      <KeyboardAvoidingView
        behavior={Platform.Os === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <View style={styles.marginnContent}>
              <Text style={styles.information}>
                {this.props.deviceRegistered
                  ? 'Device is registered successfully'
                  : 'Please register this device to add it as testing device.'}
              </Text>
            </View>
            <View style={styles.content}>
              <View style={styles.viewRow}>
                <Text style={styles.leftSide}>UNIQUE ID:</Text>
                <Text style={styles.rightSide}>{this.state.deviceId}</Text>
              </View>
              <View style={styles.viewRow}>
                <Text style={styles.leftSide}>MODEL :</Text>
                <Text style={styles.rightSide}>{this.state.model}</Text>
              </View>
              <View style={styles.viewRow}>
                <Text style={styles.leftSide}>OS & VERSION:</Text>
                <Text style={styles.rightSide}>{this.state.os + " (" + this.state.osVersion + ")"}</Text>
              </View>
              <View style={styles.viewRow}>
                <Text style={styles.leftSide}>DEVICE NAME :</Text>
                <Text style={styles.rightSide}>{this.state.dName}</Text>
              </View>

              {this.props.deviceRegistered ? (
                <View style={styles.viewRow}>
                  <Text style={styles.leftSide}>DEVICE NAME :</Text>
                  <Text style={styles.rightSide}>{this.state.customName}</Text>
                </View>
              ) : (
                  <View style={styles.viewRow}>
                    <Text style={styles.leftSide}>DEVICE NAME :</Text>
                    <TextInput
                      style={styles.rightSideText}
                      ref={(c) => (this._customName = c)}
                      value={this.state.customName}
                      onChangeText={this.updateDeviceName}
                    />
                  </View>
                )}
            </View>

            {this.props.deviceRegistered ? (
              <TouchableOpacity style={styles.clsButtonCls} onPress={this.scanThisDevice}>
                <Text
                  style={styles.clsButtonText}>
                  DISPLAY QR
                  </Text>
              </TouchableOpacity>
            ) : (
                <TouchableOpacity
                  style={styles.clsButtonCls}
                  onPress={this.clickRegisterDevice}>
                  <Text style={styles.clsButtonText} color="blue">
                    REGISTER DEVICE
                </Text>
                </TouchableOpacity>
              )}

            <View style={styles.marginnContent}>
              <Text style={styles.information}>Oops, I want to register as a end-user.</Text>
            </View>

            <TouchableOpacity
              style={styles.clsButtonCls}
              onPress={this.setAsEndUserDevice}>
              <Text style={styles.clsButtonText}>USER DEVICE</Text>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
  },
  content: {
    margin: 10,
  },
  viewRowItem: {
    margin: 20,
    flexDirection: 'row',
  },
  bigBlue: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 13,
    margin: 10,
  },
  rightSide: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 13,
    width: '60%',
  },
  clsButtonCls: {
    height: 50,
    width: "auto",
    margin: 30,
    backgroundColor: '#736187',
    alignItems: "center",
    borderRadius: 10
  },
  clsButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    margin: 10
  },
  information: {
    color: '#68505F',
    fontSize: 16,
    margin: 10
  },
  viewRow: {
    flexDirection: 'row',
    height: 'auto',
    margin: 2
  },
  rightSide: {
    color: '#68505F',
    fontWeight: 'bold',
    fontSize: 15,
    margin: 10,
    flex: 3,

  },
  leftSide: {
    color: '#51616A',
    fontWeight: 'bold',
    fontSize: 13,
    margin: 10,
    flex: 2,
    textAlign: 'right'
  },
  rightSideText: {
    color: '#68505F',
    fontWeight: 'bold',
    fontSize: 13,
    margin: 10,
    height: 30,
    flex: 2,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: "#C9C9C9",
    borderStyle: 'solid',
    flex: 3
  },
  marginnContent: {
    margin: 20
  }
});

function mapStateToProps(state) {
  return {
    deviceRegistered: state.deviceRegistered
  };
}

const mapDispatchToProps = (dispach) => {
  return {
    updateDeviceRegistrationStatus: (data) => dispach({ type: 'SET_REGISTRATION_STATUS', args: { deviceRegistered: data } })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterDevice);
