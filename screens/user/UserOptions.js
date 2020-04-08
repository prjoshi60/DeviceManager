import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image} from "react-native"; 

class UserOptions extends React.Component{
  constructor(props){
    super(props);

  }
  
  openUserProfileScreen = () => {
    const navigation = this.props.navigation;
    navigation.navigate('UserProfile');
  }

  render(){
    return(
      <View style={styles.container}>
        <Text>Please do scan and get the test device.</Text>
        <View style={styles.content}>
        <TouchableOpacity style={styles.clsButtonCls} onPress={ () => {}}>
          <Text 
            style={styles.clsButtonText}
            text="Get Device"
            color="blue"
          >Test Device
          </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.clsButtonCls} onPress={ this.openUserProfileScreen}>
          <Text 
            style={styles.clsButtonText}
            color="blue">User Profile</Text>
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

export default UserOptions;