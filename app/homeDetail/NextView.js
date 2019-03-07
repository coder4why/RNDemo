
import React, { Component } from 'react';
import {
  Image,
  Text,
  View,
  ScrollView,
  ListView,
  TouchableWithoutFeedback,
} from 'react-native';
import styles from '../styles/Styles';
import * as actionTypes from '../constance/Constance';
import {requestNextPageData} from '../data/FetchData';
import VideoView from './VideoView';
import Loading from '../components/Loading';
import Lightbox from 'react-native-lightbox';

export default class NextView extends Component{

      callBackFunc:null; //回调函数
      constructor(props) {
        super(props);
        var ds = new ListView.DataSource({
          rowHasChanged:(r1,r2) => r1 !== r2,
        });
        this.state = {
          newSubscribeList:null,
          dataSource:ds,
          imageUrls:[],
          titles:[],
          listDatas:[],
          };
      };
      render()
      {
          if (!this.state.newSubscribeList) {
              return this.renderLoadingView();
          }
          return this.renderMovie();
      };
      //请求网络数据：
      requestData(){
          requestNextPageData((newSubscribeList) =>{
            this.setState({newSubscribeList : newSubscribeList});
          });
      };
      componentDidMount()
      {
          this.requestData();
      }
      renderLoadingView()
      {
          return (
              <View style={styles.noData}>
                <Loading/>
              </View>
              );
      }
      onPressEvent = (index) => {
          if (this.props.callBackFunc != null) {
              // this.props.callBackFunc(this.state.imageUrls,this.state.titles,index);
          }
      }

      _renderRow(rowData,rowId){

        var cover = rowData.comics[0].cover;
        var name = rowData.itemTitle+'【'+rowData.description+'】';
        return(
          <View style={{height:180,backgroundColor:'white'}}>
              <Lightbox>
                <Image
                  style={{ height: 180,margin:2}}
                  source={{ uri: cover }}
                  resizeMode='cover'
                />
              </Lightbox>
              <View style={{height:180,marginTop:2,backgroundColor:'white'}}>
                  <TouchableWithoutFeedback onPress = {()=>this.onPressEvent(rowId)}>
                  <Image style={{height:150}} source={{uri: cover}}/>
                  </TouchableWithoutFeedback>
                  <Text style={{color:'black',marginLeft:2,fontSize:15,marginTop:6}}>{name}</Text>
              </View>
          </View>
        );

      }

      renderMovie()
      {

          return (

              <ScrollView style={{flex:1,backgroundColor:'#FCFCFC'}}>
                  <VideoView/>
                  <ListView
                     style={{flex:1}}
                     enableEmptySections={true}
                     dataSource={this.state.dataSource.cloneWithRows(this.state.newSubscribeList)}
                     renderRow={(rowData,sectionId,rowId) => this._renderRow(rowData,rowId)}
                     showsVerticalScrollIndicator={false}
                  />
              </ScrollView>
              );
      }

  }
