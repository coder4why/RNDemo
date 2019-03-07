import React, { Component } from 'react';
import {
  View,
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import styles from '../styles/Styles';
import HomeData from './HomeData';
export default class HomePage extends Component {

  pushToNextView(){
    const navigateAction = NavigationActions.navigate({
      routeName: 'HomeDetail',
      params: {},
      action: NavigationActions.navigate({ routeName: 'HomeDetail',title:'笑傲江湖'}),
     });
     this.props.navigation.dispatch(navigateAction);
  }
  render() {
          return(
            <View style={styles.container}>
                 <HomeData callBackFunc = {()=>(this.pushToNextView())}/>
              </View>
          );
      }
}
