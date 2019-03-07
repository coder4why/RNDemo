
import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';
import {
  View,
  Image,
  Text,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import VideoPlayer from '../components/VideoPlayer';
export default class VideoDetailPage extends Component {

  constructor(props){
    super(props);
    this.state={
      videoUrl:'',
      height:0,
      width:0,
      tags:[],
      text:'',
      up:0,
      share_url:'',
      passtime:'',
      playfcount:0,
      headerUrl:'',
    }
  };
  componentDidMount(){
    this.setState({
        videoUrl:this.props.navigation.state.params.videoURL,
        height:this.props.navigation.state.params.height,
        width:this.props.navigation.state.params.width,
        tags:this.props.navigation.state.params.tags,
        text:this.props.navigation.state.params.text,
        up:this.props.navigation.state.params.up,
        share_url:this.props.navigation.state.params.share_url,
        passtime:this.props.navigation.state.params.passtime,
        playfcount:this.props.navigation.state.params.playfcount,
        headerUrl:this.props.navigation.state.params.headerUrl,
    });

  };
  _onTapWXShare(){

  };
  _onTapQQShare(){

  };
  _onTapUserHeader(item){
      alert('点击');
  };

  _titleMsg(){
    return (
      <View style={{height:80,backgroundColor:'white',justifyContent:'center'}}>
          <Text style = {{height:34,fontSize:15,color:'black',marginLeft:10,flexShrink: 1}} numberOflines={0}>{this.state.text}</Text>
          <Text style={{color:'#A6A6A6',fontSize:13,marginLeft:10,flexShrink: 1}}>{this.state.playfcount+'播放 '+this.state.up+'赞 '+this.state.passtime}</Text>
      </View>
    );
  };

  render() {
    return (
          <ScrollView style={{flex:1}}>
          {
            this.state.videoUrl != '' ?
            <VideoPlayer
              autoPlay={true}
              videoURL={this.state.videoUrl}
              videoHeight={this.state.height}
              onTapWXShare={() => this._onTapWXShare()}
              onTapQQShare={() => this._onTapQQShare()}
            />:null
          }
          {this._titleMsg()}
          <View style={{height:10}}></View>
          {
            this.state.tags.map((item,index)=>{
                var image_list = item.image_list;
                var info = item.info;
                var tail = item.tail;
                var post_number = item.post_number;
              return (
                <TouchableWithoutFeedback key={index} onPress={()=>{this._onTapUserHeader(item)}}>
                <View style={{height:90,width:375,flexDirection:'row',alignItems:'center',backgroundColor:'white'}}>
                    <Image style={{marginLeft:10,width:60,height:60,borderRadius:5}} source={{uri: image_list}}/>
                    <View style={{marginLeft:5,width:295-65}}>
                        <Text style={{flex:1,color:'black',fontSize:15,marginTop:20,flexShrink: 1}} numberOflines={1}>{tail}</Text>
                        <Text style={{flex:1,color:'#A6A6A6',fontSize:12,marginTop:5,marginBottom:15,flexShrink: 1}} numberOflines={2} >{info}</Text>
                    </View>
                    <View style={{marginLeft:5,width:55,height:22,backgroundColor:'red',borderRadius:12,alignItems:'center'}}>
                        <Text style={{color:'white',fontSize:13,textAlign:'center',marginTop:2,}}>进入></Text>
                    </View>
                </View>
                </TouchableWithoutFeedback>
              );
            })
          }
          </ScrollView>
    );
  }
}
