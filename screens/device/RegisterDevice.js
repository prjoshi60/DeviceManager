import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

export default class RegisterDevice extends React.Component {
  constructor(props) {
    super(props);
  }

  move = () => {
    const navigation = this.props.navigation;
    navigation.navigate('RegistrationComplete');
  };

  render() {
    return (
      <View>
        <TouchableOpacity onPress={this.move}>
          <Text> Registration of Device! </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
