import  {
    AsyncStorage
}from 'react-native';

import React, { Component } from 'react';

let  DeviceStorage = {

  //保存数据
  setObject(key,object){
    AsyncStorage.setItem(key, JSON.stringify(object), () => {});
  },
  //获取数据
  getObject(key){
      AsyncStorage.getItem(key, (error, object) => {
        if (error) {
          console.log('Error:' + error.message); return ();
      } else {
        return(object);
      } }
      )
  },
  //获取数据
  getObject(key,callback){
        AsyncStorage.getItem(key, (error, object) => { if (error)
          {
            console.log('Error:' + error.message); callback();
         } else {
           callback(JSON.parse(object));
         }
       }
     )
  },
 	saveData(key,result,cp){
       return AsyncStorage.setItem(key, JSON.stringify(result),(r)=>{
            if(cp){
                cp(r)
            }
       });
    },
    getValue(key){
         return AsyncStorage.getItem(key).then((result)=>{
         	const value = JSON.parse(result);
         	return value;
         });
    },
    removeData(key){
        try {
            AsyncStorage.removeItem(
                key,
                (error)=>{
                    if(!error){
                        console.log('移除成功');
                    }
                }
            )
        }catch (error){
            console.log('失败',+error);
        }
    },

}
export default DeviceStorage;
