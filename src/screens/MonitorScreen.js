import React, { Component } from 'react';
import {View, StyleSheet, StatusBar, TouchableOpacity, Dimensions, Text, Button} from 'react-native';
import {Icon} from 'native-base';
import {connect} from "react-redux";
import Orientation from "react-native-orientation";
import { NetworkComp } from '../components/network';
import PresetChangerArrow from '../components/MonitorPresets/PresetChangerArrow';
import MONITOR_PRESETS from '../components/MonitorPresets';

class MonitorScreen extends Component {
    constructor(props) {
        super(props);
        this.stopTouch = this.stopTouch.bind(this);
        this.state = {
            toggle: false,
            currentPreset: 0
        };
    }

    static navigationOptions = {
        title: 'Monitor',
        header: null
    }

    componentDidMount(){
        StatusBar.setHidden(true);
        Orientation.lockToLandscape();
    }

    componentWillUnmount() {
        Orientation.lockToPortrait();
        Orientation.unlockAllOrientations();
    }

    stopTouch(toggle) {
        this.setState({toggle: !toggle});
    }

    onPresetChange(change){
        switch(change){
            case "left":
                if (this.state.currentPreset > 0){
                    let newPreset = this.state.currentPreset - 1;
                    this.setState({currentPreset: newPreset});
                }
                break;
            case "right":
                if (this.state.currentPreset < (MONITOR_PRESETS.length - 1)){
                    let newPreset = this.state.currentPreset + 1;
                    this.setState({currentPreset: newPreset});
                }
                break;
            default:
                break;
        }
    }

    render() {
        let CurrentMonitor = MONITOR_PRESETS[this.state.currentPreset];
        return (
            <View 
                style={{flex: 1, flexDirection: 'row'}}
                onResponderRelease={() => this.stopTouch(this.state.toggle)}
                onStartShouldSetResponder={(e) => {return true}}>
                <NetworkComp />
                <CurrentMonitor
                    heartRate = {this.props.heartRate}
                    bloodPressure = {this.props.bloodPressure}
                    O2Sat = {this.props.O2Sat}/>
                <PresetChangerArrow
                    show={this.state.toggle}
                    arrow="chevron-left"
                    style={{left: Dimensions.get('window').width*(1/15),
                            top: Dimensions.get('window').height*(1/2.5)}}
                    onClick={() => this.onPresetChange("left")}
                />
                <PresetChangerArrow
                    show={this.state.toggle}
                    arrow="chevron-right"
                    style={{left: Dimensions.get('window').width*(14/15),
                            top: Dimensions.get('window').height*(1/2.5)}}
                    onClick={() => this.onPresetChange("right")}
                />
            </View>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        heartRate: state.HeartRate,
        bloodPressure: state.bloodPressure,
        O2Sat: state.O2Sat
    }
}

export default connect(mapStateToProps)(MonitorScreen);