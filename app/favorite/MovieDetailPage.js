
import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  ScrollView,
  ListView,
  WebView,
  Image,
  Dimensions,
  NativeModules,
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import {requestMovieDetailData} from '../data/FetchData';
import VideoPlayer from '../components/VideoPlayer';

//RN与原生iOS的交互：
var shareManager = NativeModules.UEManager;
export default class MovieDetailPage extends Component {

constructor(props){
  super(props);
  var ds = new ListView.DataSource({
    rowHasChanged:(r1,r2) => r1 !== r2,
  });
  this.state={
    dataSource:ds,
    movieData:null,
    storyHeight:0,
    video:'',
    isPlaying:false,
    isTopPlaying:true,
  }
  this.requestData = this.requestData.bind(this);
  this._onTapCenterPlayButton = this._onTapCenterPlayButton.bind(this);
  this._renderRow = this._renderRow.bind(this);
  this._renderGoods = this._renderGoods.bind(this);
  this._renderActor = this._renderActor.bind(this);
  this._scroll = this._scroll.bind(this);
  this._onPressActor = this._onPressActor.bind(this);

}

  requestData(){
    var movieId = this.props.navigation.state.params.movieId;
    // alert(movieId);
    requestMovieDetailData('290',movieId,(movieData) =>{
      this.setState({
        movieData:movieData,
        video:movieData.basic.video.url
      });
      shareManager.getTextHeight(this.state.movieData.basic.story, (xx) => {
          this.setState({storyHeight:xx});
      });
    });
  }

  pushToVideoDetail(params){

  }

 componentDidMount() {
     this.requestData();
  }

  _onTapCenterPlayButton(){
      this.setState({isPlaying:!this.state.isPlaying});
  }

  _renderPart(){

    var basic = this.state.movieData.basic;
    //限特工：终极回归
    var name = basic.name;
    //xXx: The Return of Xander Cage
    var nameEn = basic.nameEn;
    //视频时长：
    var mins = basic.mins;
    //上映时间：
    var releaseDate = basic.releaseDate;
    //上映地区：
    var releaseArea = basic.releaseArea;
    //电影介绍：
    var story = basic.story;
    //电影类型：
    var type = basic.type;
    //视频链接：
    var video = basic.video.url;
    //视频封面：
    var img = basic.video.img;
    //演员表：
    var actors = basic.actors;

    var boxOffice = this.state.movieData.boxOffice;
    //累积票房：
    var totalBoxDes = boxOffice.totalBoxDes;

    //广告：
    var advertisement = this.state.movieData.advertisement.advList[0];
    //广告：
    var advTag = advertisement.advTag;
    //商城手机壳促销+商城马克杯
    var tag = advertisement.tag;
    //广告url：
    var url = advertisement.url;
    //相关产品：
    var goodsList = this.state.movieData.related.goodsList;
    var storyHeight = this.state.storyHeight;
    var header =
              <View style={{height:220,backgroundColor:'#8968CD',flexDirection:'row',marginLeft:5,marginRight:5,marginTop:5}}>
                  <View style={{position: 'absolute',marginTop:30,width:375-135}}>
                        <Text style={{marginLeft:15,color:'white',fontSize:22,flex:1,
                         shadowColor:'black',shadowOffset:{h:5,w:5},shadowOpacity:1}}>{name}</Text>
                        <Text style={{marginLeft:15,marginTop:10,color:'white',fontSize:13,flex:1,
                         shadowColor:'black',shadowOffset:{h:5,w:5},shadowOpacity:1}}>{nameEn}</Text>
                        <Text style={{marginLeft:15,marginTop:10,color:'white',fontSize:15,flex:1,
                         shadowColor:'black',shadowOffset:{h:5,w:5},shadowOpacity:1}}>{type}</Text>
                        <Text style={{marginLeft:15,marginTop:10,color:'white',fontSize:15,flex:1,
                         shadowColor:'black',shadowOffset:{h:5,w:5},shadowOpacity:1}}>{mins}</Text>
                        <Text style={{marginLeft:15,marginTop:10,color:'white',fontSize:15,flex:1,
                         shadowColor:'black',shadowOffset:{h:5,w:5},shadowOpacity:1}}>{releaseDate+" 在"+releaseArea+"上映"}</Text>
                  </View>
                  {
                    img.length>0?
                    <View style={{flex:1,position: 'absolute',marginTop:20,marginLeft:240,width:120,height:180,
                          shadowColor:'black',shadowOffset:{h:10,w:10},shadowRadius:3,shadowOpacity:0.8}}>
                         <Image style={{
                                       flex:1,borderRadius:3,}}
                                     source={{uri: img}}/>
                    </View>:null
                  }

              </View>;

    var center =
              <View style={{flex:1,backgroundColor:'white',alignItems:'center'}}>
                <Text numberOflines={6} style={{color:'#555555',margin:15,height:storyHeight+10,fontSize:14.0,lineHeight:25,flexShrink: 1}}>{story}</Text>
              </View>;

    var actors =
          <View style={{flex:1,backgroundColor:'white',marginLeft:5,marginRight:5}}>
              <View style={{height:30,backgroundColor:'white'}}>
                <Text style={{marginLeft:15, color:'black',fontSize:20.0,shadowColor:'black',shadowOffset:{h:10,w:10},shadowRadius:3,shadowOpacity:0.8}}>演员表</Text>
              </View>
                <ListView
                   scrollEventThrottle={16}
                   style={{flex:1}}
                   enableEmptySections={true}
                   dataSource={this.state.dataSource.cloneWithRows(actors)}
                   renderRow={(rowData,sectionId,rowId) => this._renderActor(rowData,rowId)}
                   showsVerticalScrollIndicator={false}
                   removeClippedSubviews={false}
                   horizontal = {true}
                   showsHorizontalScrollIndicator = {false}
                   onScroll = {(event) => {
                       this._scroll(event);
                  }}
                   />
          </View>;

      var ranking = boxOffice.ranking;
      var todayBoxDes = boxOffice.todayBoxDes;
      var todayBoxDesUnit = boxOffice.todayBoxDesUnit;
      var totalBoxDes = boxOffice.totalBoxDes;
      var totalBoxUnit = boxOffice.totalBoxUnit;
      var boxOffices =
              <View style={{flex:1,marginLeft:5,marginRight:5,marginTop:15,marginBottom:15,flexDirection:'row'}}>
                  <View style={{flex:1}}>
                    <Text style={{fontSize:20,color:'#8968CD',textAlign:'center',shadowColor:'black',shadowOffset:{h:4,w:4},shadowRadius:2,shadowOpacity:0.8}}>{ranking}</Text>
                    <Text style={{fontSize:13,color:'black',margin:10,textAlign:'center',shadowColor:'black',shadowOffset:{h:4,w:4},shadowRadius:2,shadowOpacity:0.8}}>票房排名</Text>
                  </View>
                  <View style={{flex:1}}>
                    <Text style={{fontSize:20,color:'#8968CD',textAlign:'center',shadowColor:'black',shadowOffset:{h:4,w:4},shadowRadius:2,shadowOpacity:0.8}}>{todayBoxDes}</Text>
                    <Text style={{fontSize:13,color:'black',margin:10,textAlign:'center',shadowColor:'black',shadowOffset:{h:4,w:4},shadowRadius:2,shadowOpacity:0.8}}>{todayBoxDesUnit}</Text>
                  </View>
                  <View style={{flex:1}}>
                      <Text style={{fontSize:20,color:'#8968CD',textAlign:'center',shadowColor:'black',shadowOffset:{h:4,w:4},shadowRadius:2,shadowOpacity:0.8}}>{totalBoxDes}</Text>
                      <Text style={{fontSize:13,color:'black',margin:10,textAlign:'center',shadowColor:'black',shadowOffset:{h:4,w:4},shadowRadius:2,shadowOpacity:0.8}}>{totalBoxUnit}</Text>
                  </View>
              </View>;

      var relatedGoods =
              <View style={{flex:1,backgroundColor:'white',marginLeft:5,marginRight:5}}>
                  {
                      goodsList.length>0?
                      <View style={{height:30,backgroundColor:'white'}}>
                        <Text style={{marginLeft:15, marginTop:10,color:'black',fontSize:20.0,shadowColor:'black',shadowOffset:{h:10,w:10},shadowRadius:3,shadowOpacity:0.8}}>电影周边</Text>
                      </View>:null
                  }
                  {
                    goodsList.length>0?
                    <ListView
                       scrollEventThrottle={16}
                       style={{flex:1}}
                       enableEmptySections={true}
                       dataSource={this.state.dataSource.cloneWithRows(goodsList)}
                       renderRow={(rowData,rowId) => this._renderGoods(rowData,rowId)}
                       showsVerticalScrollIndicator={false}
                       removeClippedSubviews={false}
                       horizontal = {true}
                       showsHorizontalScrollIndicator = {false}
                       />:null
                  }

              </View>;

    return(
      <View style={{backgroundColor:'white',flex:1}}>
        {
          this.state.video.length>0?
          <VideoPlayer
            marginLeft={5}
            marginTop={5}
            isAbsolute={false}
            autoPlay={true}
            onPlayEnd={()=>{this.setState({isTopPlaying:!this.state.isTopPlaying})}}
            videoURL={this.state.video}
            videoHeight={220}
            videoWidth={365}
          />:null
        }
        {header}
        {center}
        <WebView
               source={{uri:url}}
               scrollEnabled={false}
               style={{height:95,marginLeft:5,marginRight:5,marginBottom:15}}
           />
        {actors}
        <View style={{flex:1,height:10,backgroundColor:'#F8F8FF'}}></View>
        {boxOffices}
        <View style={{flex:1,height:10,backgroundColor:'#F8F8FF'}}></View>
        {relatedGoods}
      </View>
    )

  }
  _renderActor(rowData,rowId){
    var cover = rowData.img;
    var name = rowData.name;
    var nameEn = rowData.nameEn;
    var roleName = rowData.roleName;
    var roleImg = rowData.roleImg;
    if (cover.slice(0,1) == '"') {
      cover = cover.slice(1,-1);
    }
    if (roleImg.slice(0,1) == '"') {
      roleImg = roleImg.slice(1,-1);
    }
    return(
            <TouchableWithoutFeedback key={rowId} onPress = {()=>this._onPressActor(rowId)}>
                <View style={{width:(375-30)/3.0,height:260,backgroundColor:'white'}}>
                  <Image style={{height:180}} source={{uri: cover.length>0?cover:roleImg}}/>
                  <Text style={{margin:4,fontSize:15,color:'black',height:70,textAlign:'center',flexShrink: 1}}>{name+'\n'+nameEn}</Text>
                </View>
            </TouchableWithoutFeedback>
    );
  }
  _renderGoods(rowData,rowId){
    var image = rowData.image;
    var longName = rowData.longName;

    if (image.slice(0,1) == '"') {
      image = image.slice(1,-1);
    }
    if (longName.slice(0,1) == '"') {
      longName = longName.slice(1,-1);
    }
    return(
        <View style={{width:(375-10)/3.0,height:260,backgroundColor:'white'}}>
          <Image style={{height:180}} source={{uri: image}}/>
          <Text style={{margin:4,fontSize:15,color:'black',height:70,textAlign:'center',flexShrink: 1}}>{longName}</Text>
        </View>
    );
  }
  _onPressActor(rowId){

  }
  _renderRow(rowData,rowId){

  }
  _scroll(event){
      if (event.nativeEvent.contentOffset.y>220) {
            this.setState({
              isPlaying:true,
              isTopPlaying:false,
            });
      }else{
        this.setState({
          isPlaying:false,
          isTopPlaying:true,
        });
      }
  }
  // event.nativeEvent.contentOffset.x
  render() {

    return (
      <View style={{flex:1,backgroundColor:'white'}}>
          <ScrollView style={{flex:1}}
            automaticallyAdjustContentInsets={false}
            onScroll={(event)=>this._scroll(event)}
          >
            {
              this.state.movieData !=null?
              this._renderPart():null
            }
          </ScrollView>
          {
            this.state.video.length>0 && this.state.isPlaying?
            <VideoPlayer
              marginLeft={190}
              marginTop={Dimensions.get('window').height-88-160}
              isAbsolute={true}
              onPlayEnd={()=>{this.setState({isPlaying:!this.state.isPlaying})}}
              autoPlay={true}
              videoURL={this.state.video}
              videoHeight={150}
              videoWidth={180}
            />:null
          }

      </View>
    );
  }

}
