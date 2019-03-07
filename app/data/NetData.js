
import React, { Component } from 'react';
import {
  Image,
  Text,
  View,
  ScrollView,
  Button,
  NativeModules,
  NativeEventEmitter,
  TouchableWithoutFeedback,
  ListView,
} from 'react-native';
import styles from '../styles/Styles';
import CycleImage from '../favorite/CycleImage';
import {requestJSONData} from './FetchData';
import Loading from '../components/Loading';
import * as actionTypes from '../constance/Constance';

//RN与原生iOS的交互：
var RNManager = NativeModules.UEManager;
//iOS原生与RN交互
// var NativeToRNManager = NativeEventEmitter.NativeToRN;
var nativeBridge = NativeModules.NativeToRN;
const nativeModule = new NativeEventEmitter(nativeBridge);

export default class NetData extends Component
{

  static callBackFunc:null; //回调函数
  static clickPicFunc:null; //回调函数
    constructor(props) {
      super(props);
      var ds = new ListView.DataSource({
        rowHasChanged:(r1,r2) => r1 !== r2,
      })
      this.state = {
        movies:null,
        dataSource:ds,
        };
    }
    render()
    {
        if (!this.state.movies) {
            return this.renderLoadingView();
        }
        return this.renderMovie();
    };
    //请求网络数据：
    requestData(){
        requestJSONData((movies) =>{
          this.setState({movies : movies});
        });
    };

//Native 调用了 React-Native：
    nativeEventCallBack(data){
      if (this.props.callBackFunc != null) {
          this.props.callBackFunc(data.url);
      }
    };

    componentDidMount()
    {
      nativeModule.addListener('showAlertCallback',(data)=>this.nativeEventCallBack(data));  // 增加监听
      this.requestData();
    };

    componentWillUnmount() {
      //删除监听
      this.nativeModule.remove();
    };

    renderLoadingView()
    {
        return (
            <View style={styles.noData}>
              <Loading/>
            </View>
            );
    };
    onPressEvent(){
      if (this.props.clickPicFunc != null) {
          this.props.clickPicFunc();
      }
    };

    onPressLearnMore(rowId){
      nativeBridge.callReactNativeMethod();
    };

    _renderRow(rowData,rowId){
      var cover = rowData.cover;
      var name = rowData.name;
      var description = rowData.description;
      return(
            <View style={styles.containerOne}>
                <TouchableWithoutFeedback onPress = {()=>this.onPressEvent()}>
                  <Image style={styles.imageStyle} source={{uri: cover}}/>
                </TouchableWithoutFeedback>
                 <View style={styles.containerTwo}>
                  <Text style={styles.text}>{name}</Text>
                  <Text style={styles.textDesc} numberOflines={5}>{description}</Text>
                 </View>
               <View style={styles.btnStyle}>
                <Button color= 'white'
                onPress={()=>this.onPressLearnMore(rowId)}
                title="点击"/>
               </View>
           </View>
      )
    };
    renderMovie()
    {
        return (
            <ScrollView style={{flex:1}}>
                <CycleImage/>
                <ListView
                   enableEmptySections={true}
                   removeClippedSubviews={false}
                   style={{flex:1,backgroundColor:'white'}}
                   dataSource={this.state.dataSource.cloneWithRows(this.state.movies)}
                   renderRow={(rowData,sectionId,rowId) => this._renderRow(rowData,rowId)}
                   showsVerticalScrollIndicator={false}
                />
            </ScrollView>
            );
    }

}
