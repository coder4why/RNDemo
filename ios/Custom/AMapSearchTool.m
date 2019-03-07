//
//  AMapSearchAPI.m
//  NewDemo
//
//  Created by hu ping kang on 2018/8/31.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import "AMapSearchTool.h"

static AMapSearchTool * tool = nil;
@interface AMapSearchTool ()<AMapSearchDelegate,CLLocationManagerDelegate>{
  AMapSearchAPI * _search;
}
@end
@implementation AMapSearchTool

+(instancetype)sharedTool{
  
  static dispatch_once_t once;
  dispatch_once(&once, ^{
    tool = [[self alloc]init];
    AMapSearchAPI * search = [[AMapSearchAPI alloc]init];
    tool->_search = search;
  });
  
  return tool;
  
}

-(void)startSearch{
  
  AMapPOIAroundSearchRequest *request = [[AMapPOIAroundSearchRequest alloc] init];
  request.keywords = @"美食";
  request.city = @"上海";
  request.offset = 50;
  request.requireExtension = YES;
  request.requireSubPOIs = YES;
  request.radius = 10000;
  request.location = [AMapGeoPoint locationWithLatitude:31.174797 longitude:121.418089];
  _search.delegate = self;
  [_search AMapPOIAroundSearch:request];
  
}

-(void)searchPoiWithID:(NSString *)userId{
  AMapPOIIDSearchRequest * request = [[AMapPOIIDSearchRequest alloc]init];
  request.uid = userId;
  _search.delegate = self;
  [_search AMapPOIIDSearch:request];
}

-(void)searchNearbyPoi{
  
  [self initLocation];
  
}

#pragma mark 初始化定位
-(void)initLocation {
  
  if([CLLocationManager locationServicesEnabled]){
    
    [self startSearch];
    
  }else{
    
    CLLocationManager * locationManager = [[CLLocationManager alloc] init];
    locationManager.delegate = self;
    
    if([[[UIDevice currentDevice] systemVersion] floatValue] >= 8.0){
      
      [locationManager requestWhenInUseAuthorization];
      
    }
    if([locationManager respondsToSelector:@selector(requestAlwaysAuthorization)]) {
      [locationManager requestAlwaysAuthorization]; // 永久授权
      [locationManager requestWhenInUseAuthorization]; //使用中授权
    }
  }
  
}

#pragma mark -- CLLocationManagerDelegate
-(void)locationManager:(CLLocationManager *)manager didChangeAuthorizationStatus:(CLAuthorizationStatus)status{
  
  if (status == kCLAuthorizationStatusAuthorizedAlways || status == kCLAuthorizationStatusAuthorizedWhenInUse) {
    
    [self startSearch];
    
  }
  
}

#pragma mark -- AMapSearchDelegate
- (void)onPOISearchDone:(AMapPOISearchBaseRequest *)request response:(AMapPOISearchResponse *)response{
  
  if (self.searchBlock) {
    self.searchBlock(response.pois);
  }
  
}
- (void)AMapSearchRequest:(id)request didFailWithError:(NSError *)error{
  NSLog(@"%@",error.description);
}

@end
