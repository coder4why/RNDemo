
import {StyleSheet,Dimensions} from 'react-native';
import * as actionTypes from '../constance/Constance';

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: 'white',
    marginBottom:0,
  },
  containerNetData:{
      height:220,
      backgroundColor:'white',
  },
  color:{
    backgroundColor:'red',
  },
  noData:{
      height:actionTypes.SCREEN_HEIGHT-(actionTypes.SCREEN_HEIGHT>=812?(83+88):49+64),
      justifyContent:'center',
      alignItems:'center',
      textAlign:'center',
      backgroundColor:'white',
  },
  contain:{
      flex:1,
      backgroundColor:'white',
  },
  imageSty:{
      width:100,
      height:80,
      backgroundColor:'white',
      marginLeft:20,
      marginTop:20,
      borderRadius:5,
  },
  title:{
    fontSize: 15,
    color: 'black',
    marginLeft:140,
    marginTop:10,
  },
  cycleImg:{

    height: 220,
    alignItems:'center',
    backgroundColor:'white',
  },
  cycleView:{
    height:220,
    width: 414,
    backgroundColor:'white',
  },
  containerOne: {
    marginTop:5,
    height:120,
    flexDirection:'row',
    backgroundColor: 'white',
  },
  imageStyle:{
    // width:100,
    margin:5,
    flex:1,
    borderRadius:5,
    backgroundColor:'white',
    backgroundColor: '#F8F8FF',
  },
  imageStyle:{
    margin:5,
    width:100,
    backgroundColor:'pink',
  },
  containerTwo: {
    marginLeft:0,
    marginTop:5,
    marginBottom:5,
    width:actionTypes.SCREEN_WIDTH-100,
    flexDirection:'column',
  },
  text:{
    fontSize:16,
    color:'#4B0082',
    margin:5,
  },
  textDesc:{
    fontSize:14,
    color:'#4D4D4D',
    margin:5,
    width:200,
    flexDirection:'column',
  },
  text:{
    fontSize:15,
    color:'black',
    margin:10,
  },
  textDesc:{
    fontSize:12,
    color:'black',
    marginTop:-5,
    // marginHorizontal: 5,
    flexShrink: 1  //文字溢出不显示；
  },
  btnStyle:{
    fontSize:5,
    backgroundColor:'#436EEE',
    flex:1,
    marginTop:30,
    marginBottom:30,
    marginLeft:10,
    marginRight:10,
    borderRadius:5,
  },
});

let homeStyles = StyleSheet.create({

  homePageContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  homeContainer:{
    height:actionTypes.SCREEN_HEIGHT,
    backgroundColor:'white',

  },
  homeContainerOne:{
    height:250,
    marginBottom:10,
    backgroundColor:'white',
  },
  homeContainerTwo:{
    marginRight:5,
    width:125,
    flexDirection:'row',
    backgroundColor: '#F5F5F5',
  },
  headerContainer:{
    width:120,
    height:200,
    color:'white',
    marginRight:5,
  },
  headerImage:{
    width:120,height:180,marginRight:5,
  },
  textStyle:{
    fontSize:15,
    color:'black',
    margin:10,
    textAlign:'center',
    width:120,
    height:20,
  },
  centerImage:{
    width:122,
    height:100,
  },
  centerScrollView:{
    flex:1,
  },


});

//默认输出；
export {styles as default};
