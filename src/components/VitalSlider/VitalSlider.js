import React, { Component } from "react";
import PropTypes from 'prop-types';
import style from "./style";
import { Text, View, Switch, ScrollView } from "react-native";
import { Update_Value, ACTIONS } from '../../redux/actions/nearbyActions';
import WaveFormCollapsible from './WaveFormCollapsible';
import WaveFormSelector from './WaveFormSelector';
import Slider from "react-native-slider"
import {WAVE_FORMS, NSR_VALUES, BLOOD_PRESSURE_LEVELS} from '../../utils/constants';

export class VitalSlider extends Component {
  constructor(props) {
    super(props);
    this._onSliderChange = this._onSliderChange.bind(this);
    this._onWaveformChange = this._onWaveformChange.bind(this);

    if(this.props.sliderName.indexOf("Heart Rate") !== -1)
      this.position = 0;
    else if(this.props.sliderName.indexOf("O2 Saturation") !== -1)
      this.position = 1;
    else if(this.props.sliderName.indexOf("Blood Pressure") !== -1)
      this.position = 2;
    else if(this.props.sliderName.indexOf("EtCO2") !== -1)
      this.position = 3;

    //console.log("this.props.sliderName: " + this.props.sliderName)
    //console.log("this.position: " + this.position)
    //console.log("props.switchVals: " + props.switchVals)
    //console.log("(props.switchVals.charAt(this.position)==='1'): " + (props.switchVals.charAt(this.position)==='1'))

    this.state = {
      sliderValue: props.initialValue,
      switchValue: (props.switchVal==='1'),
      collapsed: true,
      waveform: props.waveform
    };
  }

  // All vital sliders need to be aware of the current waveform
  // selected, and thus will receive new props of the current
  // waveform selected by the user
  componentWillReceiveProps(newProps) {
    this.setState({waveform: newProps.waveform});
    this._onWaveformChange(newProps.waveform);
  }

  _toggleExpanded = () => {
    this.setState({ collapsed: !this.state.collapsed });
  }

  _onSliderChange = (value) => {
    this.setState({sliderValue: parseInt(value)});
  };

  _onSwitchChange = (value) => {
    this.setState({switchValue: value});

    this.props.switchCallback(this.position+(value?'1':'0'))

    //store.dispatch(Update_Value(ACTIONS.TOGGLE_SWITCHVALS, this.position));

    //console.log("this.state.switchVals: " + this.props.switchVals)
    //console.log("this.state.switchVals.slice(0, this.position): " + this.props.switchVals.slice(0, this.position))
    //console.log("this.state.switchVals.slice(this.position): " + this.props.switchVals.slice(this.position+1))

    //let pre = this.props.switchVals.slice(0, this.position)
    //let post = this.props.switchVals.slice(this.position+1)

    //if (value)
    //  store.dispatch(Update_Value(ACTIONS.UPDATE_SWITCHVALS, pre+'1'+post));
    //else
    //  store.dispatch(Update_Value(ACTIONS.UPDATE_SWITCHVALS, pre+'0'+post));

    /*if (!value){
      //this switch has been disabled, therefore we need to send ---
      if(this.props.actionType === ACTIONS.UPDATE_BLOOD_PRESSURE)
        store.dispatch(Update_Value(this.props.actionType, '-1'));    
    } else {
      //otherwise we need to go back to whatever value was here before.
      if(this.props.actionType === ACTIONS.UPDATE_BLOOD_PRESSURE){
        store.dispatch(Update_Value(this.props.actionType, this.props.bpLevels[this.state.sliderValue]));      
      } else{
        store.dispatch(Update_Value(this.props.actionType, this.state.sliderValue));
      }
    }*/

  }

  _onSlidingComplete = (value) => {
    if(this.props.actionType === ACTIONS.UPDATE_BLOOD_PRESSURE){
      store.dispatch(Update_Value(this.props.actionType, this.props.bpLevels[value]));      
    } else{
      store.dispatch(Update_Value(this.props.actionType, value));
    }
  }

  _onWaveformSelect = (value) => {
    this._toggleExpanded();
    this.props.waveformCallback(value);
  }

  // This method is called when the waveform is changed
  // in the global state of the app.
  _onWaveformChange = (value) => {

    // This is where the handling of which parameters are available
    // for tuning based on the waveform is handled.
    // E.g., NSR allows tuning of all available sliders, whereas
    // VF, PEA/Asystole, and Compr. In-Prog allow only movement of 
    // sliders (parameter values).
    switch(value) {
      case WAVE_FORMS.NSR: // Normal Sinus Rhythm
        this.setState({switchValue: true});
        if(this.props.sliderName.indexOf("Heart Rate") !== -1){
          this.setState({sliderValue: NSR_VALUES.HEART_RATE});
          store.dispatch(Update_Value(ACTIONS.UPDATE_HEART_RATE, NSR_VALUES.HEART_RATE));
        }

        if(this.props.sliderName.indexOf("O2 Saturation") !== -1){
          this.setState({sliderValue: NSR_VALUES.O2_SAT});
          store.dispatch(Update_Value(ACTIONS.UPDATE_O2SAT, NSR_VALUES.O2_SAT));
        }

        if(this.props.sliderName.indexOf("Blood Pressure") !== -1){
          //console.log("BLOOD PRESSURE STATE " + BLOOD_PRESSURE_LEVELS[NSR_VALUES.BP])
          //console.log("BLOOD PRESSURE SLIDER STATE " + NSR_VALUES.BP)
          this.setState({sliderValue: NSR_VALUES.BP});
          store.dispatch(Update_Value(ACTIONS.UPDATE_BLOOD_PRESSURE, BLOOD_PRESSURE_LEVELS[NSR_VALUES.BP]));
        }

        if(this.props.sliderName.indexOf("EtCO2") !== -1){
          this.setState({sliderValue: NSR_VALUES.ET_CO2});
          store.dispatch(Update_Value(ACTIONS.UPDATE_ETCO2, NSR_VALUES.ET_CO2));
        }
        break;
      case WAVE_FORMS.VTC: // Ventricular Tachycardia
        if(this.props.sliderName.indexOf("Heart Rate") !== -1){
          this.setState({sliderValue: 184, switchValue: true});
          this.props.switchCallback(this.position+'1')
          store.dispatch(Update_Value(this.props.actionType, 184));
        }
        break;
      case WAVE_FORMS.VTF: // Ventricular Fibrillation
        this.setState({switchValue: false});
        break;
      case WAVE_FORMS.PEA: // PEA/Asystole
        this.setState({switchValue: false});
        break;
      case WAVE_FORMS.CIP: // Compressions In-Progress
        this.setState({switchValue: false});
        break;
      default:
        throw "ERROR: Waveform change callback, encountered unexpected waveform!"
        break;
    }
  }

  _renderSliderValue() {
    let sliderValue = ""
    if(this.state.switchValue){
      if(this.props.sliderName.indexOf("Blood Pressure") !== -1){
        sliderValue = this.props.bpLevels[this.state.sliderValue];
      } else {
        sliderValue = this.state.sliderValue;
      }
    } else {
      sliderValue = "---";
    }

    return(
      <Text style={style.sliderValueText}> {sliderValue} </Text>
    )


    /*let sliderValue = ""
    if((this.state.waveform === WAVE_FORMS.NSR || this.state.waveform === WAVE_FORMS.VTC) && this.state.switchValue){
      if(this.props.sliderName.indexOf("Blood Pressure") !== -1){
        sliderValue = this.props.bpLevels[this.state.sliderValue];
      } else {
        sliderValue = this.state.sliderValue;
      }

    } else {
      sliderValue = "---";
    }

    return(
      <Text style={style.sliderValueText}> {sliderValue} </Text>
    )*/
  }

  _renderWaveformSelector() {
    if(this.props.sliderName.indexOf("Heart Rate") !== -1 && this.state.collapsed == true){
      return(
        <WaveFormSelector
          toggleCallback={this._toggleExpanded}
          waveform={this.state.waveform}
        />
      )
    }
  }

  _renderWaveFormCollapsible() {
    if(this.props.sliderName.indexOf("Heart Rate") !== -1){
      return(
        <WaveFormCollapsible 
          collapsed={this.state.collapsed}
          onWaveformSelect={this._onWaveformSelect}
        />
      )
    }
  }

  render() {
    //console.log('rendering ControllerScreen');
    return (
      <View style={style.sliderContainer}>
        <View style={style.titleValueSwitch}>
          <View style={{flexDirection: 'row'}}>
            <Text style={style.sliderTitle}>{this.props.sliderName}</Text>
            {this._renderSliderValue()}
          </View>
          {this._renderWaveformSelector()}
          <Switch
            value = {this.state.switchValue}
            onValueChange={this._onSwitchChange}
            onTintColor="#1073ff"
            thumbTintColor="white"
            tintColor="#babdc1"
          /> 
        </View>
        <Slider
            disabled = {!this.state.switchValue}
            value={this.state.sliderValue}
            onValueChange={this._onSliderChange}
            minimumValue={this.props.min}
            maximumValue={this.props.max}
            onSlidingComplete={this._onSlidingComplete}
            step = {this.props.step}
            style = {{width: '80%', alignSelf: 'center'}}
            trackStyle={style.trackStyle}
            thumbStyle={this.state.switchValue ? style.thumbStyleEnabled : style.thumbStyleDisabled}
            minimumTrackTintColor={this.state.switchValue ? '#1073ff' : "#b7b7b7"}
            maximumTrackTintColor='#b7b7b7'
        />
        {this._renderWaveFormCollapsible()}
      </View>
    );
  }
}

VitalSlider.propTypes = { 
  sliderName: PropTypes.string.isRequired,
  actionType: PropTypes.string.isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  initialValue: PropTypes.number.isRequired,
  switchVal: PropTypes.string.isRequired,
  waveform: PropTypes.string.isRequired,
  step: PropTypes.number,
  bpLevels: PropTypes.arrayOf(PropTypes.string)
}