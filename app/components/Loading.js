import {
  View,
  Image
} from 'react-native';
import React, { Component } from 'react';

export default class Loading extends Component{
  render() {
    return (
      <View style={{width: 62.5,height: 30,alignItems:'center',justifyContent:'center'}}>
            <Image
              style={{resizeMode:'cover'}}
              source={require('../images/loading.gif')}
            />
      </View>
    );
  }
}
