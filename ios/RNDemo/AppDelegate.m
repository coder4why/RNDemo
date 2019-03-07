/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import <ShareSDKConnector/ShareSDKConnector.h>
#import <ShareSDK/ShareSDK.h>
#import "WXApi.h"
#import "WeiboSDK.h"
#import <TencentOpenAPI/TencentOAuth.h>
#import <TencentOpenAPI/QQApiInterface.h>

#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>

#import <AMapFoundationKit/AMapFoundationKit.h>
#import <AMapSearchKit/AMapSearchKit.h>
#import "AMapSearchTool.h"
#import <AVKit/AVKit.h>

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  
  UIApplication.sharedApplication.statusBarStyle = UIStatusBarStyleLightContent;
  CGFloat height = UIApplication.sharedApplication.statusBarFrame.size.height;
  NSLog(@"%.0lf",height);
  
  [AMapServices sharedServices].apiKey = @"4c2f71f4dc25b594a2a1f75990af3f41";
  [self registerShareSDK];
  
  [[AVAudioSession sharedInstance] setCategory:AVAudioSessionCategoryAmbient error:nil];
  
  NSURL *jsCodeLocation;

  jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];

  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"RNDemo"
                                               initialProperties:nil
                                                   launchOptions:launchOptions];
  rootView.backgroundColor = [UIColor whiteColor];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  self.window.backgroundColor = UIColor.whiteColor;
  [self.window makeKeyAndVisible];
  return YES;
}

- (void)registerShareSDK{
  
  [ShareSDK registerActivePlatforms:@[
                                      @(SSDKPlatformTypeWechat),
                                      
                                      @(SSDKPlatformTypeQQ),
                                      @(SSDKPlatformTypeSinaWeibo),
                                      ]
                           onImport:^(SSDKPlatformType platformType)
   {
     switch (platformType)
     {
       case SSDKPlatformTypeWechat:
         [ShareSDKConnector connectWeChat:[WXApi class]];
         break;
       case SSDKPlatformTypeQQ:
         [ShareSDKConnector connectQQ:[QQApiInterface class] tencentOAuthClass:[TencentOAuth class]];
         break;
         
       case SSDKPlatformTypeSinaWeibo:
         [ShareSDKConnector connectWeibo:[WeiboSDK class]];
         break;
         
       default:
         break;
     }
   }
                    onConfiguration:^(SSDKPlatformType platformType, NSMutableDictionary *appInfo)
   {
     
     switch (platformType)
     {
         
       case SSDKPlatformTypeWechat:
         [appInfo SSDKSetupWeChatByAppId:@"wx2488373166f43e1b"
                               appSecret:@"1747e9231732d102f8b9a88aca287a15"];
         break;
       case SSDKPlatformTypeQQ:
         [appInfo SSDKSetupQQByAppId:@"1107046662"
                              appKey:@"81dSqg95gfGxByz9"
                            authType:SSDKAuthTypeBoth];
         break;
         
       case SSDKPlatformTypeSinaWeibo:
         //设置新浪微博应用信息,其中authType设置为使用SSO＋Web形式授权
         [appInfo SSDKSetupSinaWeiboByAppKey:@"4233570974"
                                   appSecret:@"b0763ea826e04d51632f4da1a3fb7cd4"
                                 redirectUri:@"https://www.baidu.com"
                                    authType:SSDKAuthTypeBoth];
         break;
         
       default:
         break;
     }
   }];
  
}
@end
