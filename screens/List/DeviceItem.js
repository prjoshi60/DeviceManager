import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Images from '../../lib/Images';

const DeviceItem = (props) => {
  let item = props.props.item;
  return (
    <View style={styles.view}>
      <View style={styles.imgView}>
        <Image style={styles.image} source={item.os === 'android' ? Images.AndroidDeviceLog : Images.iOSDeviceLog}></Image>
      </View>

      <View style={styles.intView}>
        <Text style={styles.deviceName}>{item.deviceName + '(' + item.osVersion + ')'}</Text>
        <Text style={styles.deviceName}>{item.status}</Text>
        <Text style={styles.deviceName}>{item.status}</Text>
      </View>
    </View >
  );
};

const styles = StyleSheet.create({
  view: {
    height: 80,
    width: '100%',
    borderBottomColor: '#D9D9D9',
    flexDirection: 'row',
    borderBottomColor: 'green',
    borderBottomWidth: 1
  },
  image: {
    height: 35,
    width: 35,
    margin: 10
  },
  imgView: {
    width: 'auto',
    alignContent: 'center',
    justifyContent: 'center',
    borderColor: 'blue',
    borderWidth: 1
  },
  intView: {
    justifyContent: 'flex-start',
    flexDirection: 'column'
  },
  deviceName: {
    marginTop: 10,
    marginLeft: 10,
    fontSize: 15,
    fontWeight: 'bold'
  },
  deviceName: {
    marginTop: 10,
    marginLeft: 10,
    fontSize: 13,
    fontWeight: 'bold'
  },


});

export default DeviceItem;