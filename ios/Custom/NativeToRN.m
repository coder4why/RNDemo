//
//  NativeToRN.m
//  NewDemo
//
//  Created by hu ping kang on 2018/7/21.
//  Copyright © 2018年 Facebook. All rights reserved.
//
#import "AlertTool.h"
#import "NativeToRN.h"

@implementation NativeToRN
RCT_EXPORT_MODULE();

- (NSArray<NSString *> *)supportedEvents
{
  return @[@"showAlertCallback",@"getQQMessage"];
}

RCT_EXPORT_METHOD(callReactNativeMethod)
{
  [self sendEventWithName:@"showAlertCallback"
                     body:@{
                            @"url": @"https://www.jianshu.com",
                            @"result": @"我是一只小小小小鸟！",
                            }];
}

RCT_EXPORT_METHOD(getQQMessages)
{
  [[NSNotificationCenter defaultCenter]addObserver:self selector:@selector(getQQInfo:) name:@"QQINFO" object:nil];
}

-(void)getQQInfo:(NSNotification *)noti{
  
  NSDictionary * info = noti.userInfo;
  NSString * iconUrl = info[@"iconUrl"];
  NSString * nickName = info[@"nickName"];
  
  [self sendEventWithName:@"getQQMessage"
                     body:@{
                            @"iconUrl": iconUrl?iconUrl:@"",
                            @"nickName":nickName?nickName:@"",
                            }];
}
@end
