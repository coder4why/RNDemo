import React, { Component } from 'react';
import {
  View,
  Image,
  Text,
  TouchableWithoutFeedback,
  Animated,
  Easing,
} from 'react-native';
export default class AnimatedView extends Component {
  constructor(props) {
    super(props);
    this.state = {
        bigDogeTrans : new Animated.ValueXY({
                x: 0,
                y: 400,
            }),
        op: new Animated.Value(0.1),
        rotation: new Animated.Value(0),
        imageUrl:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1532939538294&di=8cbb6cfbbdc69548dc3979bc463e48fb&imgtype=0&src=http%3A%2F%2Fpic.nipic.com%2F2007-10-13%2F200710139231213_2.jpg',
    };
    this._startAnimation = this._startAnimation.bind(this);
  }
  _startAnimation() {
        //  Animated.parallel(['op', 'rotation',].map(property => {
        //         return timing(this.state[property], {
        //         toValue: 1,
        //         duration: 1000,
        //         easing: Easing.linear
        //     });
        // })).start();
          // Animated.timing
        Animated.spring(this.state.bigDogeTrans, {
            toValue: {
                x : 0,
                y : 25
            },
            duration: 500,
            delay: 0
        }).start();
    }
  render() {
    //Animated.View 可选的基本组件类型: Image, Text, View(可以包裹任意子View)
    return (
      <TouchableWithoutFeedback onPress={this._startAnimation}>
      <Animated.View style={[{transform: this.state.bigDogeTrans.getTranslateTransform()}]}>
           <View style={{width:300,height:45,backgroundColor:'blue',alignItems:'center',justifyContent:'center',borderRadius:5,borderColor:'black',borderWidth:1}}>
              <Text style={{flex:1,color:'white',textAlign:'center',fontSize:25,marginTop:8}}>确定</Text>
           </View>
       </Animated.View >
       </TouchableWithoutFeedback>
     );
  }

}
