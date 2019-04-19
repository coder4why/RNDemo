import React, { Component } from 'react';
import {
  ScrollView,
  View,
  Image,
  Text,
  TouchableWithoutFeedback,
  CameraRoll,
  ActionSheetIOS,
  AlertIOS,
  VibrationIOS,
  NetInfo,
  TextInput,
  AsyncStorage,
  AppState,
  StatusBar,
  DatePickerIOS,
  Switch,
  NativeModules,
  Animated,
} from 'react-native';
import { NavigationActions } from 'react-navigation';
var Geolocation =require('Geolocation');
import {SCREEN_HEIGHT,SCREEN_WIDTH} from '../constance/Constance';
import SQLiteManager from '../components/SQLiteManager';
import FileOperator from '../components/FileManager';

//RN与原生iOS的交互：
var shareManager = NativeModules.UEManager;
export default class TestPage extends Component {

    constructor(props) {
      super(props);
      this.state = {
          photos:[],
          placeholder:'  我是一个输入框！',
          isPickering:false,
          value:false,
          onScaning:false,
          camera:null,
          moveAnim: new Animated.Value(0),
      }
      this._alertAction = this._alertAction.bind(this);
      this._actionSheetAction = this._actionSheetAction.bind(this);
      this._showShareActionSheet = this._showShareActionSheet.bind(this);
      this._postAction = this._postAction.bind(this);
      this._vibrationAction = this._vibrationAction.bind(this);
      this._cameraRollAction = this._cameraRollAction.bind(this);
      this._getLocation = this._getLocation.bind(this);
      this._getNetStates = this._getNetStates.bind(this);
      this._asyncStorage = this._asyncStorage.bind(this);
      this._appState = this._appState.bind(this);
      this._startTimeout = this._startTimeout.bind(this);
      this._pickerSelect = this._pickerSelect.bind(this);
      this._switch = this._switch.bind(this);
      this._loadWebView = this._loadWebView.bind(this);
      this._scanCode = this._scanCode.bind(this);

    }
  _alertAction(){
    //界面弹窗：
    AlertIOS.prompt('提示','输入提示框',[
               {
                   text: '取消',
                   onPress: function(){
                       // alert('取消')
                   }
               },
               {
                   text: '确定',
                   onPress:function(e) {
                       // alert(e);
                   }
               }
           ]);
  }
  _actionSheetAction(){
    //底部弹窗：
    ActionSheetIOS.showActionSheetWithOptions({
               options: [
                   '拨打电话',
                   '发送邮件',
                   '发送短信',
                   '取消'
               ],
               cancelButtonIndex : 3,
               destructiveButtonIndex: 0
           },function(index){
               if (index == 0) {
                   // alert('拨打电话')
               } else if (index == 1){
                   // alert('发送邮件')
               } else if (index == 2) {
                   // alert('发送短信')
               } else if ('3') {
                   // alert('取消')
               }
           });
  }
  //访问
  _showShareActionSheet(){
    //底部弹出分享视图：
    ActionSheetIOS.showShareActionSheetWithOptions({
               url: 'https://www.baidu.com'
           },function(err){
               // alert(err)
           },function(e){
               // alert(e)
           });
  }
  /*
  VibrationIOS.vibrate()
  在 iOS 设备上，调用这个函数会触发一个一秒钟的震动。震动触发是异步的，也就是说这个函数会立即返回而非等待震动结束。
  在不支持震动的设备上（如 iOS 模拟器），调用此方法没有任何效果。
  震动模式设置现在还不支持。
  */
  _vibrationAction(){
      VibrationIOS.vibrate();
  }
  //获取相册照片
  _cameraRollAction(){
    var _that = this;
    var fetchParams = {
                         first: 6,
                         groupTypes: 'All',
                         assetType: 'Photos'
                       };

    var promise = CameraRoll.getPhotos(fetchParams)
    promise.then(function(data){
            var edges = data.edges;
            var photos = [];
            for (var i in edges) {
                photos.push(edges[i].node.image.uri);
            }
            _that.setState({photos:photos});

    },function(err){
        alert('获取照片失败！');
    });
  }
  //POST请求：
  _postAction(){

    fetch("https://cxopcdsitcdn.8686c.com/umps/jylp/innerService", {
            method: "POST",
            mode: "cors",
            headers: {
             "Content-Type": "application/x-www-form-urlencoded"
            },
            body: {
                "requestBodyJson": {
                    "messageId": "1525257257285",                   //时间戳ID
                    "clientOperateDate": "329429y39539",          //当前操作时间
                    "surveyUnitCode": "3010100",                    //查勘员分公司代码
                    "surveyorCode": "3181",                         //查勘员工号
                    "surLatitude": "30.21",                     //当前维度
                    "surLongitude": "121.02",                     //当前经度
                    },
                "transCode":"U0020054",                             //接口号
                "appId":"002001",                                   //后台需要ID
                "appKey":"e9a319c6816138874260425df4c669",           //后台需要KEY
              },
    }).then(function (res) {

        alert(res+'xxxx');

    }).catch(function (e) {
          alert(e);
       });
  }
  //获取位置信息：
  _getLocation(){

        shareManager.getLocationCallback(

            address =>{
              alert(address);
            }
        );


  }

  _getNetStates(){
    NetInfo.getConnectionInfo().done((connectionInfo) => {

        var rex = 'Initial, type: ' + connectionInfo.type + ', effectiveType: ' + connectionInfo.effectiveType;
        alert(rex);

    });
  }
  _asyncStorage(){

      AsyncStorage.setItem("2018",'我要发');
      AsyncStorage.getItem('2018',(error,result)=>{
        alert(result);
      });
  }
  _appState(){
     alert("当前状态：" + AppState.currentState);
  }

  // 启动一个定时器
  _startTimeout(){
    var _that = this;
    alert('2s后看输入框');
    //setTimeout、setInterval、setImmediate:
    //setTimeout执行一个定时任务，只执行一次，不循环；
    //setInterval执行一个循环任务；
    //setImmediate立即执行一个任务，只执行一次，不循环；
     setInterval(function(){
       var placeholder = _that.state.placeholder=="  我是一个输入框！"?"  你说我是不是一个输入框！":"  我是一个输入框！";
      _that.setState({placeholder:placeholder});
    },2000);
  }

  _pickerSelect(){
    this.setState({isPickering:true});
  }

  _switch(){
      shareManager.searchNearbyPoiCallback((pois)=>{

        var msg = '';
        pois.map((poi,index)=>{
          msg += poi.name+'\n';
          // console.log(poi.name+'\n'+poi.distance+'\n'+poi.address);
        });
        alert(msg);
      });
      this.setState({value: !this.state.value});
  }
  _scanCode(){
    const navigateAction = NavigationActions.navigate({
      routeName: 'TestRNCamera',
      // params: params,
      action:NavigationActions.navigate({routeName: 'TestRNCamera'}),
     });
     this.props.navigation.dispatch(navigateAction);
  }
  _loadWebView(){
    const navigateAction = NavigationActions.navigate({
      routeName: 'TestDetail',
      params: {url:'https://www.jianshu.com/'},
      key:'TestDetail',
      action:NavigationActions.navigate({routeName: 'TestDetail'}),
     });
     this.props.navigation.dispatch(navigateAction);
  }

  render() {
          var placeholder = this.state.placeholder;
          var photos = this.state.photos || [];
          var actions = [this._loadWebView,this._scanCode,this._alertAction,this._actionSheetAction,this._showShareActionSheet,
                         this._vibrationAction,this._cameraRollAction,this._postAction,
                         this._getLocation,this._getNetStates,this._asyncStorage,
                         this._appState,this._startTimeout,this._pickerSelect,
                         SQLiteManager.createTable,SQLiteManager.insertMsgs,SQLiteManager.updateMsgs,
                         SQLiteManager.selectMsgs,SQLiteManager.delectMsgs,SQLiteManager.deleteTable,
                       ];
          var contents = [
                          '加载网页-进度条','RNCamera扫描',
                          'AlertIOS','ActionSheetIOS','ShareActionSheet',
                          'VibrationIOS一秒震动','CameraRoll-读取相册图片','fetch-POST请求',
                          'GeoLocation-获取位置','NetInfo-获取网络状态',"AsyncStorage-数据存储",
                          'AppState-应用状态','setTimeout-定时器','DatePickerIOS-选择器',
                          'SQLite建表','SQLite插入','SQLite修改',
                          'SQLite查询','SQLite删除','SQLite删除表'
                        ];
          return(
          <View style={{flex:1}}>
          {
              <ScrollView style={{flex:1}}>
                   <StatusBar
                     backgroundColor="#333333"
                     barStyle="light-content"
                   />
                   <View style={{height: 40,margin:10,marginBottom:0,flexDirection:'row',alignItems:'center'}}>
                       <TextInput
                           style = {{color:'#436EEE',fontSize:20,width:375-75,height:40, borderColor: '#436EEE', borderWidth: 1,borderRadius:5,backgroundColor:'white'}}
                           placeholder = {placeholder}
                       />
                       <Switch
                           style={{marginLeft:10,width:50}}
                             //动态改变value
                           value={this.state.value}
                            //当切换开关室回调此方法
                           onValueChange={(value)=>{this._switch()}}
                        />
                   </View>
                    <View style={{flex:1,alignItems:'center'}}>
                       {
                         contents.map((item,index)=>{
                           return(
                             <TouchableWithoutFeedback key={index} onPress={actions[index]}>
                                 <View style={{marginTop:10,width:355,height:45,backgroundColor:'grey',borderRadius:5,alignItems:'center',justifyContent:'center'}}>
                                     <Text style={{height: 20,textAlign:'center',fontSize:17,color:'white'}}>{item}</Text>
                                 </View>
                             </TouchableWithoutFeedback>
                           )
                       })
                     }
                   </View>
                   {
                     photos.length>0?
                     <View style={{flex:1,alignItems:'center'}}>
                         {
                           photos.map((item,index)=>{
                             return(
                               <Image key={index} style={{height:100,width:355,marginTop:10,backgroundColor:'red',borderRadius:10}} source={{uri: item}}/>
                             )
                         })
                       }
                     </View>:null
                   }
               </ScrollView>
          }
            {
              this.state.isPickering?
              <DatePickerIOS
              style={{position:'absolute',width:375,backgroundColor:'#E8E8E8',height:240,marginTop:SCREEN_HEIGHT-88-83-240}}
              date={new Date()}
              mode='date'
              minuteInterval={5}
              // timeZoneOffsetInMinutes={8*60}
              onDateChange={(date)=>this.setState({isPickering:false})}
              />:null
            }
          </View>
          );
      }
}
