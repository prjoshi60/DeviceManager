import React from 'react'; 
import { View, Text, TouchableOpacity, StyleSheet, Alert} from "react-native";
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera as Camera } from "react-native-camera";
import {connect} from 'react-redux';
import httpLib from '../../lib/httpServiceLib';
 

class QRScanner extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      scanned: null,
    };
  }

  onSuccess = e => {
     this.startDeviceAllocation(e.data);
  };


  RenderQRCode() {
    return (
      <View>
      <QRCodeScanner
        onRead={this.onSuccess}
        flashMode={Camera.Constants.FlashMode.torch}
        topContent={
          <Text style={styles.centerText}>
            Go to{' '}
            <Text style={styles.textBold}>wikipedia.org/wiki/QR_code</Text> on
            your computer and scan the QR code.
          </Text>
        }
        
        bottomContent={
          <TouchableOpacity style={styles.buttonTouchable}>
            <Text style={styles.buttonText}>OK. Got it!</Text>
          </TouchableOpacity>
        }
      />
      </View>
    );
  }

  ScanCompleted() {
    return (
      <View>
        <Text>
          Device is successfully allocated to you.
        </Text>
      </View>
    
    );
  }

  async startDeviceAllocation (deviceId) {
    console.log("[QRScanner] >> [startDeviceAllocation] ");

    let user = this.props.loggedInUser.user;

    let body = {
      id: deviceId,
      userEmail: user.email,
      userName: user.name,
      startTime: new Date(),
    };

    let params = {
      method: 'post',
      body: body,
      endPoint: 'ALLOCATE_DEVICE',
    };
    
    await httpLib.makeHttpPostRequest(params, (err, data) => {
      if (err) {
        console.log(' Servivce error ');
        this.setState({scanned: false});
      } else {
        console.log(' Servivce success. ');
        this.setState({scanned: true});
      }
    });
  }
  
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
         { this.state.scanned === true ? this.ScanCompleted()  : this.RenderQRCode() }
        </View>
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
    alignContent: 'center', 
    alignItems: 'center'
  },
  profileView:{
    height:120,
    width:120, 
    borderRadius:60
  }, 
  viewRowItem:{
    margin: 20,
    flexDirection: 'row',
    
  },
  bigBlue: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 13,
    margin: 0,
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
export default connect(mapStateToProps, mapDispatchToProps)(QRScanner);