import React, { Component } from 'react';
import {
  View,
  TouchableWithoutFeedback,
  NativeModules,
  NativeEventEmitter,
} from 'react-native';
import Video from 'react-native-video';
import VideoPlayer from '../components/VideoPlayer';
//RN与原生iOS的交互：
var shareManager = NativeModules.UEManager;

export default class VideoView extends Component{
//
  constructor(props) {
    super(props);
    this.state = {
      // videoWidth: 375,    // 默认视频宽度，竖屏下为屏幕宽度
      videoHeight: 220, // 默认视频高度，竖屏下为宽度的9/16，使视频保持16：9的宽高比
      videoURL:'https://gslb.miaopai.com/stream/fcP7cca785fz2L-Ke-d-T9mRs4r8AA1jUgxdPg__.mp4',
    };
    {/** this.setState is not a function:fix **/}
    this._onTapWXShare = this._onTapWXShare.bind(this);
    this._onTapQQShare = this._onTapQQShare.bind(this);
  }
  _onTapWXShare = (videoUrl) => {
      shareManager.shareToWX(videoUrl);
  }
  _onTapQQShare = (videoUrl) => {
      shareManager.shareToQQ(videoUrl);
  }

  render() {
      return (
        <View style={{ height:this.state.videoHeight,backgroundColor:'white'}}>
            <VideoPlayer
              videoURL={this.state.videoURL}
              videoHeight={this.state.videoHeight}
              onTapWXShare={(url) => this._onTapWXShare(url)}
              onTapQQShare={(url) => this._onTapQQShare(url)}
            />
          </View>
          )
  }

}
