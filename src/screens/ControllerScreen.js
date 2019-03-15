import React, { Component } from "react";
import { Text, View, ScrollView } from "react-native";
import {Button} from 'native-base';
import { VitalSlider } from "../components/VitalSlider";
import styles from "./styles/controllerScreenStyle"

import {Update_Value, ACTIONS} from '../redux/actions/nearbyActions'
import FaceButtonList from '../components/FaceButtonList';
import { moderateScale } from "../utils/scaling";
import {BLOOD_PRESSURE_LEVELS, WAVE_FORMS} from '../utils/constants';
import Orientation from "react-native-orientation";

export default class ControllerScreen extends Component {
  constructor() {
    super();
    this._compressionsChange = this._compressionsChange.bind(this);
    this.state = store.getState();
    this.switchVals = this.state.SwitchVals;
  }

  static navigationOptions = {
    title: "Controller",
    header: null
  };

  componentDidMount(){
    //Orientation.lockToLandscape();
  }

  componentWillUnmount() {
    Orientation.lockToPortrait();
    //Orientation.unlockAllOrientations();
  }

  switchCallback = (value) => {
    let pos = parseInt(value.charAt(0))
    let val = value.charAt(1)
    console.log("updating switchvals ("+this.switchVals+")"+ " at position: " + pos + " " + "to: " + val)

    let pre = this.switchVals.slice(0, pos)
    let post = this.switchVals.slice(pos+1)

    console.log("updating pre+val+post: " + pre+val+post)
    //this.setState({SwitchVals: pre+val+post})
    this.switchVals = pre+val+post
    store.dispatch(Update_Value(ACTIONS.UPDATE_SWITCHVALS, pre+val+post));
  }

  waveformCallback = (value) => {
    store.dispatch(Update_Value(ACTIONS.UPDATE_WAVEFORM, value));
    this.setState({Waveform: value});

    if (value===WAVE_FORMS.VTF || value===WAVE_FORMS.PEA){
      store.dispatch(Update_Value(ACTIONS.UPDATE_SWITCHVALS, '0000'));
      this.switchVals = '0000'
    } else if (value===WAVE_FORMS.NSR){
      store.dispatch(Update_Value(ACTIONS.UPDATE_SWITCHVALS, '1111'));
      this.switchVals = '1111'
    }
  }

  _compressionsChange() {
    if(this.state.Waveform === "Compressions In-Progress"){
      this.setState({Waveform: WAVE_FORMS.NSR})
      store.dispatch(Update_Value(ACTIONS.UPDATE_WAVEFORM, WAVE_FORMS.NSR));
      store.dispatch(Update_Value(ACTIONS.UPDATE_SWITCHVALS, '1111'));
      this.switchVals = '1111'
    } else {
      this.setState({Waveform: WAVE_FORMS.CIP});
      store.dispatch(Update_Value(ACTIONS.UPDATE_WAVEFORM, WAVE_FORMS.CIP));
      store.dispatch(Update_Value(ACTIONS.UPDATE_SWITCHVALS, '0000'));
      this.switchVals = '0000'
    }

  }

  _renderCompressionsInProgress(){
    if(this.state.Waveform === "Compressions In-Progress"){
      return(
        <Button block rounded info style={{marginTop: '2%', width: '70%', alignSelf: 'center'}}
          onPress={() => this._compressionsChange()}>
          <Text style={{fontWeight: 'bold', fontSize: moderateScale(15)}}>Compressions In-Progress</Text>
        </Button>
      )
    } else {
      return(
        <Button block rounded light style={{marginTop: '2%', width: '70%', alignSelf: 'center'}}
          onPress={() => this._compressionsChange()}>
          <Text style={{fontWeight: 'bold', fontSize: moderateScale(15), opacity: 0.15}}>Compressions In-Progress</Text>
        </Button>
      )
    }
  }

  render() {
    console.log('RENDER CONTROLLERSCREEN')
    return (
      <View style={styles.container}>
        <View>
        {this._renderCompressionsInProgress()}
        </View>
        <View style={styles.sliders}>
          <VitalSlider
            min={20} 
            max={300} 
            initialValue={this.state.HeartRate}
            switchVal={this.state.SwitchVals.charAt(0)}
            switchCallback={this.switchCallback}
            waveform={this.state.Waveform}
            waveformCallback={this.waveformCallback}
            sliderName="Heart Rate (BPM):"
            actionType={ACTIONS.UPDATE_HEART_RATE}
            style={styles.slider}
            step={1} />
          <VitalSlider
            min={60}
            max={100}
            initialValue={this.state.O2Sat}
            switchVal={this.state.SwitchVals.charAt(1)}
            switchCallback={this.switchCallback}
            waveform={this.state.Waveform}
            sliderName="O2 Saturation %:"
            actionType={ACTIONS.UPDATE_O2SAT}
            style={styles.slider}
            step={1} />
          <VitalSlider
            min={0}
            max={15}
            initialValue={BLOOD_PRESSURE_LEVELS.indexOf(this.state.bloodPressure)}
            switchVal={this.state.SwitchVals.charAt(2)}
            switchCallback={this.switchCallback}
            waveform={this.state.Waveform}
            sliderName="Blood Pressure:"
            actionType={ACTIONS.UPDATE_BLOOD_PRESSURE}
            bpLevels = {BLOOD_PRESSURE_LEVELS}
            style={styles.slider}
            step={1} />
          <VitalSlider
            min={0}
            max={50}
            initialValue={this.state.EtC02}
            switchVal={this.state.SwitchVals.charAt(3)}
            switchCallback={this.switchCallback}
            waveform={this.state.Waveform}
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
