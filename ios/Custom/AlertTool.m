//
//  AlertTool.m
//  NewDemo
//
//  Created by hu ping kang on 2018/7/20.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "AlertTool.h"

@implementation AlertTool

+(void)alertMessage:(NSString *)alertMessage{
  
  UIAlertController * alert = [UIAlertController alertControllerWithTitle:@"Message" message:alertMessage preferredStyle:UIAlertControllerStyleAlert];
  UIAlertAction * cancel = [UIAlertAction actionWithTitle:@"Cancel" style:UIAlertActionStyleCancel handler:^(UIAlertAction * _Nonnull action) {
    
  }];
  [alert addAction:cancel];
  [[UIApplication sharedApplication].keyWindow.rootViewController presentViewController:alert animated:YES completion:nil];
  
}

@end
