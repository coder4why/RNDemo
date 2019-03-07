
import React, { Component } from 'react';
import NetData from '../data/NetData';
import NextView from './NextView';
import ImageViewer from 'react-native-image-zoom-viewer';
import {
  Text,
  ScrollView,
  View,
  Modal,
} from 'react-native';

export default class NextPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isBrowser:false,
      imageUrls:[],
      titles:[],
      index:0,
    };
  }

  _browserPictures(imageUrls,titles,index){
    // alert(index);
    if (this.state.imageUrls.length==0) {
      this.setState({imageUrls:imageUrls});
      this.setState({titles:titles});
    }
    this.setState({index:index});
    this.setState({isBrowser: !this.state.isBrowser});
  }

  render() {
    return (
      <View style={{flex:1,backgroundColor:'white'}}>
           {
             this.state.isBrowser?
             <Modal
                   visible={true}
                   transparent={true}
                   onRequestClose={()=> {
                       this.setState({isBrowser: !this.state.isBrowser});
                   }}
               >
                 <ImageViewer
                     onCancel={()=> {this.setState({isBrowser: !this.state.isBrowser});}}
                     saveToLocalByLongPress={false}
                     imageUrls={this.state.imageUrls}
                     index={this.state.index}
                     onClick={()=>{
                            this.setState({isBrowser:!this.state.isBrowser});
                        }}
                    renderFooter={(currentIndex) => {
                          return (
                              <ScrollView style={{ flex:1,marginTop:-100}}>
                                  <Text style={{ color: '#fff', paddingLeft: 10, paddingRight: 10 }}>{this.state.titles[currentIndex]}</Text>
                              </ScrollView>
                          );
                      }
                    }
                 />
             </Modal>
             :<NextView callBackFunc = {(imageUrls,titles,index)=>{this._browserPictures(imageUrls,titles,index)}}/>

           }

      </View>

    );
  }

}
