import React from "react";
import { View, Text, TouchableOpacity, StyleSheet} from "react-native";
import AsyncStorage from '@react-native-community/async-storage';
import Navigator from './device/testDeviceNavigation';
import {connect} from 'react-redux';


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
      (this.props.deviceType  && this.props.deviceType == "test_device") ? <Navigator /> : 
      
        <View  style={styles.container}> 
        <View style={styles.content}>
          <TouchableOpacity style={styles.clsButtonCls}  onPress={this.setUserAsTestDevice}>
          <Text 
            style={styles.clsButtonText}
            text="Test Device"
            color="blue"
          >Test Device
          </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.clsButtonCls}  onPress={this.setEndUser}>
          <Text 
            style={styles.clsButtonText}
            color="blue">User Device</Text>
          
          </TouchableOpacity>
        </View>
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
        color: 'white',
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
        deviceType:state.deviceType
      }
    }
    
    const mapDispatchToProps = (dispach) => {
      return {
        toggleUserStatus: (data) => dispach({ type : 'SET_DEVICE_TYPE', args :{deviceType: data }})
      }
    };
export default connect(mapStateToProps, mapDispatchToProps)(Home);
