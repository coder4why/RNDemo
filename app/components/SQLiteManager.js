

import SQLite from 'react-native-sqlite-2';
const db = SQLite.openDatabase('98k.db', '1.0', "Test Database", 200000);

let SQLiteManager = {

    //创建数据库：
    errorCB(err) {
        console.log("SQL Error: " + err);
    },
    successCB() {
      console.log("SQL executed fine");
    },
    openCB() {
      console.log("Database OPENED");
    },
    createDataBase(){

    },
    //新建一张表：
    createTable(){
      if (db){
        db.transaction(function (txn) {
          // txn.executeSql('DROP TABLE IF EXISTS Users', []);
          txn.executeSql('CREATE TABLE IF NOT EXISTS Users(user_id INTEGER PRIMARY KEY NOT NULL, name VARCHAR(30))', [],
              function (tx, res) {
                // alert(JSON.stringify(tx)+'<br>'+'😄😄'+JSON.stringify(res));
                alert(tx._websqlDatabase._error == undefined?"创建表成功":"创建表失败");
                // console.log(JSON.stringify(tx)+'<br>'+'😄😄'+JSON.stringify(res));
              });
        });
      }
    },

    //插入一条数据：
    insertMsgs(){
      if (db){
        db.transaction(function (txn) {
          txn.executeSql('INSERT INTO Users (name) VALUES `AWM-狙击步枪`',
              function (tx, res) {

                      alert(tx._websqlDatabase._error == undefined?"插入成功":"插入失败");
                  });
              });
        }
    },

    //修改一条数据：
    updateMsgs(){
      if (db){
        db.transaction(function (txn) {
          txn.executeSql('UPDATE Users SET name VALUES `Mini94-狙击步枪` WHERE [name = "98K"]', [],
              function (tx, res) {
                      alert(tx._websqlDatabase._error == undefined?"修改成功":"修改失败");
                  });
              });
        }
    },

    //查询一条数据：
    selectMsgs(){
      if (db){
        db.transaction(function (txn) {
          txn.executeSql('SELECT * FROM `Users`', [],
              function (tx, res) {
                  for (let i = 0; i < res.rows.length; ++i) {
                    alert(JSON.stringify(res.rows.item(i)));
                  }
                });
          });
        }
    },

    //删除一条数据：
    delectMsgs(){
      if (db){
        db.transaction(function (txn) {
          txn.executeSql('DELETE FROM Users WHERE (name) VALUES (:name)', ['98K'], [],
              function (tx, res) {
                      alert(tx._websqlDatabase._error == undefined?"删除成功":"删除失败");
                  });
              });
        }
    },
    //删除一张表：
    deleteTable(){
      if (db){
        db.transaction(function (txn) {
          txn.executeSql('DROP TABLE IF EXISTS Users', [], [],
              function (tx, res) {
                      alert(tx._websqlDatabase._error == undefined?"删除Users成功":"删除Users失败");
                  });
              });
        }
    },

}

export default SQLiteManager;
