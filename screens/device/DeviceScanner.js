import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { connect } from 'react-redux';
import QRCode from 'react-native-qrcode-svg';

class DeviceScanner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deviceId: DeviceInfo.getUniqueId(),
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.information}>Please scan the QR code given below and allocate device to yourself.</Text>

          <View style={styles.qrView}>
            <QRCode value={this.state.deviceId} bgColor='black'
              fgColor='white' size={200} />
          </View>
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
  clsButtonCls: {
    height: 50,
    width: "auto",
    margin: 30,
    backgroundColor: '#242582',
    alignItems: "center",
    borderRadius: 10
  },
  bigBlue: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 13,
    margin: 10,
    marginTop: 20
  },
  content: {
    alignItems: 'center',
    margin: 20
  },
  clsButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    margin: 10
  },
  qrView: {
    marginTop: 40
  },
  information: {
    color: '#68505F',
    fontSize: 16,
    margin: 10
  },
});

function mapStateToProps(state) {
  return {
    deviceType: state.deviceType,
  };
}
const mapDispatchToProps = dispach => {
  return {
    toggleUserStatus: data => dispach({ type: 'C', args: data }),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DeviceScanner);
