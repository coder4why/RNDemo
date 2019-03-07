import React, { Component } from 'react';
import {
  View,
  Animated,
  StyleSheet,
  Text,
  Easing,

} from 'react-native';
import {SCREEN_HEIGHT,SCREEN_WIDTH} from '../constance/Constance';
import { RNCamera } from 'react-native-camera';
import { NavigationActions } from 'react-navigation';

export default class TestRNCamera extends Component {
  constructor(props) {
      super(props);
      this.state = {
          moveAnim: new Animated.Value(0)
      };
  }

  componentDidMount() {
      this.startAnimation();
      const { navigate } = this.props.navigation;
      const backAction = NavigationActions.back({
        key: 'TestDetail',
      });
      this.props.navigation.goBack('TestDetail');
      // this.props.navigation.dispatch(backAction);
  }

  startAnimation = () => {
      this.state.moveAnim.setValue(0);
      Animated.timing(
          this.state.moveAnim,
          {
              toValue: -200,
              duration: 1500,
              easing: Easing.linear
          }
      ).start(() => this.startAnimation());
  };
  //  识别二维码
  onBarCodeRead = (result) => {
    const {data} = result;
    alert('扫描成功:'+result.data);
    setTimeout(() => {
        const { navigate } = this.props.navigation;
        const backAction = NavigationActions.back({
          key: 'TestPage',
        });
        // this.props.navigation.goBack('TestPage');
        this.props.navigation.dispatch(backAction);
      }, 2000);
      //

      // const {data} = result;
      // // console.log(data);
      // this.props.navigation('TestDetail', {
      //       url: data,
      //   });

  };

  render() {
      return (
          <View style={styles.container}>
              <RNCamera
                  ref={ref => {
                      this.camera = ref;
                  }}
                  style={styles.preview}
                  type={RNCamera.Constants.Type.back}
                  flashMode={RNCamera.Constants.FlashMode.off}
                  onBarCodeRead={this.onBarCodeRead}
              >
                  <View style={styles.rectangleContainer}>
                      <View style={styles.rectangle}/>
                      <Animated.View style={[
                          styles.border,
                          {transform: [{translateY: this.state.moveAnim}]}]}/>
                      <Text style={styles.rectangleText}>将二维码放入框内，即可自动扫描</Text>
                  </View>
                  </RNCamera>
          </View>
      );
  }
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      flexDirection: 'row'
  },
  preview: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center'
  },
  rectangleContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'transparent'
  },
  rectangle: {
      height: 200,
      width: 200,
      borderWidth: 1,
      borderColor: '#00FF00',
      backgroundColor: 'transparent'
  },
  rectangleText: {
      flex: 0,
      color: '#fff',
      marginTop: 10
  },
  border: {
      flex: 0,
      width: 200,
      height: 2,
      backgroundColor: '#00FF00',
  }
});
