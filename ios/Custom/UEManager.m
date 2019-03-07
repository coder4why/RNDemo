//
//  UEManager.m
//  NewDemo
//
//  Created by hu ping kang on 2018/7/20.
//  Copyright © 2018年 Facebook. All rights reserved.
//
#import "ShareView.h"
#import <AVKit/AVKit.h>
#import <ShareSDK/ShareSDK.h>
#import <ShareSDKExtension/SSEThirdPartyLoginHelper.h>
#import "AlertTool.h"
#import "UEManager.h"
#import "RNTestVC.h"
#import <MapKit/MapKit.h>
#import "AMapSearchTool.h"
#import <AMapLocationKit/AMapLocationKit.h>
#import "RNDemo-Swift.h"

@interface UEManager ()<AMapSearchDelegate,AMapLocationManagerDelegate>
@property(nonatomic,copy)RCTResponseSenderBlock reGeoBlock;
@property(nonatomic,strong)AMapSearchAPI * searchApi;
@property (nonatomic, strong) AMapLocationManager *locationManager;

@end

@implementation UEManager
static BOOL waiting = true;
- (dispatch_queue_t)methodQueue{
  
  return dispatch_get_main_queue();
  
}

-(AMapSearchAPI *)searchApi{
  
  if (!_searchApi) {
    _searchApi = [[AMapSearchAPI alloc]init];
    _searchApi.delegate = self;
  }
  return _searchApi;
  
}
RCT_EXPORT_MODULE();
RCT_EXPORT_METHOD(requestLocation){
  
}
+ (void)show {
  
  while (waiting) {
    
    NSDate* later = [NSDate dateWithTimeIntervalSinceNow:0.1];
    
    [[NSRunLoop mainRunLoop] runUntilDate:later];
    
  }
  
}

RCT_EXPORT_METHOD(hide) {
  
  dispatch_async(dispatch_get_main_queue(),
                 
                 ^{
                   
                   waiting = false;
                   
                 });
  
}

RCT_EXPORT_METHOD(takePhotos){
  
  if ([UIImagePickerController isCameraDeviceAvailable:UIImagePickerControllerCameraDeviceRear]) {
      dispatch_async(dispatch_get_main_queue(), ^{
        UIImagePickerController * picker = [[UIImagePickerController alloc]init];
        picker.sourceType = UIImagePickerControllerSourceTypeCamera;
        UIViewController * vc = [UIApplication sharedApplication].keyWindow.rootViewController;
        [vc presentViewController:picker animated:YES completion:nil];
        
      });
  }else{
    [AlertTool alertMessage:@"当前设备不支持拍照"];
  }
  
}

RCT_EXPORT_METHOD(searchNearbyPoiCallback:(RCTResponseSenderBlock)callback){
  
  dispatch_async(dispatch_get_main_queue(), ^{
      [AMapSearchTool.sharedTool searchNearbyPoi];
      AMapSearchTool.sharedTool.searchBlock = ^(NSArray<AMapPOI *> *pois) {
        
        NSMutableArray * array = [NSMutableArray array];
        for (AMapPOI * poi in pois) {
          NSDictionary * dix = @{
                                 @"name":poi.name,
                                 @"address":poi.address,
                                 @"distance":@(poi.distance),
                                 @"uid":poi.uid,
                                 };
          [array addObject:dix];
          
        }
       
        callback(@[array]);
      };
  });
  
}

RCT_EXPORT_METHOD(searchPoiUid:(NSString *)uid callback:(RCTResponseSenderBlock)callback){
  
  dispatch_async(dispatch_get_main_queue(), ^{
    
    [AMapSearchTool.sharedTool searchPoiWithID:uid];
    AMapSearchTool.sharedTool.searchBlock = ^(NSArray<AMapPOI *> *pois) {
      
      NSMutableArray * array = [NSMutableArray array];
      for (AMapPOI * poi in pois) {
        NSDictionary * dix = @{
                               @"images":poi.images?poi.images:@[],
                               @"extensionInfo":poi.extensionInfo?poi.extensionInfo:@"",
                               };
        
        [array addObject:dix];
        
      }
      
      callback(@[array]);
    };
  });
  
}




// 接收传过来的 NSString
RCT_EXPORT_METHOD(addEventOne:(NSString *)url){
  NSLog(@"接收传过来的NSString+NSString: %@", url);
  dispatch_async(dispatch_get_main_queue(), ^{
    RNTestVC * vc = [[RNTestVC alloc]init];
    vc.url = url;
    UINavigationController * nav = [[UINavigationController alloc]initWithRootViewController:vc];
    [UIApplication.sharedApplication.keyWindow.rootViewController presentViewController:nav animated:YES completion:nil];
  });
 
}

// weixi
RCT_EXPORT_METHOD(shareToWX:(NSString *)url){
  NSLog(@"接收传过来的NSString+NSString: %@", url);
  dispatch_async(dispatch_get_main_queue(), ^{
    [self shareMsgInfo:url platform:SSDKPlatformSubTypeWechatTimeline success:^{
      [AlertTool alertMessage:@"微信分享成功"];
    } fail:^{
      [AlertTool alertMessage:@"微信分享失败"];
    }];
  });
  
}
// 接收传过来的 NSString
RCT_EXPORT_METHOD(shareMsg:(NSString *)url){
  NSLog(@"%@",url);
  dispatch_async(dispatch_get_main_queue(), ^{
    ShareView * share = [[ShareView alloc]initWithShareProTitle:@"分享到"];
    share.btnClick = ^(NSInteger index) {
      SSDKPlatformType plat = [self getTypeIndex:index];
      [self shareMsgInfo:url platform:plat success:^{
        [AlertTool alertMessage:@"分享成功"];
      } fail:^{
        [AlertTool alertMessage:@"分享成功"];
      }];
    };
    [[UIApplication sharedApplication].keyWindow addSubview:share];
  });
  
}
-(SSDKPlatformType)getTypeIndex:(NSInteger)index{
  switch (index) {
    case 0:
      return SSDKPlatformSubTypeWechatSession;
      break;
    case 1:
      return SSDKPlatformSubTypeWechatTimeline;
      break;
    case 2:
      return SSDKPlatformSubTypeQQFriend;
      break;
    case 3:
      return SSDKPlatformSubTypeQZone;
      break;
    case 4:
      return SSDKPlatformTypeSinaWeibo;
      break;
  }
  return SSDKPlatformSubTypeWechatSession;
}
// 接收传过来的 NSString
RCT_EXPORT_METHOD(shareToQQ:(NSString *)url){
  NSLog(@"接收传过来的NSString+NSString: %@", url);
  dispatch_async(dispatch_get_main_queue(), ^{
    [self shareMsgInfo:url platform:SSDKPlatformTypeQQ success:^{
      [AlertTool alertMessage:@"QQ分享成功"];
    } fail:^{
      [AlertTool alertMessage:@"QQ分享失败"];
    }];
  });
  
}

//直接分享：
-(void)shareMsgInfo:(NSString *)url platform:(SSDKPlatformType)platform success:(void(^)(void))success fail:(void(^)(void))fail{
  //1、创建分享参数
  NSMutableDictionary *shareParams = [NSMutableDictionary dictionary];
  [shareParams SSDKSetupShareParamsByText:@"哈哈哈哈"
                                   images:@[@"http://pic18.photophoto.cn/20110303/0005018648138412_b.jpg"]
                                      url:[NSURL URLWithString:url]
                                    title:@"RN Share"
                                     type:SSDKContentTypeAuto];
  [ShareSDK share:platform parameters:shareParams onStateChanged:^(SSDKResponseState state, NSDictionary *userData, SSDKContentEntity *contentEntity, NSError *error) {
    
    switch (state) {
      case SSDKResponseStateSuccess:
        NSLog(@"分享成功");
        success();
        break;
      case SSDKResponseStateFail:
        NSLog(@"分享失败");
        fail();
        break;
      case SSDKResponseStateCancel:
        NSLog(@"用户取消");
        fail();
        break;
      default:
        break;
    }
  }];
  
}

//
RCT_EXPORT_METHOD(getQQInfo){
  dispatch_async(dispatch_get_main_queue(), ^{
    [self getUserInfoSuccess:^(NSArray *array) {
      [[NSNotificationCenter defaultCenter]postNotificationName:@"QQINFO" object:nil userInfo:@{@"iconUrl":array.firstObject,@"nickName":array.lastObject}];
    } fail:^{
      [AlertTool alertMessage:@"授权失败"];
    }];
  });
  
}
-(void)getUserInfoSuccess:(void(^)(NSArray *))success fail:(void(^)())fail{
  
  [SSEThirdPartyLoginHelper loginByPlatform:SSDKPlatformTypeQQ
                                 onUserSync:^(SSDKUser *user, SSEUserAssociateHandler associateHandler) {
                                   associateHandler (user.uid, user, user);
                                   //授权或者登录成功了，才会回调到这里；
                                   success(@[user.icon,user.nickname]);
                                 }
                              onLoginResult:^(SSDKResponseState state, SSEBaseUser *user, NSError *error) {
                                
                                if (state != SSDKResponseStateSuccess)
                                {
                                  fail(@{});
                                }
                              }];

}
//计算文本的高度：
//RCTResponseSenderBlock: 接收多个参数的回调函数
//RCTResponseErrorBlock:  接收错误参数的回调函数
//RCTPromiseRejectBlock:  处理Promise Reject
//RCTPromiseResolveBlock: 处理Promise Resolve
RCT_EXPORT_METHOD(getTextHeight:(NSString *)text callback:(RCTResponseSenderBlock)callback){
  //
  CGFloat height = [self calculateRowHeight:text];
  NSLog(@"%@--%.0f",text,height);
  
  callback(@[@(height)]);
  
}

-(void)testSwift{
  [SoloManager rnSwiftTestWithString:@"我是用Swift来实现的OC-RN交互插件" callBack:^(NSString * _Nonnull str) {
      NSLog(@"%@",str);
  }];
}

/**
 @method 获取指定宽度情况ixa，字符串value的高度
 @param value 待计算的字符串
 @param fontSize 字体的大小
 @param andWidth 限制字符串显示区域的宽度
 @result float 返回的高度
 */
- (CGFloat)calculateRowHeight:(NSString *)string{
  NSDictionary *dic = @{NSFontAttributeName:[UIFont systemFontOfSize:17.0f]};//指定字号
  CGRect rect = [string boundingRectWithSize:CGSizeMake([[UIScreen mainScreen]bounds].size.width - 20, 0)/*计算高度要先指定宽度*/ options:NSStringDrawingUsesLineFragmentOrigin |
                 NSStringDrawingUsesFontLeading attributes:dic context:nil];
  return rect.size.height;
}
//高德地图
RCT_EXPORT_METHOD(getLocationCallback:(RCTResponseSenderBlock)callback){
  
  [self testSwift];
  self.locationManager = [[AMapLocationManager alloc] init];
  [self.locationManager setDelegate:self];
  //设置期望定位精度
  [self.locationManager setDesiredAccuracy:kCLLocationAccuracyHundredMeters];
  //设置不允许系统暂停定位
  [self.locationManager setPausesLocationUpdatesAutomatically:NO];
  //设置定位超时时间
  [self.locationManager setLocationTimeout:10];
  //设置逆地理超时时间
  [self.locationManager setReGeocodeTimeout:5];
  //进行单次定位请求
  __weak typeof(self)wSelf = self;
  [self.locationManager requestLocationWithReGeocode:NO completionBlock:^(CLLocation *location, AMapLocationReGeocode *regeocode, NSError *error) {
    [wSelf reverseGeoLocation:location callback:callback];
  }];
  
}

//高德地图逆地址解析
RCT_EXPORT_METHOD(reverseGeoLocation:(CLLocation *)location callback:(RCTResponseSenderBlock)callback){
  
  self.reGeoBlock = callback;
  AMapReGeocodeSearchRequest *regeo = [[AMapReGeocodeSearchRequest alloc] init];
  regeo.location = [AMapGeoPoint locationWithLatitude:location.coordinate.latitude longitude:location.coordinate.longitude];
  
  regeo.requireExtension =YES;
  regeo.radius = 100;
  self.searchApi.delegate = self;
  [self.searchApi AMapReGoecodeSearch:regeo];
  
}

#pragma mark - AMapSearchDelegate
- (void)onReGeocodeSearchDone:(AMapReGeocodeSearchRequest *)request response:(AMapReGeocodeSearchResponse *)response
{
  if(response.regeocode != nil)
  {
    //通过AMapReGeocodeSearchResponse对象处理搜索结果
    NSString * address = [NSString stringWithFormat:@"%@%@%@%@",response.regeocode.addressComponent.city,response.regeocode.addressComponent.district,response.regeocode.addressComponent.streetNumber.street,response.regeocode.addressComponent.streetNumber.number];
    NSLog(@"%@",address);
    self.reGeoBlock(@[address]);
    
  }
}
- (void)AMapSearchRequest:(id)request didFailWithError:(NSError *)error{
  
  NSLog(@"%@",error.description);
  
}
const double a = 6378245.0;
const double ee = 0.00669342162296594323;

+ (BOOL)outOfChina:(CLLocation *)location {
  if (location.coordinate.longitude < 72.004 || location.coordinate.longitude > 137.8347) {
    return YES;
  }
  if (location.coordinate.latitude < 0.8293 || location.coordinate.latitude > 55.8271) {
    return YES;
  }
  return NO;
}

+ (double)transformLatWithX:(double)x y:(double)y {
  double ret = -100.0 + 2.0 * x + 3.0 * y + 0.2 * y * y + 0.1 * x * y + 0.2 * sqrt(fabs(x));
  ret += (20.0 * sin(6.0 * x * M_PI) + 20.0 * sin(2.0 * x * M_PI)) * 2.0 / 3.0;
  ret += (20.0 * sin(y * M_PI) + 40.0 * sin(y / 3.0 * M_PI)) * 2.0 / 3.0;
  ret += (160.0 * sin(y / 12.0 * M_PI) + 320 * sin(y * M_PI / 30.0)) * 2.0 / 3.0;
  return ret;
}

+ (double)transformLonWithX:(double)x y:(double)y {
  double ret = 300.0 + x + 2.0 * y + 0.1 * x * x + 0.1 * x * y + 0.1 * sqrt(fabs(x));
  ret += (20.0 * sin(6.0 * x * M_PI) + 20.0 * sin(2.0 * x * M_PI)) * 2.0 / 3.0;
  ret += (20.0 * sin(x * M_PI) + 40.0 * sin(x / 3.0 * M_PI)) * 2.0 / 3.0;
  ret += (150.0 * sin(x / 12.0 * M_PI) + 300.0 * sin(x / 30.0 * M_PI)) * 2.0 / 3.0;
  return ret;
}
+ (CLLocation *)transformToMars:(CLLocation *)location {
  //是否在中国大陆之外
  if ([[self class] outOfChina:location]) {
    return location;
  }
  double dLat = [self transformLatWithX:location.coordinate.longitude - 105.0 y:location.coordinate.latitude - 35.0];
  double dLon = [self transformLonWithX:location.coordinate.longitude - 105.0 y:location.coordinate.latitude - 35.0];
  double radLat = location.coordinate.latitude / 180.0 * M_PI;
  double magic = sin(radLat);
  magic = 1 - ee * magic * magic;
  double sqrtMagic = sqrt(magic);
  dLat = (dLat * 180.0) / ((a * (1 - ee)) / (magic * sqrtMagic) * M_PI);
  dLon = (dLon * 180.0) / (a / sqrtMagic * cos(radLat) * M_PI);
  return [[CLLocation alloc] initWithLatitude:location.coordinate.latitude + dLat longitude:location.coordinate.longitude + dLon];
}

@end
