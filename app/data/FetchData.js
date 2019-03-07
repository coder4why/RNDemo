
import React, { Component } from 'react';
var REQUEST_URL = 'http://app.u17.com/v3/appV3_3/ios/phone/comic/boutiqueListNew';
var REQUEST_URL_HOME = 'http://app.u17.com/v3/appV3_3/ios/phone/list/vipList';
// var REQUEST_URL_NEXT = 'http://app.u17.com/v3/appV3_3/ios/phone/sort/mobileCateList';
var REQUEST_URL_NEXT = 'http://app.u17.com/v3/appV3_3/ios/phone/list/newSubscribeList';
var REQUEST_URL_VIDEO = 'http://d.api.budejie.com/topic/list/zuixin/41/bs0315-ios-4.5.9/0-20.json';
var REQUEST_URL_JOKE = 'http://d.api.budejie.com/topic/list/zuixin/29/bs0315-ios-4.5.9/0-20.json';
var REQUEST_URL_MOVIE_LIST = 'https://api-m.mtime.cn/Movie/MovieComingNew.api?locationId=290';
var REQUEST_URL_MOVIE = 'https://ticket-api-m.mtime.cn/movie/detail.api?locationId=290&movieId=125805';

const API = {
    //精选
    movie: {
        //电影详情：
        movie_list: (locationId) => 'https://api-m.mtime.cn/Movie/MovieComingNew.api?locationId=' + locationId ,
        //最新电影列表
        movie_detail: (locationId, movieId) => 'https://ticket-api-m.mtime.cn/movie/detail.api?locationId=' + locationId + '&movieId=' + movieId ,
    },
    u17:{
        //
        list:'http://app.u17.com/v3/appV3_3/ios/phone/comic/boutiqueListNew',
        //首页
        home:'http://app.u17.com/v3/appV3_3/ios/phone/list/vipList',
        //首页详情：
        home_detail:'http://app.u17.com/v3/appV3_3/ios/phone/list/newSubscribeList',
    },
    miss:{
      //视频：
      video:'http://d.api.budejie.com/topic/list/zuixin/41/bs0315-ios-4.5.9/0-20.json',
      //段子：
      joke:'http://d.api.budejie.com/topic/list/zuixin/29/bs0315-ios-4.5.9/0-20.json',
    },
}

//编写一个类方法：
export function requestJSONData (callback){
      fetch(API.u17.list)
      .then((response)=>response.json())
      .then((jsondata) =>{
          var movies = [];
          var comicLists = JSON.parse(JSON.stringify(jsondata.data.returnData.comicLists));
          for (var i = 0; i < comicLists.length; i++) {
            key={i};
            var comics = JSON.parse(JSON.stringify(jsondata.data.returnData.comicLists[i].comics));
            for (var j = 0; j < comics.length; j++) {
                  //由JSON字符串转换为JSON对象
                  keey={j};
                  var obj = JSON.parse(JSON.stringify(jsondata.data.returnData.comicLists[i].comics[j]));

                  if (obj.name && obj.description) {
                    movies.push(obj);
                  }
            }
          }
          callback(movies);
          })
      .catch((error)=>{
        console.warning(error);
        alert('失败了啊');
      });
}
//定义多个函数：
export function requestHomeData (callback){

  fetch(API.u17.home)
  .then((response)=>response.json())
  .then((jsondata) =>{
      var newVipLists = JSON.parse(JSON.stringify(jsondata.data.returnData.newVipList));
      callback(newVipLists);
      })
  .catch((error)=>{
    console.warning(error);
    alert('失败了啊');
  });
}

export function requestNextPageData(callback){

  fetch(API.u17.home_detail)
  .then((response)=>response.json())
  .then((jsondata) =>{
      var rankingList = jsondata.data.returnData.newSubscribeList;
      callback(rankingList);
      })
  .catch((error)=>{
    console.warning(error);
    alert('失败了啊');
  });

}

//编写一个类方法：
export function requestVideoData (callback){
      fetch(API.miss.video)
      .then((response)=>response.json())
      .then((jsondata) =>{
          var lists = jsondata.list;
          callback(lists);
          })
      .catch((error)=>{
        console.warning(error);
        alert('失败了啊');
      });
}

//编写一个类方法：
export function requestJokeData (callback){
      fetch(API.miss.joke)
      .then((response)=>response.json())
      .then((jsondata) =>{
          var lists = jsondata.list;
          callback(lists);
          })
      .catch((error)=>{
        console.warning(error);
      });
}

//编写一个类方法：
export function requestMovieListData (locationId,callback){
      fetch(API.movie.movie_list(locationId))
      .then((response)=>response.json())
      .then((jsondata) =>{
          callback(jsondata);
          })
      .catch((error)=>{
        console.warning(error);
      });
}

//编写一个类方法：
export function requestMovieDetailData (locationId,movieId,callback){
      fetch(API.movie.movie_detail(locationId,movieId))
      .then((response)=>response.json())
      .then((jsondata) =>{
          callback(jsondata.data);
          })
      .catch((error)=>{
        console.warning(error);
      });
}

export {requestJSONData as default};
