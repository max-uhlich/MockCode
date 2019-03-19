import React, { Component } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  StatusBar,
  Alert,
  Platform,
  Dimensions,
  YellowBox
} from 'react-native';
import { Container, Button, Text, Grid, Row, Col } from 'native-base';
import PeerList from '../components/PeerList/PeerList';
import styles from "./styles/selectModeScreenStyle";
import {set_W_H, scale, moderateScale} from "../utils/scaling"
import { NetworkComp } from '../components/network';
import {connect} from 'react-redux';
import Orientation from "react-native-orientation";

class SelectModeScreen extends Component {
  // componentWillMount(){
  //   const initialOrientation = Orientation.getInitialOrientation();
  //   if (initialOrientation == 'PORTRAIT'){
  //     Orientation.lockToPortrait();
  //   } else {
  //     Orientation.lockToPortrait();
  //   }
  // }
  //constructor(props) {
  //  super(props);
  //  this.state = store.getState()
  //  devices = this.state.NearbyApi.devices
  //}

  constructor (props) {
    super(props)
    this.state = {dimensions: undefined}
    this.layoutbool = false
    console.log('constructor')
  }

  componentDidMount(){
    StatusBar.setHidden(false);
    YellowBox.ignoreWarnings(['Setting a timer']);
    Orientation.lockToPortrait();
    console.log('componentDidMount')
  }

  componentWillUnmount() {
    Orientation.unlockAllOrientations();
  }

  static navigationOptions = {
    title: 'SelectModeScreen',
    header: null
  };

  onLayout = event => {
    //This onLayout function was supposed to use measure to get the size of the screen
    //Since the previous developers heavily used Stylesheet.create, it doesnt really help as much as I hoped.
    //Because the Stylesheets are created before we can ever get to measure the screen.
    //Therefore I just settled with using Dimensions as appearing in scaling.js
    console.log('onLayout')
    console.log("layout width: " + event.nativeEvent.layout.width)
    console.log("layout height: " + event.nativeEvent.layout.height)
    if (this.layoutBool) {
      console.log('returning now')
      return // layout was already called
    }
    this.layoutBool = true;

    this.viewRef.measure((x, y, width, height) => {
      console.log("measure width: " + width)
      console.log("measureheight: " + height)

      this.threshold = Math.round(0.48913*height)
      this.spw = (width/this.stepsize)/this.fps;

      //set_W_H(width,height)
      this.setState({ dimensions: { width:width, height:height } })
    })

    //let { width, height } = event.nativeEvent.layout
    //console.log("layout width: " + event.nativeEvent.layout.width)
    //console.log("layout height: " + event.nativeEvent.layout.height)

    return

  }

  render() {
    const {navigate} = this.props.navigation;
    if (this.state.dimensions) {
      console.log('dimensions true')
      console.log('width: ' + this.state.dimensions.width + ' height: ' + this.state.dimensions.height)
      return (
        <Container>
          <NetworkComp />
            <Grid>
              <Col></Col>
              <Col size={7}>
                <Row size={1} style={{alignSelf: 'center'}}>
                  <Text style={[{fontSize: moderateScale(50), marginTop: 10}, styles.menuText]}> Mock Code </Text>
                </Row>
                <Row size={0.6}>
                  <Col>
                  <Text style={[{fontSize: moderateScale(30)}, styles.menuText]}> Choose Interface </Text>
                  <View style={styles.horizontalRuler}/>
                  </Col>
                </Row>
                <Row size={2}>
                  <Col style={{justifyContent: 'space-around'}}>
                    <Button bordered style={styles.screenNavButton} block onPress={() => {Orientation.lockToLandscape(); navigate('ControllerScreen')}}>
                      <Text> Controller </Text>
                    </Button>
                    <Button bordered style={styles.screenNavButton} block onPress={() => {Orientation.lockToLandscape(); navigate('MonitorScreen')}}>
                      <Text> Monitor </Text>
                    </Button>
                    <Button bordered style={styles.screenNavButton} block onPress={() => navigate('PatientScreen')}>
                      <Text> Patient Face </Text>
                  </Button>
                  </Col>
                </Row>
                <Row size={0.6}>
                  <Col>
                    <Text style={[{fontSize: moderateScale(30)}, styles.menuText]}> Nearby </Text>
                    <View style={styles.horizontalRuler}/>                                         
                  </Col>
                </Row>
                <Row size={3} style={{alignSelf: 'center', paddingHorizontal: '10%'}}>
                <PeerList devices={this.props.devices}/>
                  </Row>
              </Col>
              <Col></Col>
            </Grid>
        </Container>
      );
    } else {
      console.log('dimensions false')
      return (<View style={{ flex: 1, alignSelf: 'stretch' }} ref={ref => this.viewRef = ref} onLayout={this.onLayout}/>);
    }
  };
}

const mapStateToProps = (state) => {
  return {
    devices:state.NearbyApi.devices
  }
}

export default connect(mapStateToProps)(SelectModeScreen);