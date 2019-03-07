import React,{Component} from 'react';
import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  Slider,
} from 'react-native';
import PropTypes from 'prop-types';
import Video from 'react-native-video';
import styles from '../styles/Styles';
import * as actionTypes from '../constance/Constance';


//一个简单的视频播放器组件：
export default class VideoPlayer extends Component {

  //分享点击事件：
  static propTypes = {
    onTapWXShare: PropTypes.func,
    onTapQQShare: PropTypes.func,
    onPlayEnd:PropTypes.func,

  };

  static defaultProps = {
    videoWidth: actionTypes.SCREEN_WIDTH,    // 默认视频宽度，竖屏下为屏幕宽度
    videoHeight: 300, // 默认视频高度，竖屏下为宽度的9/16，使视频保持16：9的宽高比
    // 视频的地址
    videoURL:'https://gslb.miaopai.com/stream/fcP7cca785fz2L-Ke-d-T9mRs4r8AA1jUgxdPg__.mp4',
    shareUrl:'http://www.miaopai.com/show/CC8I-RTR-oxUhi4t4-CO6A__.htm',

    autoPlay:false,
    isAbsolute:false,
    marginLeft:0,
    marginTop:0,

  };

  constructor(props) {
    super(props);
    this.state = {
        videoWidth:this.props.videoWidth,
        videoHeight:this.props.videoHeight,
        videoUrl:this.props.videoURL,

        isPlaying:this.props.autoPlay,
        duration: 0,     // 视频的时长
        currentTime: 0,  // 视屏当前播放的时间
        isShowControl: false, // 是否显示播放的工具栏
        isShareMenuShow: false,  // 是否显示分享界面

        isAbsolute:this.props.isAbsolute,
        marginLeft:this.props.marginLeft,
        marginTop:this.props.marginTop,

    }
    this._onTapPlayButton = this._onTapPlayButton.bind(this);
    this._onTapCenterPlayButton = this._onTapCenterPlayButton.bind(this);
    this._onTapPlayer = this._onTapPlayer.bind(this);
    this._onLoad = this._onLoad.bind(this);
    this._onProgressChange = this._onProgressChange.bind(this);
    this._onPlayEnd = this._onPlayEnd.bind(this);
    this._onSliderValueChange = this._onSliderValueChange.bind(this);
    this._onTapShareButton = this._onTapShareButton.bind(this);
    this._onTapShareQQButton = this._onTapShareQQButton.bind(this);
    this._onTapShareWXButton = this._onTapShareWXButton.bind(this);
    this._onTapShareBgView = this._onTapShareBgView.bind(this);
    this._onTapPlayerBg = this._onTapPlayerBg.bind(this);

  }
  _onLoad = (data) => {
    console.log('视频加载完成');
    this.setState({
      duration: data.duration,
    });
  };
  //进度
  _onProgressChange = (data) => {
    if (!this.state.isPaused) {
      this.setState({
        currentTime: data.currentTime,
      })
    }
  };

  _onPlayEnd(){
    //视频播放完成：
    this.setState({
      isPlaying:false,
      isShowControl:false,
    });

    this.props.onPlayEnd && this.props.onPlayEnd();

  }
  _onTapCenterPlayButton(){
    //视频重新开始播放：
    if (this.state.isShowControl==false) {
      this.videoRef.seek(1);
    }
    this.setState({
      isPlaying:!this.state.isPlaying,
      isShowControl:true,
      isShareMenuShow:false,
    });
  }
  _onTapPlayButton(){
    this.setState({
      isPlaying:!this.state.isPlaying
    });
  }
  //点击播放Video时的函数：
  _onTapPlayer(){
      this.setState({isPlaying:!this.state.isPlaying});
  }
  _onSliderValueChange(currentTime){
    this.videoRef.seek(currentTime);
    if (this.state.isPaused) {
      this.setState({
        isPaused: false,
      })
    }
  }
_onTapShareButton(){
  this.setState({isShareMenuShow:!this.state.isShareMenuShow});

}
_onTapShareQQButton(){
  this.props.onTapQQShare && this.props.onTapQQShare(this.state.shareUrl);
  this.setState({isShareMenuShow:!this.state.isShareMenuShow});
}
_onTapShareWXButton(){
    this.props.onTapWXShare && this.props.onTapWXShare(this.state.shareUrl);
    this.setState({isShareMenuShow:!this.state.isShareMenuShow});
}
_onTapShareBgView(){
  this.setState({isShareMenuShow:!this.state.isShareMenuShow});
}
_onTapPlayerBg(){
  if (this.state.isPlaying) {
    this.setState({isShowControl:!this.state.isShowControl});
  }
}
  render(){

      return (

          <View style={{marginLeft:this.state.marginLeft,marginTop:this.state.marginTop,width:this.state.videoWidth,height:this.state.videoHeight,position:this.state.isAbsolute?'absolute':''}}>

              <TouchableWithoutFeedback onPress={this._onTapPlayerBg}>
                <Video
                  ref={(ref) => { this.videoRef = ref }}
                   style={{position: 'absolute',
                   width:this.state.videoWidth,
                   height:this.state.videoHeight,
                   backgroundColor:'black'}}
                   source={{uri: this.state.videoUrl}}
                   rate={1.0}
                   resizeMode={'contain'}
                   volume={1.0}
                   paused={!this.state.isPlaying}
                   onLoad={this._onLoad}
                   onProgress={this._onProgressChange}
                   onEnd={this._onPlayEnd}
                />
              </TouchableWithoutFeedback>
              {
                  this.state.isShowControl ?
                  <View style={{position: 'absolute',marginLeft:0,bottom:0,height:40,width:this.state.videoWidth,flexDirection: 'row',justifyContent: 'center',
                  alignItems: 'center'}}>
                    <Image style={{position:'absolute', top: 0, left: 0, width: this.state.videoWidth, height:40}} source={require('../src/image/img_bottom_shadow.png')}/>
                    {/** 添加状态栏左侧播放按钮 **/}
                    <TouchableWithoutFeedback onPress={this._onTapPlayButton}>
                      <Image
                        style={{width: 24,height: 24,marginLeft: 15}}
                        source={this.state.isPlaying==false ? require('../src/image/icon_control_play.png') : require('../src/image/icon_control_pause.png')}
                      />
                    </TouchableWithoutFeedback>
                    {/** 添加状态栏底部左侧时间显示 **/}
                    <Text style={{fontSize: 13,color: 'white',marginLeft: 10,marginRight: 10}}>
                      {formatTime(this.state.currentTime)}
                    </Text>
                    {/** 添加状态栏底部时间播放Slider **/}
                    <Slider
                      style={{flex: 1}}
                      maximumTrackTintColor={'#999999'}//滑块右侧轨道的颜色
                      minimumTrackTintColor={'#00c06d'}//滑块左侧轨道的颜色
                      thumbImage={require('../src/image/icon_control_slider.png')}
                      value={this.state.currentTime}
                      minimumValue={0}
                      maximumValue={Number(this.state.duration)}
                      onValueChange={this._onSliderValueChange}
                    />
                    {/** 添加状态栏底部右侧时间显示 **/}
                    <Text style={{fontSize: 13,color: 'white',marginLeft: 10,marginRight: 10}}>
                      {formatTime(this.state.duration)}
                    </Text>
                  </View>:null
              }
              {
                //添加顶部分享：
                this.state.isShowControl ?
                <View style={{position: 'absolute',marginLeft:0,top:0,height:40,width:this.state.videoWidth,flexDirection: 'row',
                  alignItems: 'center'}}>
                    <Image style={{position:'absolute', top: 0, left: 0, width: this.state.videoWidth, height:40}} source={require('../src/image/img_bottom_shadow.png')}/>
                    <TouchableWithoutFeedback onPress={this._onTapShareButton}>
                      <Image
                        style={{width: 24,height: 24,marginLeft: this.state.videoWidth-15-24}}
                        source={require('../src/image/icon_video_share.png')}
                      />
                    </TouchableWithoutFeedback>
                </View>:null
              }
              {
                //添加顶部分享：
                this.state.isShareMenuShow && this.state.isShowControl ?
                <TouchableWithoutFeedback onPress={this._onTapShareBgView}>
                  <View style={{position: 'absolute',marginLeft:0,top:0,height:this.state.videoHeight,width:this.state.videoWidth,flexDirection: 'row',
                    alignItems: 'center',justifyContent: 'center',backgroundColor: 'rgba(1, 1, 1, 0.2)'}}>
                      <TouchableWithoutFeedback onPress={this._onTapShareQQButton}>
                        <Image
                          style={{width: 40,height: 40,marginRight:40}}
                          source={require('../src/image/icon_share_qq.png')}
                        />
                      </TouchableWithoutFeedback>
                      <TouchableWithoutFeedback onPress={this._onTapShareWXButton}>
                        <Image
                          style={{width: 40,height: 40}}
                          source={require('../src/image/icon_share_wxsession.png')}
                        />
                      </TouchableWithoutFeedback>
                  </View>
                </TouchableWithoutFeedback>:null
              }
              {
                !this.state.isPlaying ?
                <TouchableWithoutFeedback onPress={this._onTapCenterPlayButton}>
                    <View style={{position: 'absolute',width:40,height:40,marginLeft:(this.state.videoWidth-40)/2.0,marginRight:(this.state.videoWidth-50)/2.0,
                      marginTop:(this.state.videoHeight-40)/2.0,marginBottom:(this.state.videoHeight-40)/2.0,
                      }}>
                        <Image style={{flex:1,resizeMode:'contain'}}
                          source={require('../src/image/icon_video_play.png')}
                        />
                    </View>
                </TouchableWithoutFeedback> : null
              }

          </View>
      );

  }
}

export function formatTime(second) {
  let h = 0, i = 0, s = parseInt(second);
  if (s > 60) {
    i = parseInt(s / 60);
    s = parseInt(s % 60);
  }
  // 补零
  let zero = function (v) {
    return (v >> 0) < 10 ? "0" + v : v;
  };
  return [zero(h), zero(i), zero(s)].join(":");

}
