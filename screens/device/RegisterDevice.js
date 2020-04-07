import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import DeviceInfo from 'react-native-device-info';
import {connect} from 'react-redux';
import httpLib from '../../lib/httpServiceLib';


  class RegisterDevice extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      deviceId: DeviceInfo.getUniqueId(),
      model: DeviceInfo.getDeviceId(),
      os: DeviceInfo.getSystemName(),
      osVersion: DeviceInfo.getSystemVersion(),
      showScan: null,
    };

    this.storeDataToProps();
  

    DeviceInfo.getDeviceName().then(deviceName => {
      this.setState({dName: deviceName});
    });
  }

  componentDidMount() {
    this.checkDeviceAlreadyRegistered();
  }

  async checkDeviceAlreadyRegistered  () {
    console.log(" >>> checkDeviceAlreadyRegistered >>");
    let params = {
      method: 'get',
      body: [{key: 'id', value: DeviceInfo.getUniqueId()}],
      endPoint: 'GET_DEVICE_INFO',
    };

    let data = await httpLib.makeHttpGetRequest(params);

    console.log(data);

    if (data) {
      this.setState({showScan:true});
    }
  }
  clickRegisterDevice = () => {
    let body = {
      deviceId: this.state.deviceId,
      model: this.state.model,
      os: this.state.os,
      osVersion: this.state.osVersion,
    };
    let params = {
      method: 'post',
      body: body,
      endPoint: 'REGISTER_DEVICE',
    };

    httpLib.makeHttpPostRequest(params, (err, data) => {
      if (err) {
        console.log(' Servivce error ');
        this.setState({showScan: false});
      } else {
        console.log(' Servivce success. ');
        this.setState({showScan: true});
      }
    });
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
        this.setState({deviceId : value});
      }
    } catch (error) {
      // Error retrieving data
    }
  };


  render() {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.bigBlue}>Unique ID:{this.state.deviceId}</Text>
          <Text style={styles.bigBlue}>Model: {this.state.model}</Text>
          <Text style={styles.bigBlue}>Operating System: {this.state.os}</Text>
          <Text style={styles.bigBlue}>OS Version: {this.state.osVersion}</Text>
          <Text style={styles.bigBlue}>Device Name: {this.state.dName}</Text>
        </View>
        {
          this.state.showScan ? 
            <TouchableOpacity style={styles.clsButtonCls}  onPress={this.scanThisDevice}>
              <Text 
                style={styles.clsButtonText}>
                Scan Device
              </Text>
            </TouchableOpacity> : 
          <TouchableOpacity style={styles.clsButtonCls}  onPress={this.clickRegisterDevice}>
          <Text 
            style={styles.clsButtonText}
            color="blue"
          >Register Device
          </Text>
          </TouchableOpacity>
      }
      </View>
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
    viewRowItem:{
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
      height:50,
      width:"auto",
      margin:30,
      backgroundColor:'#242582',
      alignItems:"center",
      borderRadius:10
   },
    clsButtonText:{
      color: 'white',
      fontWeight: 'bold',
      fontSize: 18,
      margin:10
    },
  });

  function mapStateToProps(state) {
    return {
      deviceType: state.deviceType
    };
  }
  
  const mapDispatchToProps = (dispach) => {
    return {
      toggleUserStatus: (data) => dispach({ type : 'C', args : data }),
    };
  };

  export default connect(mapStateToProps, mapDispatchToProps)(RegisterDevice);
