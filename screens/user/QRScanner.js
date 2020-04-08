import React from 'react'; 
import { View, Text, TouchableOpacity, StyleSheet, Alert} from "react-native";
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera as Camera } from "react-native-camera";
 

class QRScanner extends React.Component{

  onSuccess = e => {
    Alert.alert(e.data);
  };
  
  render(){
    
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <Text>QR Scanner</Text>

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

export default QRScanner;