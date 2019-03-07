
import React, { Component } from 'react';
import * as ats from '../constance/Constance';
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
import { NavigationActions } from 'react-navigation';
import {requestMovieListData} from '../data/FetchData';
import {formatTime} from '../components/VideoPlayer';
//RN与原生iOS的交互：
var shareManager = NativeModules.UEManager;

export default class MoviePage extends Component {

constructor(props){
  super(props);
  var ds = new ListView.DataSource({
    rowHasChanged:(r1, r2) => r1 !== r2,
    sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
  })
  this.state={
    dataSource:ds,
    movieLists:{},
    isRefreshing: false,
    loaded: 0,
  }
  this._renderRow = this._renderRow.bind(this);
  this._renderSection = this._renderSection.bind(this);
  this.onRefresh = this.onRefresh.bind(this);
  this.requestData = this.requestData.bind(this);
  this.pushToVideoDetail = this.pushToVideoDetail.bind(this);
  this._onTapCenterPlayButton = this._onTapCenterPlayButton.bind(this);

  }
  componentDidMount() {
    this.onRefresh();
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
    requestMovieListData('290',(movieLists) =>{
      this.setState({movieLists:{'hot':movieLists.attention,'comming':movieLists.moviecomings}});
    });
  }

  pushToVideoDetail(movieId){
    const navigateAction = NavigationActions.navigate({
      routeName: 'MovieDetailPage',
      params: {movieId:movieId},
      action:NavigationActions.navigate({routeName: 'MovieDetailPage'}),
     });
     this.props.navigation.dispatch(navigateAction);
  }
  _onTapCenterPlayButton(movieId){
    this.pushToVideoDetail(movieId);
  }
  _renderRow(rowData,sectionId,rowId){
    var image = rowData.image;
    var movieId = rowData.id;
    if (image.slice(0,1) == '"') {
      image = image.slice(1,-1);
    }
    var centerPic =
              <View style={{height:150}}>
                  {
                      image.length>0?
                      <Image style={{flex:1,margin:5,borderRadius:5}} source={{uri: image}}/>:null
                  }
                  <TouchableWithoutFeedback  onPress={()=>{this._onTapCenterPlayButton(movieId)}}>
                      <View style={{
                        position: 'absolute',
                        width:30,
                        height:30,
                        marginLeft:(375-30)/2.0-10,
                        marginTop:(149-30)/2.0
                        }}>
                          <Image style={{flex:1,resizeMode:'contain'}}
                            source={require('../src/image/icon_video_play.png')}
                          />
                      </View>
                  </TouchableWithoutFeedback>
              </View>;

    return(
      <View style={{backgroundColor:'white',height:image.length>0?180:0}}>
        {centerPic}
        <Text style={{color:'black',fontSize:15,marginLeft:5,marginTop:5,height:20}}>{rowData.title}</Text>
      </View>
    )
  }
  // ,alignItems:'center'
  _renderSection(sectionData,sectionId){
    return(
      <View style={{height:30,backgroundColor:'white'}}>
        <Text style={{color:'#8968CD',fontSize:20,shadowColor:'black',shadowOffset:{h:4,w:4},shadowRadius:2,shadowOpacity:0.8}}>{sectionId=='hot'?'正在热映':'即将上映'}</Text>
      </View>

    );
  }

  render() {

    return (
          <View style={{flex:1,backgroundColor:'white'}}>
              <ListView
                 scrollEventThrottle={16}
                 style={{flex:1}}
                 enableEmptySections={true}
                 dataSource={this.state.dataSource.cloneWithRowsAndSections(this.state.movieLists)}
                 renderRow={(rowData,sectionId,rowId) => this._renderRow(rowData,sectionId,rowId)}
                 // renderSectionHeader={(sectionData,sectionId)=>this._renderSection(sectionData,sectionId)}
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
