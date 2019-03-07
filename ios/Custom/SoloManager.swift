//
//  SoloManager.swift
//  RNDemo
//
//  Created by hu ping kang on 2019/2/27.
//  Copyright © 2019 Facebook. All rights reserved.
//

import UIKit

//“RCT_EXPORT_METHOD()”这个宏是用来将原生的方法导出
//Swift不支持宏。所以我们还是得靠OC来当作一个桥梁，也就是RN——>OC——>Swift。
class SoloManager: NSObject {

  @objc static func rnSwiftTest(string:String,callBack:(_ str:String)->()){
    
    callBack(string);
    
  }
  
}
