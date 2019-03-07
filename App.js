/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,NativeModules,} from 'react-native';
import Navigator from './app/components/stackNavigator';
import FileOperator from './app/components/FileManager';

var RNManager = NativeModules.UEManager;
type Props = {};
export default class App extends Component<Props> {

  componentDidMount()
  {
    RNManager.hide();
    //RN原生文件的操作：增删写；
    FileOperator.nslogPaths();
    FileOperator.writeFile('/RNFS.txt','我是RNFS写入的一段字符串');
    FileOperator.makeDir('/RNFS');
    FileOperator.writeFile('/RNFS/RNFS.txt','我是RNFS写入的第二段字符串');
    FileOperator.deleteFile('/RNFS');

  }
  render() {
    return (
      <View style={{flex:1,backgroundColor:'white'}}>
        <Navigator/>
      </View>
    );
  }
}
