import React, { Component } from 'react';

import {
  Button,
  Image,
  StyleSheet,
  View,
  TouchableOpacity
} from 'react-native';
import Video from 'react-native-video';
import { connect, Provider } from "react-redux";
import { NearbyAPI } from "react-native-nearby-api";
//import Orientation from "react-native-orientation";

import PropTypes from 'prop-types';

const faces = {
  normal: require('../components/vid/Portrait1a2.mp4'),
  dead: require('../components/vid/Portrait1b1.mp4'),
  discomfort: require('../components/vid/Portrait3b2.mp4'),
};

export const faceNames = {
  normal: 'Portrait-1a2',
  dead: 'Portrait-1b1',
  discomfort: 'Portrait-3b2',
};

class PatientScreen extends Component {
  static navigationOptions = {
    title: 'Patient',
    header: null
  }

  constructor() {
    super();
    this.state = {showBack: false};
  }

  componentDidMount(){
    //Orientation.lockToPortrait();
  }

  componentWillUnmount() {
    //Orientation.lockToPortrait();
    //Orientation.unlockAllOrientations();
  }

  // This conditionally renders a floating overlay back button
  // https://stackoverflow.com/a/30268190/2379240
  _renderBack() {
    const {goBack} = this.props.navigation;
    if (this.state.showBack) {
      return (
        <View style={styles.backButton}>
          <Button
            title='Exit'
            onPress={()=>{goBack()}}
          />
        </View>
      );
    }
    else {
      return null;
    }
  }

  _toggleBack() {
    this.setState(previousState => {
      previousState.showBack = !previousState.showBack;
      return previousState;
    });
  }

  render() {
    return (
      <TouchableOpacity
        onPress={() => this._toggleBack()}
        style={styles.container}
        activeOpacity={1}
      >
        <Video
          source={faces[this.props.face]}
          repeat={true}
          paused={false}
          resizeMode='stretch'
          style={styles.video}
          muted={false}
        />
        {this._renderBack()}
      </TouchableOpacity>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    face: state.face
  }
}

// This default is actually exporting PatientScreen
export default connect(mapStateToProps)(PatientScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  video: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
    width: undefined,
    height: undefined,
  },
  backButton: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
  }
});
