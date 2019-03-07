
import React, { Component } from 'react';
import BaiduView from './BaiduView';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  ListView,
  Image,
  Dimensions,
  NativeModules,
  RefreshControl,
} from 'react-native';
import {requestJokeData} from '../data/FetchData';
import TextItem from '../components/TextItem';

//RN与原生iOS的交互：
var shareManager = NativeModules.UEManager;

export default class JokePage extends Component {

constructor(props){
  super(props);
  var ds = new ListView.DataSource({
    rowHasChanged:(r1,r2) => r1 !== r2,
  })
  this.state={
    dataSource:ds,
    jokeLists:[],
    heights:[],
    isRefreshing: false,
    loaded: 0,
  }
  // this._onRefresh = this._onRefresh.bind(this);
  this._renderRow = this._renderRow.bind(this);
  this.requestData = this.requestData.bind(this);
  this._onTapUp = this._onTapUp.bind(this);
  this._onTapDown = this._onTapDown.bind(this);
  this._onTapShare = this._onTapShare.bind(this);
  this._onTapComment = this._onTapComment.bind(this);
  this._onTapUserHeader = this._onTapUserHeader.bind(this);

}
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
    requestJokeData((jokeLists) =>{
      this.setState({jokeLists :jokeLists});
      this.state.jokeLists.map((list,index)=>{
        var text = list.text;
        if (text.slice(0,1) == '"') {
          text = text.slice(1,-1);
        }
        shareManager.getTextHeight(text, (xx) => {
              this.state.heights.push(xx);
            });
      });
    });
}

 componentDidMount() {
   this.onRefresh();
  }

  _onTapUp(index){
      alert('点赞:'+index);
  }
  _onTapDown(index){
      alert('不赞:'+index);
  }
  _onTapShare = (share_url) => {
      shareManager.shareMsg(share_url);
  }
  _onTapComment(index){
    alert('评论:'+index);
  }
  _onTapUserHeader(index){
    alert('用户:'+index);
  }
  _renderRow(rowData,rowId){
    var list = rowData;
    var u = list.u;
    //西安一李白
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
    //同事们聊七夕节，大李也凑了上去。\/n大李：“七夕…开心了。”\/n同事；
    var text = list.text;
    if (text.slice(0,1) == '"') {
      text = text.slice(1,-1);
    }
    // text = `${'同事们聊七夕节，大李也凑了上去。\n大李：“七夕…开心了。”\n同事；'}`;
    //点赞：
    var up = list.up;
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
    //id:
    var jokeId = list.id;
    var textHeight = this.state.heights[rowId]?this.state.heights[rowId]:30;
    var user =
            <View style={{height:59,flexDirection:'row',alignItems:'center',marginLeft:10,marginRight:10}}>
                <TouchableWithoutFeedback  onPress={()=>{this._onTapUserHeader(rowId)}}>
                  <Image style={{marginLeft:5,width:30,height:30,marginTop:0,borderRadius:15}} source={{uri: headerUrl}}/>
                </TouchableWithoutFeedback>
                <View style={{marginLeft:5,flex:1}}>
                    <Text style={{color:'#4A708B',fontSize:13,marginTop:2}}>{name}</Text>
                    <Text style={{color:'#A6A6A6',fontSize:10,marginTop:3}}>{passTime}</Text>
                </View>
            </View>;
    var centerText =
            <Text style={{height:textHeight,fontSize:17,marginLeft:10,width:355}} numberOflines={0}>
                {text}
            </Text>;
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
          <View style={{backgroundColor:'white',height:textHeight+100}}>
            {user}
            {centerText}
            {bottom}
            <View style={{backgroundColor:'#F2F2F2',height:1}}></View>
          </View>
    )
  }
  // <Text style={{color:'red'}}>大切诺基{'\n'}奥迪{'\n'}奔驰汽车</Text>

  render() {
    // ES6之模版字符串
    return (
                <View style={{flex:1,backgroundColor:'white'}}>
                    <ListView
                       style={{flex:1}}
                       enableEmptySections={true}
                       dataSource={this.state.dataSource.cloneWithRows(this.state.jokeLists)}
                       renderRow={(rowData,sectionId,rowId) => this._renderRow(rowData,rowId)}
                       showsVerticalScrollIndicator={false}
                       removeClippedSubviews={false}
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
