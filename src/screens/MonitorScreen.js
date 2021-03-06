import React from 'react';
import {View, StatusBar, Dimensions} from 'react-native';
import {connect} from "react-redux";
import Orientation from "react-native-orientation";
import PresetChangerArrow from '../components/MonitorPresets/PresetChangerArrow';
import MONITOR_PRESETS from '../components/MonitorPresets';

class MonitorScreen extends React.Component {
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
        //Orientation.lockToLandscape();
    }

    componentWillUnmount() {
        Orientation.lockToPortrait();
        //Orientation.unlockAllOrientations();
        StatusBar.setHidden(false);
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
        console.log('rendering monitorscreen')
        let CurrentMonitor = MONITOR_PRESETS[this.state.currentPreset];
        //console.log("BLOOD PRESSURE: " + this.props.bloodPressure);
        return (
            <View 
                style={{flex: 1, flexDirection: 'row'}}
                onResponderRelease={() => this.stopTouch(this.state.toggle)}
                onStartShouldSetResponder={(e) => {return true}}>
                <CurrentMonitor
                    Waveform = {this.props.Waveform}
                    heartRate = {this.props.heartRate}
                    bloodPressure = {this.props.bloodPressure}
                    O2Sat = {this.props.O2Sat}
                    EtC02 = {this.props.EtC02}
                    SwitchVals = {this.props.SwitchVals}/>
                <PresetChangerArrow
                    show={this.state.toggle}
                    arrow="ios-arrow-back"
                    style={{left: Dimensions.get('window').width*(1/15),
                            top: Dimensions.get('window').height*(1/2.5)}}
                    onClick={() => this.onPresetChange("left")}
                />
                <PresetChangerArrow
                    show={this.state.toggle}
                    arrow="ios-arrow-forward"
                    style={{left: Dimensions.get('window').width*(13/15),
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
        O2Sat: state.O2Sat,
        EtC02: state.EtC02,
        Waveform: state.Waveform,
        SwitchVals: state.SwitchVals
    }
}

export default connect(mapStateToProps)(MonitorScreen);