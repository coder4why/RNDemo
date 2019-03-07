//
//  RNTestVC.m
//  NewDemo
//
//  Created by hu ping kang on 2018/7/23.
//  Copyright © 2018年 Facebook. All rights reserved.
//
#import <WebKit/WebKit.h>
#import "RNTestVC.h"

@interface RNTestVC ()
@property(nonatomic,strong)WKWebView * webView;
@end

@implementation RNTestVC

-(WKWebView *)webView{
  
  if (!_webView) {
    _webView = [[WKWebView alloc]initWithFrame:self.view.bounds];
    [self.view addSubview:_webView];
  }
  return _webView;
}

-(void)clickBack{
  
  [self.navigationController dismissViewControllerAnimated:YES completion:nil];
  
}

-(void)addBack{
  UIButton * leftBtn = [UIButton buttonWithType:UIButtonTypeCustom];
  leftBtn.frame = CGRectMake(0, 0, 45, 45);
  [leftBtn setTitle:@"back" forState:UIControlStateNormal];
  [leftBtn setTitleColor:[UIColor blueColor] forState:UIControlStateNormal];
  [leftBtn addTarget:self action:@selector(clickBack) forControlEvents:UIControlEventTouchUpInside];
  self.navigationItem.leftBarButtonItem = [[UIBarButtonItem alloc]initWithCustomView:leftBtn];
}

- (void)viewDidLoad {
  [super viewDidLoad];
  self.title = @"我是原生的网页";
  [self addBack];
  self.view.backgroundColor = [UIColor whiteColor];
  [self.webView loadRequest:[NSURLRequest requestWithURL:[NSURL URLWithString:_url]]];
  
}



- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}


@end
