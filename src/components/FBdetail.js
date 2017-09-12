import React, { Component } from 'react'
import {
    Text,
    View,
    Image,
    StyleSheet,
} from 'react-native'
const FBSDK = require('react-native-fbsdk');
const {
    GraphRequest,
    GraphRequestManager,
} = FBSDK;

export default class FBdetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            details:{
                name:'John Doe',
                first_name:'John',
                picture: {
                    data: {
                        url:'https://www.dumpaday.com/wp-content/uploads/2017/01/random-pictures-74.jpg'
                    }
                }
            },
        }
        this._responseInfoCallback = this._responseInfoCallback.bind(this)
    }

    _responseInfoCallback(error: ?Object, result: ?Object) {
        if (error) {
            alert('Error fetching data: ' + JSON.stringify(error))
        } else {
            if (typeof result.data !== 'undefined')
                this.setState({picture : result});
            else
                this.setState({details: result})
        }
    }

    componentDidMount() {
        this.requestGraphAPI('/me',false);

        //this.requestGraphAPI('/me/picture',true);
    }

    requestGraphAPI(endpoint,pic) {
        const param = {
            parameters: {
                fields:{string: 'friends{id,name},name,first_name,id,middle_name,last_name,picture{url}'},
                access_token: {
                    string: this.props.accessToken.toString() // put your accessToken here
                }
            }
        }
/*

FB.api(
  '/me/picture',
  'GET',
  {"type":"large"},
  function(response) {
      // Insert your code here
  }
);
FB.api(
  '/me',
  'GET',
  {"fields":"id,name"},
  function(response) {
      // Insert your code here
  }
);
 */
        const picParam = {
            parameters: {
                fields: {string : {'type':'large'}},
                access_token: {
                    string: this.props.accessToken.toString() // put your accessToken here
                }
            }
        }

        const infoRequest = new GraphRequest(
            endpoint,
            (pic)?picParam:param,
            this._responseInfoCallback,
        )

        console.log(infoRequest);
        new GraphRequestManager().addRequest(infoRequest).start()
    }

    render() {

        const photo = this.state.details.picture.data.url
        console.log(this.state.details.picture.data.url);
        return (
                <View style={styles.card}>
                    <Image
                        style={{flex:1}}
                        source={{uri:photo}}/>
                    <View style={{margin:20}}>
                        <Text style={styles.name}>{this.state.details.name}, 22</Text>
                        <Text style={styles.description}>{this.state.details.first_name}</Text>
                    </View>
                </View>
        )
    }
}

const styles = StyleSheet.create({
    card: {
        flex: 1,
        backgroundColor: 'white',
        margin: 10,
        overflow:'hidden',
        marginTop: 100,
        marginBottom: 100,
        borderWidth:1,
        borderColor:'lightgrey',
        borderRadius:8
    },
    name: {
        fontSize: 20,
    },
    description: {
        fontSize:15,
        color: 'darkgrey',
    },
});
