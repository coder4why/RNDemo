import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Dimensions,
    ScrollView,
    SegmentedControlIOS,
} from 'react-native';

//引用插件
import ScrollableTabView, { ScrollableTabBar, DefaultTabBar } from 'react-native-scrollable-tab-view';
import { NavigationActions } from 'react-navigation';

import WebPage from './WebPage';
import JokePage from './JokePage';
// 取得屏幕的宽高Dimensions
const { screen_width, screen_height } = Dimensions.get('window');

export default class CatePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tabShow: false,
            label: ['视频', '段子',],
            // selectIndex:0,
        },
        this.renderScrollableTab = this.renderScrollableTab.bind(this);

    };
    componentDidMount() {

        this.setState({tabShow: true});

    };
    _tapPlayAction(params){
      const navigateAction = NavigationActions.navigate({
        routeName: 'VideoDetail',
        params: params,
        action:NavigationActions.navigate({routeName: 'VideoDetail'}),
       });
       this.props.navigation.dispatch(navigateAction);

    };
    // _onChange = (event)=>{
    //   var s = 'onChange参数属性:selectedSegmentIndex：'+
    //   event.nativeEvent.selectedSegmentIndex+'\n'+ 'target:'+event.nativeEvent.target+'\n'+ 'value:'+event.nativeEvent.value;
    //   // alert(s);
    // } ;
    //
    //

    // 滑动tab
      renderScrollableTab() {
          let label = this.state.label
          if (this.state.tabShow){
              return (
                <View style={{flex:1}}>
                {/*
                  <SegmentedControlIOS //enabled={false}
                  selectedIndex={this.state.selectIndex} //momentary={true}
                  onChange={this._onChange}
                  tintColor='black'
                  values={['视频','段子']}
                  />
                  */}
                   <ScrollableTabView
                       style={{flex:1,height:40}}
                       renderTabBar={() =>
                           <ScrollableTabBar
                               style={{height:0,backgroundColor:"white"}}
                               tabStyle={{height:0,paddingLeft: 70,paddingRight: 70,marginTop:5,backgroundColor:"white"}}
                           />
                       }
                       tabBarBackgroundColor='#fff'
                       tabBarActiveTextColor='#436EEE'
                       tabBarInactiveTextColor='#333'
                       tabBarUnderlineStyle={styles.tabBarUnderline}
                   >
                       {
                           label.map((item, index) => {

                               if (item == '视频') {
                                   return (
                                       <WebPage tabLabel={item} key={index}
                                        onTapPlay={(params)=>{this._tapPlayAction(params)}}
                                       />
                                   )
                               } else {
                                   return (
                                       <JokePage tabLabel={item} key={index} />
                                   )
                               }
                           })
                       }
                   </ScrollableTabView>

                </View>
              )
          }
      };

      render() {
          return (
              <View style={styles.container}>
                {this.renderScrollableTab()}
              </View>
          );
      };
  }
  const styles = StyleSheet.create({
      container: {
          flex: 1,
          alignItems: 'center',
          backgroundColor: '#fff',
      },
      tabBarUnderline: {
          backgroundColor: '#436EEE',
          height: 0,
          width:0,
          // marginLeft:6
      }
  });
