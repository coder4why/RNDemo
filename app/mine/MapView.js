// MapView.js
import PropTypes from "prop-types";
import React, { Component } from 'react';
import { requireNativeComponent } from "react-native";
var RNTMap = requireNativeComponent("RNTMap", TextLabel);

class TextLabel extends React.Component {
  render() {
    return <RNTMap {...this.props} />;
  }
}
//
TextLabel.propTypes = {
  /**
   * A Boolean value that determines whether the user may use pinch
   * gestures to zoom in and out of the map.
   */
   showsUserLocation:PropTypes.bool,
   showCps:PropTypes.bool,
  // text:PropTypes.string,
  // backgroundColor: PropTypes.object,
  // textColor: PropTypes.object,

};


export default TextLabel;
