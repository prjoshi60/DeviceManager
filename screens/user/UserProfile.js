import React from 'react'; 
import {connect} from 'react-redux';
import { View, Text, TouchableOpacity, StyleSheet, Image} from "react-native";

class UserProfile extends React.Component {


  

  render(){
    let { loggedInUser} = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <Image
            style={styles.profileView}
            source={{
              uri:loggedInUser.user.photo}}/>
          <View>
          <RenderProfileText
            props={{key: 'Email: ', value: loggedInUser.user.email}}
          />
          <RenderProfileText
            props={{key: 'Name: ', value: loggedInUser.user.givenName + " " +  loggedInUser.user.familyName }}
          />
        </View>
        
        
        </View>
      </View>
    );
  }

}

const RenderProfileText = (props) => {
  console.log(props.props.key);
  return(
  <View style={styles.viewRowItem}>
    <Text style={styles.bigBlue}>{props.props.key}</Text>
    <Text style={styles.bigBlue}>{props.props.value}</Text>
  </View> 
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
  },
  content: {
    margin: 10,
    alignContent:'center', 
    alignItems:'center'
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
export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);