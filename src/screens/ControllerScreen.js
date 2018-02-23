import React, { Component } from "react";
import { Text, View, StyleSheet, Dimensions } from "react-native";
import { VitalSlider } from "../components/VitalSlider";

import { NearbyAPI } from "react-native-nearby-api";
import {API_KEYS} from '../api'
import {Update_Slider} from '../redux/actions/nearbyActions'

var {width, height} = Dimensions.get('window');
var box_count = 3;
var box_height = height / box_count;

const API_KEY = API_KEYS.nearby;

export default class ControllerScreen extends Component {
  constructor() {
    super();
    this.state = {
      sliderValue: 50,
      message: ""
    };
  }

  static navigationOptions = {
    title: "Controller"
  };

  sliderUpdate(value) {
    this.state.sliderValue = value;
    store.dispatch(Update_Slider(value.toString()))
    // TODO: implement redux action
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.sliders}>
          <VitalSlider
            min={20} 
            max={300} 
            initialValue={70} 
            sliderName="Heart Rate (HR)" />
          <VitalSlider 
            min={60} 
            max={100}
            initialValue={80} 
            sliderName="O2 Sat." />
          <VitalSlider 
            min={0} 
            max={100}
            initialValue={50} 
            sliderName="Blood Pressure (BP)" />
          <VitalSlider 
            min={0} 
            max={50} 
            initialValue={25} 
            sliderName="EtCO2"
            step = {1} />
        </View>
        <View style={styles.patientFace}>
        </View>
      </View>
    );
  }
}

// Define the layout for the controller screen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },
  sliders: {
    flex:0.65
  },
  patientFace: {
    flex: 0.5
  }
})
