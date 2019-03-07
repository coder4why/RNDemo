//
//  QQInfo.m
//  NewDemo
//
//  Created by hu ping kang on 2018/7/29.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import "QQInfoMessages.h"

@implementation QQInfoMessages
RCT_EXPORT_MODULE();
- (NSArray<NSString *> *)supportedEvents
{
  return @[@"getQQMessage"];
}

RCT_EXPORT_METHOD(getQQMessages)
{
  [[NSNotificationCenter defaultCenter]addObserver:self selector:@selector(getQQInfo:) name:@"QQINFO" object:nil];
}

-(void)getQQInfo:(NSNotification *)noti{
  
  NSDictionary * info = noti.userInfo;
  NSString * iconUrl = info[@"icon"];
  NSString * nickName = info[@"nickName"];
  
  NSLog(@"");
  [self sendEventWithName:@"getQQMessage"
                     body:@{
                            @"iconUrl": iconUrl,
                            @"nickName":nickName,
                            }];
}

@end
