import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera as Camera } from "react-native-camera";
import { connect } from 'react-redux';
import httpLib from '../../lib/httpServiceLib';
import Images from '../../lib/Images';



class QRScanner extends React.Component {
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
              Scan QR code of device and get the device allocated.
          </Text>
          }
        />
      </View>
    );
  }

  ScanCompleted() {
    return (
      <View style={styles.centerAlign}>
        <Image style={styles.resultImage} source={Images.GreenCheck}></Image>
        <Text style={styles.resultMsgHeader}>Device Allocated</Text>
        <Text style={styles.resultMsg}>Device has been allocated to you successfully.</Text>
      </View>

    );
  }

  async startDeviceAllocation(deviceId) {
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
        this.setState({ scanned: false });
      } else {
        console.log(' Servivce success. ');
        this.setState({ scanned: true });
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        {/* <View style={styles.content}> */}
        {this.state.scanned ? this.ScanCompleted() : this.RenderQRCode()}
        {/* </View> */}
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  content: {
    alignContent: 'center',
    alignItems: 'center',
    width: '80%'
  },
  centerAlign: {
    alignContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  resultMsgHeader: {
    color: '#68505F',
    fontWeight: 'bold',
    fontSize: 24,
    margin: 24,
  },
  resultMsg: {
    color: '#68505F',
    fontWeight: 'bold',
    fontSize: 16,
    margin: 24,
  },
  resultImage: {
    marginTop: 40,
    height: 140,
    width: 140
  },
  profileView: {
    height: 120,
    width: 120,
    borderRadius: 60
  },
  viewRowItem: {
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
    height: 50,
    width: "auto",
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
});

function mapStateToProps(state) {
  return {
    loggedInUser: state.loggedInUser
  }
}

const mapDispatchToProps = (dispach) => {
  return {
    toggleUserStatus: (data) => dispach({ type: 'SET_USER_INFO', args: { user: data } })
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(QRScanner);