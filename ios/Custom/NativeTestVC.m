//
//  NativeTestVC.m
//  NewDemo
//
//  Created by hu ping kang on 2018/7/23.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import "NativeTestVC.h"

@interface NativeTestVC ()
@property(nonatomic,strong)UILabel * textLabel;
@end

@implementation NativeTestVC

-(UILabel *)textLabel{
  
  if (!_textLabel) {
    _textLabel = [[UILabel alloc]initWithFrame:self.view.bounds];
    _textLabel.textColor = [UIColor redColor];
    _textLabel.font = [UIFont systemFontOfSize:20.0];
    _textLabel.textAlignment = NSTextAlignmentCenter;
    _textLabel.numberOfLines = 0;
    [self.view addSubview:_textLabel];
  }
  return _textLabel;
  
}

-(void)addBack{
  UIButton * leftBtn = [UIButton buttonWithType:UIButtonTypeCustom];
  leftBtn.frame = CGRectMake(0, 0, 45, 45);
  [leftBtn setTitle:@"back" forState:UIControlStateNormal];
  [leftBtn setTitleColor:[UIColor blueColor] forState:UIControlStateNormal];
  [leftBtn addTarget:self action:@selector(clickBack) forControlEvents:UIControlEventTouchUpInside];
  self.navigationItem.leftBarButtonItem = [[UIBarButtonItem alloc]initWithCustomView:leftBtn];
}

-(void)clickBack{
  
  [self.navigationController dismissViewControllerAnimated:YES completion:nil];
  
}

- (void)viewDidLoad {
    [super viewDidLoad];
    [self addBack];
    self.textLabel.text = self.paramas;
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}


@end
