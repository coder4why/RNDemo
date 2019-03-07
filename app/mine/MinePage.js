import React, { Component } from 'react';
import {
  View,
  Image,
  Text,
  TouchableWithoutFeedback,
  NativeEventEmitter,
  NativeModules,
  DeviceEventEmitter,
  StatusBar,
} from 'react-native';

import AnimatedView from '../components/AnimatedView';
import AlertAction from '../components/AlertAction';
import styles from '../styles/Styles';
import TextLabel from './MapView.js';
import * as ats from '../constance/Constance';

// import {PLATFORM_isIOS} from '../conBaiduViewstance/Constance';

//RN与原生iOS的交互：
var userInfoManager = NativeModules.UEManager;
//iOS原生与RN交互
var userBridge = NativeModules.NativeToRN;
const userModule = new NativeEventEmitter(userBridge);

export default class MinePage extends Component {
    constructor(props) {
      super(props);
      this.state = {
          iconUrl:'http://g.hiphotos.baidu.com/zhidao/pic/item/622762d0f703918f7e794305543d269758eec451.jpg',
          nickName:'',
          isLogin:false,
      }
      this._getQQInfo = this._getQQInfo.bind(this);
      this._logoutAction = this._logoutAction.bind(this);
      this._clickSure = this._clickSure.bind(this);
    }
  _getQQInfo(){
      userInfoManager.getQQInfo();
      userBridge.getQQMessages();
  }
  _getQQInfoCallBack = (data) => {
    this.setState({
      iconUrl:data.iconUrl,
      nickName:data.nickName,
      isLogin:true,
    });
  }
  componentDidMount()
  {
    userModule.addListener('getQQMessage',(data)=>this._getQQInfoCallBack(data));  // 增加监听
  }
  _logoutAction(){
    if (this.state.isLogin) {
        // DeviceEventEmitter.emit('ShowActionSheet');
        this._clickSure();
    }else {
      this._getQQInfo();
    }
  }
  _clickSure(){
    this.setState({
      iconUrl:'https://img5.duitang.com/uploads/item/201505/01/20150501184106_MnGSX.thumb.700_0.jpeg',
      nickName:'',
      isLogin:false,
    })
  }
  componentWillUnmount() {
    //删除监听
    this.nativeModule.remove();
  }
  render() {
          var logText = this.state.isLogin?'退出':'登录';
          return(
            <View style={{flex:1, alignItems: 'center'}}>
                  {/*<StatusBar
                    hidden={false}
                    barStyle={'light-content'}
                    networkActivityIndicatorVisible={true}
                    showHideTransition = {'fade'}
                    backgroundColor= {'blue'}
                    translucent={false}
                   />*/}
                   {
                     ats.PLATFORM_isIOS ?
                     <TextLabel
                         showsUserLocation={true}
                         showCps={true}
                         style={{width:ats.SCREEN_WIDTH,height:300}}
                     />:null
                   }
                  <Image
                   style={{width: 120,height: 120,borderRadius:60,marginTop:10}}
                   source={{url:this.state.iconUrl}}
                 />
                 <Text style={{height: 20,left:0,marginTop:10,textAlign:'center'}}>{this.state.nickName}</Text>
                 <TouchableWithoutFeedback onPress={this._logoutAction}>
                   <View style={{marginTop:10, width:100,height:45,backgroundColor:'#436EEE',borderRadius:5,alignItems:'center',justifyContent:'center'}}>
                       <Text style={{height: 20,left:0,marginTop:5,textAlign:'center',fontSize:17,color:'white'}}>{logText}</Text>
                   </View>
                 </TouchableWithoutFeedback>
                 {/*// <AlertAction onTapSure={this._clickSure}/>*/}


            </View>
          );
      }
}
