import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';
import FBDetail from './src/components/FBdetail'
const FBSDK = require('react-native-fbsdk');
const {
    LoginButton,
    AccessToken
} = FBSDK;

export default class testApp extends Component {



    constructor(props) {
        super(props)
        this.state = {accessToken:null}
    }

    renderLogin() {
        return(

            <LoginButton
                publishPermissions={["publish_actions"]}
                onLoginFinished={
                    (error, result) => {
                        if (error) {
                            alert("login has error: " + result.error);
                        } else if (result.isCancelled) {
                            alert("login is cancelled.");
                        } else {
                            AccessToken.getCurrentAccessToken().then(
                                (data) => {
                                    this.setState({accessToken:data.accessToken})
                                }
                            )
                        }
                    }
                }
                onLogoutFinished={() => this.setState({accessToken:null})}/>

        )
    }

  render() {
    var loggedIn = this.state.accessToken !== null;
    return (
        <View style={(loggedIn) ? styles.hide : styles.content}>
            {this.renderLogin()}
            {(!loggedIn) ? <Text style={{fontSize:20,margin:15}}> Log In </Text>
                                                : <FBDetail accessToken={this.state.accessToken}/>}
        </View>
    );
  }
}

AppRegistry.registerComponent('testApp', () => testApp);

const styles = StyleSheet.create({
    content:{
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
    },
    hide:{
        alignItems:'center',
        flexDirection:'column',
        justifyContent:'center',
        marginTop:20,
        height:'100%',
        width:'100%'
    }
});