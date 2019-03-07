
import React, { Component } from 'react';
import {
  Image,
  Text,
  View,
  ScrollView,
  TouchableWithoutFeedback,
  ListView,
} from 'react-native';
import PropTypes from 'prop-types';
import homeStyles from '../styles/Styles';
import styles from '../styles/Styles';
import * as actionTypes from '../constance/Constance';
import {requestHomeData} from '../data/FetchData';
import Loading from '../components/Loading';

export default class HomeData extends Component
{
     //回调函数
    static callBackFunc:null;
    constructor(props){
      super(props);
      var ds = new ListView.DataSource({
        rowHasChanged:(r1,r2) => r1 !== r2,
      })
      this.state={
        vips:null,
        dataSource:ds,
        refreshing:false,
        name:'HomePages In the App',
      }
    }
    render()
    {
        if (!this.state.vips) {
            return this.renderLoadingView();
        }
        return this.renderVip();
    }
    //请求网络数据：
    requestData(){
        requestHomeData((vips) =>{
          this.setState({vips : vips});

        });
    }
    componentDidMount()
    {
        this.requestData();
    }
    renderLoadingView()
    {
        return (
            <View style={{flex:1,alignItems:'center',justifyContent:'center',}}>
              <Loading/>
            </View>
            );
    }

    onPressEvent(){

        if (this.props.callBackFunc != null) {
            this.props.callBackFunc();
        }
    }

    _onRefresh() {
        this.setState({refreshing: true});
        setTimeout(()=>{
            this.setState({refreshing: false});
        },2000)
    }
    _renderExpenseItem(item,i){

      return(
        <TouchableWithoutFeedback key={i} onPress = {()=>this.onPressEvent()}>
            <View style={{width:(actionTypes.SCREEN_WIDTH-4)/3.0,height:200,backgroundColor:'white',margin:1}}>
              <Image style={{height:180}} source={{uri: item.cover}}/>
              <Text style={{fontSize:15,color:'black',height:50,textAlign:'center',flexShrink: 1}}>{item.name}</Text>
            </View>
        </TouchableWithoutFeedback>
      );

    }
    _renderRow(rowData,rowId){

        var vip = rowData;
        var cms = JSON.parse(JSON.stringify(vip.comics));
        return(
          <View style={{flex:1}}>
                <View style={{height:250,marginBottom:3,backgroundColor:'white'}}>
                    <View style={{height:50,flexDirection:'row'}}>
                          <Image style={{marginLeft:5,width:30,height:30,marginTop:10}} source={{uri: vip.titleIconUrl}}/>
                          <Text style={{fontSize:17,color:'black',height:22,marginTop:14,textAlign:'center'}}>{vip.itemTitle}</Text>
                    </View>
                    <ScrollView style={{flex:1,backgroundColor:'#F8F8FF'}} showsHorizontalScrollIndicator={false} horizontal={true}>
                        {cms.map((item,i)=>this._renderExpenseItem(item,i))}
                    </ScrollView>
                </View>
          </View>
        );
    }

    renderVip()
    {

        return (
              <ListView
                 style={{flex:1,backgroundColor:'#F8F8FF'}}
                 dataSource={this.state.dataSource.cloneWithRows(this.state.vips)}
                 renderRow={(rowData,sectionId,rowId) => this._renderRow(rowData,rowId)}
                 showsVerticalScrollIndicator={false}
              />
            );
    }

}
