import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import DeviceItem from './DeviceItem';

class DevicesList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [{
        deviceName: 'iPhone',
        os: "iOS",
        osVersion: '12.1',
        status: 'free',
        user: null

      }, {
        deviceName: 'iPhone',
        os: "iOS",
        osVersion: '12.1',
        status: 'free',
        user: null

      }, {
        deviceName: 'iPhone',
        os: "android",
        osVersion: '12.1',
        status: 'free',
        user: null
      }
      ]
    }
  };

  renderItem = (item) => {
    console.log(item);
    return <DeviceItem
      props={item}
    />
  }



  render() {
    return (
      <View style={styles.container}>
        <FlatList

          data={this.state.data}
          renderItem={this.renderItem}>

        </FlatList>

      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1
  },
});

export default DevicesList;
