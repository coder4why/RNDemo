//
//  NativeToRN.h
//  NewDemo
//
//  Created by hu ping kang on 2018/7/21.
//  Copyright © 2018年 Facebook. All rights reserved.
//
#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>
#import <Foundation/Foundation.h>

//原生与RN的交互：
@interface NativeToRN : RCTEventEmitter<RCTBridgeModule>

@end
