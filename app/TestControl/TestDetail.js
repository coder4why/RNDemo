import React, { Component } from 'react';
import {
  WebView,
  View,
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import styles from '../styles/Styles';
//加载进度条：
import * as Progress from 'react-native-progress';
export default class TestDetail extends Component {

  constructor(props){
    super(props);
    this.state={
      progress : 0,
      height:3,
      url:this.props.navigation.state.params.url?this.props.navigation.state.params.url:'https://www.jianshu.com/p/9e6f1569227f',
    }
    this._beginProgress = this._beginProgress.bind(this);
    this._onLoadStart = this._onLoadStart.bind(this);
    this._renderLoading = this._renderLoading.bind(this);
  }

  _beginProgress(){
    setInterval(() => {
          // 准备下拉刷新的5条数据
          if (this.state.progress>=1.0) {
            this.setState({height: 0});
            setTimeout(() => {
                    this.setState({height: 0});
                }, 1000);
            return;
          }
          this.setState({progress: this.state.progress + 0.1});
        }, 90);
  }
   _onLoadStart(){
     this._beginProgress();
   }
   _renderLoading = (data) => {
     return (
       <Progress.Bar
            borderWidth={0} //
            borderRadius={2}
            height={this.state.height}
            width={375}
            progress={this.state.progress} // 进度
            unfilledColor="white" // 剩余进度的颜色
            color={"#1C86EE"} // 颜色
            animationType={'spring'}
        >
       </Progress.Bar>
     );
   }

  render() {
          return(
            <View style={styles.container}>
               <WebView
                 source={{uri:this.state.url}}
                 style={{flex:1}}
                 onLoadStart={this._onLoadStart}
                 onLoadEnd={this._onLoadEnd}
//renderLoading：WebView组件正在渲染页面时触发的函数，只有 startInLoadingState 为 true 时该函数才起作用。
                 renderLoading={this._renderLoading}
                 startInLoadingState={true}
               />
              </View>
          );
      }
}
