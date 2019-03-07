import React, { Component } from 'react';
import {
  View,
  Image,
} from 'react-native';
import styles from '../styles/Styles'
import Swiper from 'react-native-swiper';

export default class CycleImage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isShow:true,
      items:[
              'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=579968544,3719827626&fm=27&gp=0.jpg',
              'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1559089806,3434548889&fm=27&gp=0.jpg',
              'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2811754004,2183648095&fm=27&gp=0.jpg',
            ],
    };
  }

  render() {
          let H = 180;
          if (this.state.isShow) {
              return(
                    <View style={styles.cycleImg}>
                        <Swiper autoplay = {true} height = {H} showsPagination = {true} dotColor="white"
                              activeDotColor='yellow' horizontal={true}>
                          {
                              this.state.items.map((item, index) => {
                                  console.log(item, index)
                                  //cover: 等比例放大; center:不变; contain:不变; stretch:填充;
                                  return (<Image style={styles.containerNetData} key = {index} resizeMode='cover' source={{uri: item}}/>)
                              })
                          }
                          </Swiper>
                      </View>
              );
          }else {
              return(
                  <View style={styles.cycleView}/>
              );
          }
      }
}
