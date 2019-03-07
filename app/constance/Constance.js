
//定义全局常量；
import {Dimensions,Platform} from 'react-native';

export const SCREEN_HEIGHT = (Dimensions.get('window').height);
export const SCREEN_WIDTH = (Dimensions.get('window').width);
export const PLATFORM_isIOS = Platform.OS === 'ios';
export const PLATFORM_isAndroid = Platform.OS === 'android';

/**
在 Android上,Version属性是一个数字，表示 Android 的 api level;
在 iOS 上,Version属性是-[UIDevice systemVersion]的返回值;当前系统版本的字符串。比如可能是"10.3"。
*/
export const PLATFORM_VERSION = Platform.Version;

// Platform.select()，它可以以 Platform.OS 为 key，从传入的对象中返回对应平台的值，
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     ...Platform.select({
//       ios: {
//         backgroundColor: "red"
//       },
//       android: {
//         backgroundColor: "blue"
//       }
//     })
//   }
// });


/**
特定平台扩展名

当不同平台的代码逻辑较为复杂时，最好是放到不同的文件里，这时候我们可以使用特定平台扩展名。React Native 会检测某个文件是否具有.ios.或是.android.的扩展名，然后根据当前运行的平台自动加载正确对应的文件。

比如你可以在项目中创建下面这样的组件：

BigButton.ios.js
BigButton.android.js

然后去掉平台扩展名直接引用：

const BigButton = require("./BigButton");
React Native 会根据运行平台的不同自动引入正确对应的组件。

*/
