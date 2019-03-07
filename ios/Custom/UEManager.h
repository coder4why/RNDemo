//
//  UEManager.h
//  NewDemo
//
//  Created by hu ping kang on 2018/7/20.
//  Copyright © 2018年 Facebook. All rights reserved.
//

//RN与原生的交互：
#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>

//当Native Module出现多次数据回调时，我们可以使用RCTEventEmitter来注册事件,然后通知到JavaScript

@interface UEManager : NSObject<RCTBridgeModule>
 
@end
