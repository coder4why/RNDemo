
import React, { Component } from 'react';
import * as ats from '../constance/Constance';
import BaiduView from './BaiduView';
import {formatTime} from '../components/VideoPlayer';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  DeviceEventEmitter,
  FlatList,
  SectionList,
  Image,
  ListView,
  NativeModules,
  RefreshControl,
} from 'react-native';
import PropTypes from 'prop-types';
import {requestVideoData} from '../data/FetchData';
//RN与原生iOS的交互：
var shareManager = NativeModules.UEManager;

export default class WebPage extends Component {

    //分享点击事件：
  static propTypes = {
    onTapPlay: PropTypes.func,
  };

  constructor(props){
    super(props);
    var ds = new ListView.DataSource({
      rowHasChanged:(r1,r2) => r1 !== r2,
    })
    this.state={
      dataSource:ds,
      videoLists:[],
      heights:[],
      isRefreshing: false,
      loaded: 0,
    }
    this._renderRow = this._renderRow.bind(this);
    this.requestData = this.requestData.bind(this);
    this.pushToVideoDetail = this.pushToVideoDetail.bind(this);
    this._onTapUp = this._onTapUp.bind(this);
    this._onTapDown = this._onTapDown.bind(this);
    this._onTapShare = this._onTapShare.bind(this);
    this._onTapComment = this._onTapComment.bind(this);
    this._onTapUserHeader = this._onTapUserHeader.bind(this);
    this._onTapCenterPlayButton = this._onTapCenterPlayButton.bind(this);

  };
  onRefresh() {
      this.setState({isRefreshing: true});
      setTimeout(() => {
            // 准备下拉刷新的5条数据
            this.requestData();
            this.setState({
              loaded: this.state.loaded + 5,
              isRefreshing: false,
            });
          }, 2000);
  };
  requestData(){
      requestVideoData((videoLists) =>{
        this.setState({videoLists :videoLists});
        this.state.videoLists.map((list,index)=>{
          var text = list.text;
          if (text.slice(0,1) == '"') {
            text = text.slice(1,-1);
          }
          shareManager.getTextHeight(text, (xx) => {
                this.state.heights.push(xx);
              });
        });

      });
  };

  pushToVideoDetail(params){
    // const navigateAction = NavigationActions.navigate({
    //   routeName: 'VideoDetail',
    //   params: params,
    //   action:NavigationActions.navigate({routeName: 'VideoDetail'}),
    //  });
    //  this.props.navigation.dispatch(navigateAction);

  };

 componentDidMount() {
   this.onRefresh();
 };

  _onTapUp(index){
      alert('点赞:'+index);
      // this.refs.toast.show('点了一下点赞:'+index);
  };
  _onTapDown(index){
      alert('不赞:'+index);
      // this.refs.toast.show('点了一下不赞:'+index);
  };
  _onTapShare = (share_url) => {
      shareManager.shareMsg(share_url);
  };
  _onTapComment(index){
    alert('评论:'+index);
  };

  _onTapUserHeader(index){
    // this.refs.toast.show('点了一下用户:'+index);
    alert('用户:'+index);
  };
  _onTapCenterPlayButton(params){
    this.props.onTapPlay && this.props.onTapPlay(params);
  };
  _renderRow(rowData,rowId){
    var list = rowData;
    var u = list.u;
    //单纯搞笑视频
    var name = u.name;
    if (name.slice(0,1) == '"') {
      name = name.slice(1,-1);
    }
    //"uid": "22904119",
    var uid = u.uid;
    //headerIcon:
    var header = u.header;
    var headerUrl = header[0];
    if (headerUrl.slice(0,1) == '"') {
      headerUrl = headerUrl.slice(1,-1);
    }
    //审核通过时间：
    var passTime = list.passtime;
    //text：一波操作猛如虎！一看.....哈哈哈哈
    var text = list.text;
    if (text.slice(0,1) == '"') {
      text = text.slice(1,-1);
    }
    //点赞：
    var up = list.up?list.up:"";
    if (up.slice(0,1) == '"') {
      up = up.slice(1,-1);
    }
    //下赞：
    var down = list.down;
    //share_url:
    var share_url = list.share_url;
    if (share_url.slice(0,1) == '"') {
      share_url = share_url.slice(1,-1);
    }
    //视频：
    var video = list.video;
    //播放次数：
    var playfcount = video.playfcount;
    //视频时长：
    var duration = formatTime(video.duration).slice(3);
    //视频宽度：
    var width = video.width;
    //视频高度：
    var height = video.height;
    //视频链接：
    var videoUrls = video.video;
    var videoUrl = videoUrls[0];
    if (videoUrl.slice(0,1) == '"') {
      videoUrl = videoUrl.slice(1,-1);
    }
    //thumbnail链接：
    var thumbnails = video.thumbnail;
    var thumbnail = thumbnails[0];
    if (thumbnail.slice(0,1) == '"') {
      thumbnail = thumbnail.slice(1,-1);
    }
    //id:
    var videoId = list.id;
    var video_width = 355;
    var video_height = height * video_width/(width);

    var params = {
        videoURL:videoUrl,
        height:height * 375/(width)>400?400:height * 375/(width),
        width:375,
        tags:list.tags,
        text:text,
        up:up,
        share_url:share_url,
        passtime:passTime,
        playfcount:playfcount,
        headerUrl:headerUrl,
    };
    var textHeight = this.state.heights[rowId]?this.state.heights[rowId]:30;
    if (video_height>220) {
        video_height = 220;
    }
    var user =
            <View style={{height:60,flexDirection:'row',alignItems:'center',marginLeft:10,marginRight:10,backgroundColor:'white'}}>
                <TouchableWithoutFeedback  onPress={()=>{this._onTapUserHeader(rowId)}}>
                  <Image style={{marginLeft:5,width:30,height:30,marginTop:0,borderRadius:15}} source={{uri: headerUrl}}/>
                </TouchableWithoutFeedback>
                <View style={{marginLeft:5,flex:1}}>
                    <Text style={{color:'#4A708B',fontSize:13,marginTop:2}}>{name}</Text>
                    <Text style={{color:'#A6A6A6',fontSize:10,marginTop:3}}>{passTime}</Text>
                </View>
            </View>;
    var centerPic =
              <View style={{height:video_height}}>
                  <Image style={{flex:1,resizeMode:'cover'}} source={{uri: thumbnail}}/>
                  <TouchableWithoutFeedback  onPress={()=>{this._onTapCenterPlayButton(params)}}>
                      <View style={{
                        position: 'absolute',
                        width:40,
                        height:40,
                        marginLeft:(video_width-40)/2.0,
                        marginTop:(video_height-40)/2.0
                        }}>
                          <Image style={{flex:1,resizeMode:'contain'}}
                            source={require('../src/image/icon_video_play.png')}
                          />
                      </View>
                  </TouchableWithoutFeedback>
                  <View style={{position: 'absolute',height:20,width:video_width,marginTop:video_height-20,flexDirection:'row'}}>
                        <Text style={{marginLeft:5,color:'white',fontSize:13,width:375/2.0}}>{playfcount+'播放'}</Text>
                        <Text style={{color:'white',fontSize:13,textAlign:'right',width:375/2.0-10}}>{duration}</Text>
                  </View>
              </View>;
    var bottom =
              <View style={{height:40,flexDirection:'row',alignItems:'center',marginLeft:10,marginRight:10}}>
                <TouchableWithoutFeedback  onPress={()=>{this._onTapUp(rowId)}}>
                  <View style={{width:50,marginRight:48,flexDirection:'row',alignItems:'center'}}>
                      <Image style={{marginLeft:5,marginRight:2,width:20,height:20,resizeMode:'contain'}}
                        source={require('../images/up.png')}
                      />
                      <Text style={{color:'#A6A6A6',fontSize:12}}>{up}</Text>
                  </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback  onPress={()=>{this._onTapDown(rowId)}}>
                  <View style={{width:50,marginRight:48,flexDirection:'row',alignItems:'center'}}>
                      <Image style={{marginLeft:5,marginRight:2,width:20,height:20,resizeMode:'contain'}}
                        source={require('../images/down.png')}
                      />
                      <Text style={{color:'#A6A6A6',fontSize:12}}>{down}</Text>
                  </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback  onPress={()=>{this._onTapShare(share_url)}}>
                  <View style={{width:50,marginRight:48,flexDirection:'row',alignItems:'center'}}>
                      <Image style={{marginLeft:5,marginRight:2,width:20,height:20,resizeMode:'contain'}}
                        source={require('../images/share.png')}
                      />
                      <Text style={{color:'#A6A6A6',fontSize:12}}>分享</Text>
                  </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback  onPress={()=>{this._onTapComment(rowId)}}>
                  <View style={{width:50,flexDirection:'row',alignItems:'center'}}>
                      <Image style={{marginLeft:5,marginRight:2,width:20,height:20,resizeMode:'contain'}}
                        source={require('../images/comment.png')}
                      />
                      <Text style={{color:'#A6A6A6',fontSize:12}}>评论</Text>
                  </View>
                </TouchableWithoutFeedback>
              </View>;
    return(
          <View style={{backgroundColor:'white',height:video_height+110+textHeight}}>
            {user}
            <Text style={{color:'black',fontSize:17,height:textHeight,marginLeft:10,marginRight:10,marginBottom:10,backgroundColor:'white'}}>{text}</Text>
            {centerPic}
            {bottom}
            <View style={{backgroundColor:'#F2F2F2',height:1}}></View>
          </View>
    )
  }

  _onTapIndex(clickIndex){
      alert(clickIndex);
  }

  render() {
    return (
      <View style={{flex:1}}>
      <ListView
              enableEmptySections={true}
              style={{flex:1}}
              dataSource={this.state.dataSource.cloneWithRows(this.state.videoLists)}
              renderRow={(rowData,sectionId,rowId) => this._renderRow(rowData,rowId)}
              showsVerticalScrollIndicator={false}
              refreshControl={
                           <RefreshControl
                             refreshing={this.state.isRefreshing}
                             onRefresh={this.onRefresh.bind(this)}  //(()=>this.onRefresh)或者通过bind来绑定this引用来调用方法
                             tintColor='red'
                             title= {this.state.isRefreshing? '刷新中....':'下拉刷新'}
                           />
                           }
           />
      </View>

    );
  }

}
