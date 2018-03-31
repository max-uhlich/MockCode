import React, { Component } from "react";
import { Text, View, ScrollView } from "react-native";
import {Button} from 'native-base';
import { VitalSlider } from "../components/VitalSlider";
import styles from "./styles/controllerScreenStyle"

import { NearbyAPI } from "react-native-nearby-api";
import {API_KEYS} from '../api'
import {Update_Slider, Update_Value, ACTIONS} from '../redux/actions/nearbyActions'
import { NetworkComp } from '../components/network';
import FaceButton from '../components/FaceButton';
import FaceButtonList from '../components/FaceButtonList';

const API_KEY = API_KEYS.nearby;

const BLOOD_PRESSURE_LEVELS = ["62/40", "68/42", "76/46" , "88/50", "92/52", "98/54", "102/56",
                             "108/58", "112/60", "120/78", "134/82", "144/88", "164/96",
                             "192/98", "242/112", "284/122"];


export default class ControllerScreen extends Component {
  constructor() {
    super();
    this.state = store.getState();
  }

  static navigationOptions = {
    title: "Controller"
  };

  render() {
    return (
      <View style={styles.container}>
        <NetworkComp/>
        <View style={styles.sliders}>
          <VitalSlider
            min={20} 
            max={300} 
            initialValue={this.state.HeartRate}
            initialWaveForm={this.state.Waveform} 
            sliderName="Heart Rate (BPM):"
            actionType={ACTIONS.UPDATE_HEART_RATE}
            style={styles.slider}
            step={1} />
          <VitalSlider
            min={60}
            max={100}
            initialValue={80}
            initialValue={this.state.O2Sat} 
            sliderName="O2 Saturation %:"
            actionType={ACTIONS.UPDATE_O2SAT}
            style={styles.slider}
            step={1} />
          <VitalSlider
            min={0}
            max={15}
            initialValue={8}
            initialValue={BLOOD_PRESSURE_LEVELS.indexOf(this.state.bloodPressure)} 
            sliderName="Blood Pressure:"
            actionType={ACTIONS.UPDATE_BLOOD_PRESSURE}
            bpLevels = {BLOOD_PRESSURE_LEVELS}
            style={styles.slider}
            step={1} />
          <VitalSlider
            min={0}
            max={50}
            initialValue={this.state.EtC02} 
            sliderName="EtCO2 (mmHg):"
            actionType={ACTIONS.UPDATE_ETCO2}
            style={styles.slider}
            step = {1} />
        </View>
        <View style={styles.patientFaceControls}>
          <FaceButtonList />
        </View>
      </View>
    );
  }
}
