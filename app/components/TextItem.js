import React,{Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';
import PropTypes from 'prop-types';

var itemHeight = 0;
export default class TextItem extends Component{

    static defaultProps =  {
        text:'' ,
        callBackItemHeight:null
    }
    _textLayout(event) {
        var textHeigh=100;
        textHeigh=textHeigh+30>60?textHeigh+35:60;
        this.itemHeight=textHeigh;
        this.refs.text.setNativeProps({
            style:{
                height:textHeigh,
            }
        });
        // this.props.callBackItemHeight && this.props.callBackItemHeight(textHeigh);
    }

    render (){
        return(
                <View ref="text" style={styles.item}>
                    <Text style={styles.detailTitle} numberOflines={0} onLayout={this._textLayout.bind(this)}>
                        {this.props.text}
                    </Text>
                </View>
        )
    }
}

const styles= StyleSheet.create({

    item:{
        height:this.itemHeight,
        margin:10,
        backgroundColor:'yellow',
    },
    detailTitle: {
        flex:1,
        fontSize:15,
    },
});
