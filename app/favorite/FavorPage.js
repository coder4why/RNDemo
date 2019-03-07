
import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';
import NetData from '../data/NetData';
import WebPage from './WebPage';

import {
  Navigator,
} from 'react-native';

var lister = null;
export default class FavorPage extends Component {

    pushToNextView(url){
      const navigateAction = NavigationActions.navigate({
        routeName: 'WebPage',
        params: {},
        action: NavigationActions.navigate({ routeName: 'WebPage',title:'WebPage'}),
       });
       this.props.navigation.dispatch(navigateAction);

    }
    pushToJokePage(){
      const navigateAction = NavigationActions.navigate({
        routeName: 'JokePage',
        params: {},
        action: NavigationActions.navigate({routeName: 'JokePage'}),
       });
       this.props.navigation.dispatch(navigateAction);
    }

  render() {
    return (
          <NetData
          callBackFunc = {(url)=>{this.pushToVideoPage()}}
          clickPicFunc = {()=>{this.pushToJokePage()}}
          />
    );
  }
}
