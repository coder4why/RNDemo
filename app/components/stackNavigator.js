
import React, { Component } from 'react';
import {
  createBottomTabNavigator,
  createStackNavigator,
  createAppContainer
} from 'react-navigation';
import { TapGestureHandler } from 'react-native-gesture-handler';
import {
  View,
  Text,
  Image,
} from 'react-native';
import HomePage from '../home/HomePage';
import NextPage from '../homeDetail/NextPage';
import FavorPage from '../favorite/FavorPage';
import CatePage from '../favorite/CatePage';
import WebPage from '../favorite/WebPage';
import MoviePage from '../favorite/MoviePage';
import MinePage from '../mine/MinePage';
import TestPage from '../TestControl/TestPage';
import routeIndex from './IndexRoute';

const home_normal = require('../images/home_normal.png');
const home_selected = require('../images/home_selected.png');
const favorite_normal = require('../images/favorite_normal.png');
const favorite_selected = require('../images/favorite_selected.png');
const mine_normal = require('../images/mine_normal.png');
const mine_selected = require('../images/mine_selected.png');

const TabRouteConfigs = {
  HomePage:{
    screen:HomePage,
    navigationOptions:{
        tabBarLabel:'首页',
        tabBarIcon:({focused,tintColor}) => (
          <Image
            source={focused ? home_normal:home_selected}
            style={{width:23,height:23,tintColor:tintColor}}
          />)
        },
      },
  FavorPage:{
    screen:CatePage,
    navigationOptions: ({ navigation }) => ({
        // title:'视频',
        tabBarLabel:'视频',
        tabBarIcon:({focused,tintColor}) => (
          <Image
            source={focused ? favorite_normal:favorite_selected}
            style={{width:23,height:23,tintColor:tintColor}}
          />)
        }),
      },
  MoviePage:{
    screen:MoviePage,
    navigationOptions: ({ navigation }) => ({
        // title:'电影',
        tabBarLabel:'电影',
        tabBarIcon:({focused,tintColor}) => (
          <Image
            source={focused ? favorite_normal:favorite_selected}
            style={{width:23,height:23,tintColor:tintColor}}
          />)
        }),
      },
  MinePage:{
    screen:MinePage,
    navigationOptions: ({ navigation }) => ({
        // title:'个人中心',
        tabBarLabel:'个人中心',
        tabBarIcon:({focused,tintColor}) => (
          <Image
            source={focused ? mine_normal:mine_selected}
            style={{width:23,height:23,tintColor:tintColor}}
          />)
        }),
      },
    TestPage:{
      screen:TestPage,
      navigationOptions: ({ navigation }) => ({
          // title:'测试',
          tabBarLabel:'测试',
          tabBarIcon:({focused,tintColor}) => (
            <Image
              source={focused ? mine_normal:mine_selected}
              style={{width:23,height:23,tintColor:tintColor}}
            />)
          }),
        },

};

const TabNavigatorConfigs = {
    // initialRouteName:'HomePage',
    //是否在更改标签时显示动画
    animationEnabled: false,
    tabBarPosition: 'bottom',
    //是否允许在标签之间进行滑动
    swipeEnabled: false,
    backBehavior: "none",
    tabBarOptions:{
      activeTintColor:'#333333',
      inactiveTintColor:'grey',
      // activeBackgroundColor:'#333333',
      // inactiveBackgroundColor:'#333333',
      showIcon:true,
      // style: {
      //     backgroundColor: '#EEE9E9',
      //     paddingBottom: 0,
      //     borderTopWidth: 0.5,
      //     borderTopColor: '#ccc',
      //   },
    },
};
const titles = ['首页','视频','电影','我的','测试'];
const colors = ['#333333','#333333','#333333','#333333','#333333']
const APP = createBottomTabNavigator(TabRouteConfigs,TabNavigatorConfigs);
const Navigator = createStackNavigator(
    {
          aPP: {
            screen:APP,
            navigationOptions: ({navigation}) => ({
                  headerTitle:titles[navigation.state.index],
                  headerTintColor:'white',
                  headerStyle: {
                      backgroundColor: colors[navigation.state.index],
                  },
              }),
          },
          ...routeIndex,
    },

);

export default createAppContainer(Navigator);
