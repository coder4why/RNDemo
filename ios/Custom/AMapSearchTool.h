//
//  AMapSearchTool.h
//  NewDemo
//
//  Created by hu ping kang on 2018/8/31.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import <AMapSearchKit/AMapSearchKit.h>
#import <Foundation/Foundation.h>

@interface AMapSearchTool : AMapSearchAPI<AMapSearchDelegate>

+(instancetype)sharedTool;
-(void)searchNearbyPoi;
-(void)searchPoiWithID:(NSString *)userId;

@property(nonatomic,copy)void(^searchBlock)(NSArray<AMapPOI *> *);

@end
