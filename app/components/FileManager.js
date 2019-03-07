
import RNFS from 'react-native-fs';
// var RNFS = require('react-native-fs');

let FileOperator = {

//RNFS获取沙盒文件夹的路径：
    nslogPaths(){
      console.log('RNFS开始打印：',RNFS.DocumentDirectoryPath);
      // console.log('MainBundlePath=' + RNFS.MainBundlePath);
      // console.log('CachesDirectoryPath=' + RNFS.CachesDirectoryPath);
      // console.log('DocumentDirectoryPath=' + RNFS.DocumentDirectoryPath);
      // console.log('TemporaryDirectoryPath=' + RNFS.TemporaryDirectoryPath);
      // console.log('LibraryDirectoryPath=' + RNFS.LibraryDirectoryPath);
      // console.log('ExternalDirectoryPath=' + RNFS.ExternalDirectoryPath);
      // console.log('ExternalStorageDirectoryPath=' + RNFS.ExternalStorageDirectoryPath);
    },

//RNFS文件的创建与写入：路径包含文件夹，不能创建文件夹，该方法只能创建文件，写入文件；
    writeFile(path,content){
      var p = RNFS.DocumentDirectoryPath + path;
      // write the file
      RNFS.writeFile(p, content, 'utf8')
      .then((success) => {
        console.log('写入成功');
      })
      .catch((err) => {
        console.log('写入失败：',err.message);
      });

    },

//RNFS文件夹的创建：
    makeDir(dirName){
      var destPath = RNFS.DocumentDirectoryPath + dirName;
      const options = {
                        NSURLIsExcludedFromBackupKey: true, // iOS only
                      };
      return RNFS.mkdir(destPath, options)
         .then((res) => {
             console.log('文件夹创建成功');

         }).catch((err) => {
             console.log('文件夹创建失败', err);
         });
    },

//RNFS文件夹的删除：
    deleteFile(filePath){
     // create a path you want to delete
       let rnfsPath = RNFS.DocumentDirectoryPath + filePath;
        RNFS.unlink(rnfsPath)
             .then(() => {
                console.log('删除成功');
             })
             .catch((err) => {
              //console.log(err.message);
                console.log('删除失败'+err.message);
             });
      },

}
export default FileOperator;
