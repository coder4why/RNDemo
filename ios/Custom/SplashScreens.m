//
//  SplashScreens.m
//  NewDemo
//
//  Created by hu ping kang on 2018/8/8.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import "SplashScreens.h"

static bool waiting = true;
@implementation SplashScreens
- (dispatch_queue_t)methodQueue{
  return dispatch_get_main_queue();
}
RCT_EXPORT_MODULE()
+ (void)show {
  while (waiting) {
    NSDate* later = [NSDate dateWithTimeIntervalSinceNow:0.1]; [[NSRunLoop mainRunLoop] runUntilDate:later];
  }
  
}
RCT_EXPORT_METHOD(hide)
{
  dispatch_async(dispatch_get_main_queue(), ^{
    waiting = false;
  });
}

@end
