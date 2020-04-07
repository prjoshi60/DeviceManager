import React from 'react'; 
import {connect} from 'react-redux';
import { View, Text, TouchableOpacity, StyleSheet, Image} from "react-native";

class UserProfile extends React.Component {

  render(){
    let { loggedInUser} = this.props;
    return (
      <View style={styles.container}>
        
        <Text style={styles.bigBlue}>User PROFILE..</Text>
        <Image
        style={styles.profileView}
        source={{
          uri:loggedInUser.user.photo}}
      />
        <Text>{loggedInUser.user.email}</Text>
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
  },
  profileView:{
    height:120,
    width:120
  }, 
  viewRowItem:{
    margin: 20,
    flexDirection: 'row',
  },
  bigBlue: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 13,
    margin: 10,
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
export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);