import React from 'react'
import {Text, View, StyleSheet} from 'react-native';
import VitalsInfo from './VitalsInfo';
import { moderateScale } from '../../utils/scaling';
import PropTypes from 'prop-types';
import WaveformCanvas from '../Waveform/WaveformCanvas';

export default class PhilipsMonitor extends React.PureComponent{
    render() {
        console.log("rendering philipsmonitor")
        var HR = (this.props.SwitchVals.charAt(0)==='1') ? this.props.heartRate : '---';
        var O2 = (this.props.SwitchVals.charAt(1)==='1') ? this.props.O2Sat : '---';
        var BP = (this.props.SwitchVals.charAt(2)==='1') ? this.props.bloodPressure : '---';
        return (
            <View style={styles.container}>
                {/* This view contains the column where any waveforms are drawn
                    for certain vital signs (e.g., heart rate). */}
                <View style={styles.waveformSection}>
                    <View style={styles.heartRateWave}>
                        {<WaveformCanvas wavetype="HR" colour="green" fps={30} stepsize={4} f={this.props.heartRate}/>}
                    </View>
                    <View style={styles.oSatWave}>
                        {/*<WaveformCanvas wavetype="O2Sat" colour="#15f4ee" fps={30} stepsize={4} f={this.props.heartRate}/>*/}
                    </View>
                    <View style={styles.nbpInfo}>
                        <View style={{flex: 0.8}}>
                            <Text style={bpInfoStyle.nbpLeftText}>NBP</Text>
                            <View>
                                <Text style={bpInfoStyle.sysDiaMeanText}>Sys.</Text>
                                <Text style={bpInfoStyle.sysDiaMeanText}>Dia.</Text>
                                <Text style={bpInfoStyle.sysDiaMeanText}>Mean</Text>
                            </View>
                        </View>
                        <View style={{flex: 3, backgroundColor: 'black'}}>
                            {/* <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                <Text style={{fontSize:moderateScale(20), color: '#EBB0D7'}}>Pulse</Text>
                                <Text style={{marginRight: '20%'}}>Man</Text>
                            </View> */}
                            <Text style={bpInfoStyle.nbpValueLarge}>{BP}</Text>
                        </View>
                        <View style={{flex : 1.5, alignItems: 'center'}}>
                            <Text style={bpInfoStyle.nbpRightText}>NBP</Text>
                            <Text style={bpInfoStyle.mmHgText}>mmHg</Text>
                        </View>
                    </View>
                </View>
                {/* This view contains the column where all of the current vital sign
                    values are shown (middle column), along with the vital sign name. */}
                <View style={styles.dataSection}>
                    <View style={styles.heartRateData}>
                        <VitalsInfo 
                            vitalSignName="HR"
                            vitalRate={HR}
                            style={{color: '#80ff80'}}
                            numer={120}
                            denom={50}
                        />
                    </View>
                    <View style={styles.oSatData}>
                        <VitalsInfo 
                            vitalSignName="SpO2" 
                            vitalRate={O2} 
                            style={{color: '#15f4ee'}}
                            numer={100}
                            denom={90}
                        />
                    </View>
                    <View style={styles.nbpInfoExtra}>
                        <Text style={bpInfoStyle.nbpInfoExtraText}>{BP}</Text>
                    </View>
                </View>
                {/* View to contain the right side of monitor, where the pulse of
                    patient is shown as determined by the O2Sat. */}
                <View style={styles.pulseSection}>
                    <View style={{flex: 1.4, backgroundColor: 'black', justifyContent: 'center'}}>
                        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                            <View style={{flexDirection: 'column', margin: '5%'}}>
                                <Text style={pulseStyle.pulseText}>Pulse</Text>
                                <View style={pulseStyle.squareGraphic}>
                                </View>
                            </View>
                            <Text style={pulseStyle.pulseValue}>{O2}</Text>
                        </View>
                    </View>
                    <View style={{flex: 1, backgroundColor: 'black'}}>
                    </View>
                </View>
            </View>
        );
    }
}

PhilipsMonitor.propTypes = {
    heartRate: PropTypes.number.isRequired,
    bloodPressure: PropTypes.string.isRequired,
    O2Sat: PropTypes.number.isRequired,
    SwitchVals: PropTypes.string.isRequired
}

const bpInfoStyle = StyleSheet.create({
    sysDiaMeanText: {
        fontSize: moderateScale(18),
        marginTop: '-7%',
        marginLeft: '2%',
        color: '#8A2BE2'
    },
    nbpLeftText: {
        fontSize: moderateScale(25),
        marginLeft: '2%',
        color: '#ffe6f3',
        fontWeight: 'bold'
    },
    nbpRightText: {
        fontSize: moderateScale(25),
        color :'#ffe6f3',
        fontWeight: 'bold'
    },
    mmHgText: {
        fontSize: moderateScale(18),
        color :'#8A2BE2'
    },
    nbpValueLarge: {
        fontSize: moderateScale(80),
        color: '#ffe6f3',
        fontWeight: 'bold'
    },
    nbpInfoExtraText: {
        fontSize: moderateScale(25),
        color: '#ffe6f3'
    }
})

const pulseStyle = StyleSheet.create({
    squareGraphic: {
        width: moderateScale(35),
        height: moderateScale(35),
        borderRadius: 5,
        backgroundColor: 'white'
    },
    pulseText: {
        color: 'white',
        fontSize: moderateScale(18)
    },
    pulseValue: {
        fontSize: moderateScale(60),
        color: 'white'
    }
})

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    waveformSection: {
        flex: 3.5,
        flexDirection: 'column',
        backgroundColor: 'black'
    },
    dataSection: {
        flex: 1,
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        backgroundColor: 'black'
    },
    pulseSection: {
        flex: 1.5,
        flexDirection: 'column',
    },
    heartRateWave: {
        flex: 1,
        flexDirection: 'row'
    },
    heartRateData: {
        flex: 1,
        flexDirection: 'row',
    },
    oSatWave: {
        flex: 1,
        flexDirection: 'row'
    },
    oSatData: {
        flex: 1,
        flexDirection: 'row',
    },
    nbpInfo: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'black'
    },
    nbpInfoExtra: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        backgroundColor: 'black'
    },
})
