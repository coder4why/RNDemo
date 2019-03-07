import React, { Component } from 'react';
import {
  View,
  Image,
  Text,
  TouchableWithoutFeedback,
  Animated,
  Easing,
  DeviceEventEmitter,
} from 'react-native';
import PropTypes from 'prop-types';
import styles from '../styles/Styles';
import * as cts from '../constance/Constance';

export default class AnimatedView extends Component {

    subscription;
    static propTypes = {
      onTapSure: PropTypes.func,
    };

    static defaultProps = {
      viewWidth: cts.SCREEN_WIDTH,
      viewHeight: 180,
      rowHeight:45,
      duration:200,
    };
    constructor(props) {
      super(props);
      this.state = {
          viewWidth:this.props.viewWidth,
          viewHeight:this.props.viewHeight,
          rowHeight:this.props.rowHeight,
          duration: this.props.duration,
          isSpringed: false,
          bigDogeTrans : new Animated.ValueXY({
                  x: 0,
                  y: 478,
              }),
      },
      this._startAnimation = this._startAnimation.bind(this);
      this._clickSureAction = this._clickSureAction.bind(this);
      this._clickCancelAction = this._clickCancelAction.bind(this);

    }
    // 263
    _startAnimation() {
      Animated.spring(this.state.bigDogeTrans, {
          toValue: {
              x : 0,
              y : cts.SCREEN_HEIGHT>=812?68:-30,
          },
          friction: 6,
          duration: this.state.duration,
          delay: 0
      }).start();
    }
    _clickSureAction() {
        this._clickCancelAction();
        this.props.onTapSure && this.props.onTapSure();
    }
    _clickCancelAction() {
      Animated.spring(this.state.bigDogeTrans, {
          toValue: {
              x : 0,
              y : 478
          },
          duration: this.state.duration,
          friction: 6,
          delay: 0
      }).start();
    }

    componentDidMount(){
      this.subscription = DeviceEventEmitter.addListener('ShowActionSheet',()=>this._startAnimation())
    }
    componentWillUnmount(){
      this.subscription.remove();
    }

    render() {
      return (
        <Animated.View style={[{transform: this.state.bigDogeTrans.getTranslateTransform()}]}>
             <View style={{width:this.state.viewWidth,height:this.state.viewHeight,backgroundColor:'#F2F2F2',
             alignItems:'center',justifyContent:'center'}}>
                <View style={{height:this.state.rowHeight+25,width:this.state.viewWidth}}>
                  <Text style={{flex:1,color:'gray',textAlign:'center',fontSize:13,marginTop:20}} numberOfLines={0}>     退出后不会删除任何历史数据，下次登录依然可以使用本账号？     </Text>
                  <View style={{opacity:0.4,height:0.4,width:this.state.viewWidth,backgroundColor:'lightgray'}}></View>
                </View>
                <TouchableWithoutFeedback onPress={this._clickSureAction}>
                  <View style={{height:this.state.rowHeight+10,width:this.state.viewWidth}}>
                    <Text style={{flex:1,color:'#436EEE',textAlign:'center',fontSize:18,marginTop:12}}>退出登录</Text>
                    <View style={{opacity:0.4,height:8,width:this.state.viewWidth,backgroundColor:'lightgray'}}></View>
                  </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={this._clickCancelAction}>
                  <View style={{height:this.state.rowHeight+10,width:this.state.viewWidth}}>
                    <Text style={{flex:1,color:'black',textAlign:'center',fontSize:18,marginTop:15}}>取消</Text>
                  </View>
                </TouchableWithoutFeedback>
             </View>
         </Animated.View>
       );
    }


}
