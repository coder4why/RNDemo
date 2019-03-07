import {
  Text,
  View,
  TouchableOpacity,
  NativeModules,
} from 'react-native';
import React, { Component } from 'react';
//RN与原生iOS的交互：
var RNManager = NativeModules.UEManager;

const _clickWeb = () => {
};

const _clickHomeDetail = () => {
  RNManager.takePhotos();
};

//工作台路由
export default routeIndex = {
    HomeDetail:{
        screen:require('../homeDetail/NextPage.js').default,
        navigationOptions:({ navigation }) => ({
            title:'首页详情',
            headerTintColor:'white',
            headerStyle: {
                backgroundColor: 'red',
            },
            headerRight:
                <TouchableOpacity onPress={()=>{_clickHomeDetail()}}>
                    <View style={{width:60,height:44,marginRight:0,alignItems:'center'}}>
                      <Text style={{color:'white',textAlign:'center',fontSize:16,marginTop:13}}>拍照</Text>
                    </View>
                </TouchableOpacity>,
        })
    },

    VideoDetail:{
        screen:require('../favorite//VideoDetail.js').default,
        navigationOptions:({ navigation }) => ({
            title:'视频详情',
            headerTintColor:'white',
            headerStyle: {
                backgroundColor: 'red',
            },
        })
    },

    MovieDetailPage:{
        screen:require('../favorite//MovieDetailPage.js').default,
        navigationOptions:({ navigation }) => ({
            title:'电影详情',
            headerTintColor:'white',
            headerStyle: {
                backgroundColor: 'red',
            },
        })
    },
    TestDetail:{
        screen:require('../TestControl/TestDetail.js').default,
        navigationOptions:({ navigation }) => ({
            title:'测试详情',
            headerTintColor:'white',
            headerStyle: {
                backgroundColor: 'red',
            },

        })
    },
    TestRNCamera:{
        screen:require('../TestControl/TestRNCamera.js').default,
        navigationOptions:({ navigation }) => ({
            title:'扫描二维码',
            headerTintColor:'white',
            headerStyle: {
                backgroundColor: 'red',
            },

        })
    },
}
