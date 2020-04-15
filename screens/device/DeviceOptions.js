import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform, Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import DeviceInfoLib from '../../lib/deviceInfo';
import { connect } from 'react-redux';
import httpLib from '../../lib/httpServiceLib';

class DeviceOptions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      deviceId: DeviceInfoLib.getDeviceUniqueId(),
      deviceName: null,
    }
  }

  componentDidMount() {
    this.getDeviceName();
    this.checkDeviceAlreadyRegistered();
  }

  async getDeviceName() {
    let name = await DeviceInfoLib.getDeviceName();
    this.setState({ deviceName: name });
  }

  async checkDeviceAlreadyRegistered() {
    let params = {
      method: 'get',
      body: [{ key: 'id', value: this.state.deviceId }],
      endPoint: 'GET_DEVICE_INFO',
    };

    let data = await httpLib.makeHttpGetRequest(params);

    if (data) {
      this.setState({
        deviceName: data.data.customName,
        status: data.data.allocationStatus,
      });
      this.props.updateDeviceRegistrationStatus(true);
      this.props.updateDeviceStatus(data.data.allocationStatus);
    } else {
      this.props.updateDeviceRegistrationStatus(false);
      this.props.updateDeviceStatus('NOT REGISTERED');
    }
  }

  clickRegisterDevice = () => {
    const navigation = this.props.navigation;
    navigation.navigate('RegisterDevice');
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
    navigation.navigate('DeviceScanner');
  };

  render() {
    return (
      <>
        <View style={styles.container}>
          <View style={styles.upperSection}>
            <View style={styles.card}>
              <View style={styles.viewRow}>
                <Text style={styles.leftSide}>DEVICE NAME: </Text>
                <Text style={styles.rightSide}>{this.state.deviceName}</Text>
              </View>
              <View style={styles.viewRow}>
                <Text style={styles.leftSide}>STATUS: </Text>
                <Text style={styles.rightSide}>{this.props.deviceStatus}</Text>
              </View>
            </View>
          </View>
          <View style={styles.lowerSection}>
            <View style={styles.content}>
              {this.props.deviceRegistered ? <TouchableOpacity style={styles.clsButtonCls} onPress={this.scanThisDevice}>
                <Text style={styles.clsButtonText}>GET DEVICE</Text>
              </TouchableOpacity> : <TouchableOpacity style={styles.clsButtonCls} onPress={this.clickRegisterDevice}>
                  <Text style={styles.clsButtonText}>REGISTER DEVICE</Text>
                </TouchableOpacity>}
              {
                this.props.deviceRegistered ? <TouchableOpacity style={styles.clsButtonCls}>
                  <Text style={styles.clsButtonText}>DELETE DEVICE</Text>
                </TouchableOpacity> : null}

              {
                this.props.deviceType == 'test_device' ? <TouchableOpacity style={styles.clsButtonCls} onPress={this.setAsEndUserDevice}>
                  <Text style={styles.clsButtonText}>USER DEVICE</Text>
                </TouchableOpacity> : null}
            </View>
          </View>
        </View>
      </>
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
    fontSize: 15,
    margin: 10,
  },
  rightSide: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 15,
    width: '60%',
  },
  clsButtonCls: {
    height: 50,
    width: 'auto',
    margin: 30,
    backgroundColor: '#736187',
    alignItems: 'center',
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
  card: {
    flex: 1,
    backgroundColor: '#4D5C65',
    margin: 0,
    borderRadius: 10,
    padding: 10
  },
  viewRow: {
    flexDirection: 'row',
    height: 'auto',
    margin: 10
  },
  rightSide: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
    flex: 2,
    textAlign: 'left',
    marginLeft: 10
  },
  leftSide: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'right',
    flex: 1
  },
  rightSideText: {
    color: '#68505F',
    fontWeight: 'bold',
    fontSize: 13,
    margin: 10,
    height: 30,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: '#C9C9C9',
    borderStyle: 'solid',
    flex: 3
  },
  marginnContent: {
    margin: 20
  },
  upperSection: {
    margin: 20,
    flex: 1
  },
  lowerSection: {
    margin: 20,
    flex: 4
  },
  cardInnerView: {
    width: 'auto',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    alignItems: 'center'
  }
});

function mapStateToProps(state) {
  return {
    deviceRegistered: state.deviceRegistered,
    deviceType: state.deviceType,
    deviceStatus: state.deviceStatus,
  };
}

const mapDispatchToProps = (dispach) => {
  return {
    updateDeviceRegistrationStatus: (data) => dispach({ type: 'SET_REGISTRATION_STATUS', args: { deviceRegistered: data } }),
    updateDeviceStatus: (data) => dispach({ type: 'SET_DEVICE_STATUS', args: { status: data } }),
    toggleUserStatus: (data) => dispach({ type: 'SET_DEVICE_TYPE', args: { deviceType: data } })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DeviceOptions
);
