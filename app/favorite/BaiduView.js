import React, { Component } from 'react';
import {
  View,
  WebView,
  DeviceEventEmitter,
} from 'react-native';
import styles from '../styles/Styles'

var lister = null;
export default class BaiduView extends Component {

  constructor(props){
    super(props);
    this.state = {
        url:'',
    };
  }

  componentDidMount(){
    this.lister = DeviceEventEmitter.addListener('URL_LISTEN',(url)=>this.urlListenEvent(url));
  }
  componentWillUnmount(){
    this.lister.remove();
  }

  urlListenEvent(url){
    this.setState({url:url});
  }
// this.state.url
// http://localhost:63342/JSLearning/JS019.html?_ijt=rk7t39p3s6tq2bh1g27ic1ts6h
  render() {

              return(
                <WebView
                  source={{uri:'http://localhost:63342/JSLearning/JS019.html?_ijt=rk7t39p3s6tq2bh1g27ic1ts6h'}}
                  style={{flex:1}}
                />
              );
      }
}
