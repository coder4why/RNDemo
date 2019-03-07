//
//  RNTMapManager.m
//  NewDemo
//
//  Created by hu ping kang on 2018/8/3.
//  Copyright © 2018年 Facebook. All rights reserved.
//
#import <MapKit/MapKit.h>
#import <AMapLocationKit/AMapLocationKit.h>
#import "RNTMapManager.h"

@interface RNTMapManager ()<MKMapViewDelegate>
@end

@implementation RNTMapManager
RCT_EXPORT_MODULE()
RCT_EXPORT_VIEW_PROPERTY(showsUserLocation, BOOL);

- (UIView *)view
{
  MKMapView * mapView = [[MKMapView alloc]init];
  [mapView setUserTrackingMode:MKUserTrackingModeFollow];
  mapView.delegate = self;
  return mapView;
  
}

#pragma mark - MKMapViewDelegate
- (void)mapView:(MKMapView *)mapView didUpdateUserLocation:(MKUserLocation *)userLocation
{
  // 位置发生变化调用
  [mapView setCenterCoordinate:userLocation.coordinate animated:YES];
  [mapView setRegion:MKCoordinateRegionMake(userLocation.coordinate, MKCoordinateSpanMake(0.02, 0.02)) animated:YES];
}

@end

@implementation RCTConvert(MapKit)

@end
