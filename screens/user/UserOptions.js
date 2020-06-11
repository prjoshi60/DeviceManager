import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';
import Images from '../../lib/Images';

class UserOptions extends React.Component {
  constructor(props) {
    super(props);

  }

  openQRScannerScreen = () => {
    const navigation = this.props.navigation;
    navigation.navigate('QRScanner');
  }

  openUserProfileScreen = () => {
    const navigation = this.props.navigation;
    navigation.navigate('UserProfile');
  }

  removeDeviceUsageType = async () => {
    try {
      await AsyncStorage.removeItem('deviceUsageType');
      this.props.toggleUserStatus(null);
    } catch (error) {
      // Error retrieving data
      console.log(error.message);
    }
  }

  openDeviceListScreen = () => {
    const navigation = this.props.navigation;
    navigation.navigate('DevicesList');
  }


  render() {
    let user = this.props.loggedInUser.user;
    return (
      <View style={styles.container}>
        <View style={styles.upperSection}>
          <View style={styles.card}>
            <View style={styles.viewRow}>
              <Text style={styles.cardText} >Welcome  {user.name} </Text>
            </View>
            <View style={styles.viewRow}>
              <Text style={styles.leftSide}>STATUS: </Text>
              <Text style={styles.rightSide}>Dummy</Text>
            </View>
          </View>
        </View>
        <View style={styles.lowerSection}>
          <View style={styles.tilesContainerRow}>
            <View style={styles.tileView}>
              <TouchableOpacity style={styles.tileButtonView} onPress={this.openQRScannerScreen}>
                <Image style={styles.imagebtn} source={Images.QrScanBtn} />
                <Text style={styles.clsButtonText}>QR SCAN</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.tileView}>
              <TouchableOpacity style={styles.tileButtonView}>
                <Image style={styles.imagebtn} source={Images.DeleteCross} />
                <Text style={styles.clsButtonText}>SUBMIT DEVICES</Text>
              </TouchableOpacity>
            </View>


          </View>
          <View style={styles.tilesContainerRow}>
            <View style={styles.tileView}>
              <TouchableOpacity style={styles.tileButtonView} onPress={this.openDeviceListScreen}>
                <Image style={styles.imagebtn} source={Images.ListBtn} />
                <Text style={styles.clsButtonText}>DEVICES</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.tileView}>
              <TouchableOpacity style={styles.tileButtonView} onPress={this.removeDeviceUsageType}>
                <Image style={styles.imagebtn} source={Images.ChangeBtn} />
                <Text style={styles.clsButtonText}>TEST DEVICE</Text>
              </TouchableOpacity>
            </View>


          </View>
          {/* <TouchableOpacity style={styles.clsButtonCls}>
              <Text style={styles.clsButtonText}>Get Device</Text>
            </TouchableOpacity> */}


          {/* <TouchableOpacity style={styles.clsButtonCls}>
              <Text style={styles.clsButtonText}>User Profile</Text>
            </TouchableOpacity> */}
        </View>

        {/* <TouchableOpacity style={styles.clsButtonCls}>
            <Text style={styles.clsButtonText}>Find Device</Text>
          </TouchableOpacity> */}
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1
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
    marginTop: 20
  },
  tilesContainerRow: {
    height: 200,
    flexDirection: 'row',
  },
  tileView: {
    flex: 1,
  },
  tileButtonView: {
    flex: 1,

    borderRadius: 10,
    margin: 8,
    backgroundColor: "#6E8490",
    justifyContent: "flex-start",
    alignItems: 'center'
  },
  content: {
    alignItems: 'center',
    flexDirection: 'column',
    width: "90%"
  },
  upperSection: {
    margin: 10,
    flex: 1
  },
  lowerSection: {
    margin: 10,
    flex: 4
  },
  card: {
    flex: 1,
    backgroundColor: '#4D5C65',
    margin: 10,
    borderRadius: 10,
    padding: 10
  },
  imagebtn: {
    width: 100,
    height: 100,
    marginTop: 20
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
  cardText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'left',
    marginLeft: 10
  },
  cardButtonImage: {
    height: 160,
    width: 160
  },
  leftSide: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'right',
    flex: 1
  },
});

function mapStateToProps(state) {
  return {
    loggedInUser: state.loggedInUser
  }
}

const mapDispatchToProps = (dispach) => {
  return {
    toggleUserStatus: (data) => dispach({ type: 'SET_USER_INFO', args: { user: data } }),
    toggleUserStatus: (data) => dispach({ type: 'SET_DEVICE_TYPE', args: { deviceType: data } })
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(UserOptions);