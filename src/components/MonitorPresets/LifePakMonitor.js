import React from 'react'
import {Text, View, StyleSheet} from 'react-native';
import {Icon} from 'native-base';
import {moderateScale} from '../../utils/scaling';
import Clock from './Clock';
import WaveformCanvas from "../Waveform/WaveformCanvas";
import EStyleSheet from 'react-native-extended-stylesheet';

export default class LikePakMonitor extends React.PureComponent {
    render() {
        return (
        <View style={styles.container}>
            <View style={styles.dataSection}>
                <View style={styles.heartRateSection}>
                    <View style={styles.heartRateData}>
                        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'grey'}}>
                            <Text style={textStyle.hrText}>HR</Text>
                            <Text style={[textStyle.o2SatText, {marginRight: '2%'}]}></Text>
                        </View>
                        <View style={{flex: 4, flexDirection: 'row', justifyContent: 'space-between'}}>
                            <Icon
                                type="FontAwesome"
                                name="bell"
                                style={{color: '#80ff80', fontSize: moderateScale(30), marginTop: '2%'}} />
                            <Text style={[textStyle.vitalValueText, testStyle.vitalText,{color: '#80ff80'}]}>
                                {this.props.heartRate}
                            </Text>
                        </View>
                    </View>
                </View>

                <View style={styles.o2SatSection}>
                    <View style={styles.o2SatData}>
                        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'grey'}}>
                            <Text style={textStyle.o2SatText}>SpO2</Text>
                            <Text style={[textStyle.o2SatText, {marginRight: '2%'}]}>%</Text>
                        </View>
                        <View style={{flex: 4, flexDirection: 'row', justifyContent: 'space-between'}}>
                            <Icon
                                type="FontAwesome"
                                name="bell"
                                style={{color: '#15f4ee', fontSize: moderateScale(30), marginTop: '2%'}} />
                            <Text style={[textStyle.vitalValueText, testStyle.vitalText, {color: '#15f4ee'}]}>
                                {this.props.O2Sat}
                            </Text>
                        </View>
                    </View>
                </View>

                <View style={styles.co2Section}>
                </View>

            </View>

            <View style={styles.waveformSection}>
                <View style={styles.heartRateWave}>
                        {<WaveformCanvas wavetype="HR" colour="green" fps={30} stepsize={4} f={this.props.heartRate}/>}
                </View>
                <View style={{flex: 1}}></View>
            </View>
        </View>
        );
    }
}

const testStyle = EStyleSheet.create({
    vitalText: {
        fontSize: '6rem',
        marginTop: '-1rem',
        marginRight: '0.5rem'
    }
});

const textStyle = StyleSheet.create({
    hrText: {
        fontSize: moderateScale(25),
        fontWeight: 'bold',
        color: '#80ff80',
        marginLeft: '2.5%'
    },
    o2SatText: {
        fontSize: moderateScale(25),
        fontWeight: 'bold',
        color: '#15f4ee',
        marginLeft: '2.5%'
    },
    vitalValueText: {
        fontWeight: 'bold',
    }
})

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        backgroundColor: 'grey'
    },
    waveformSection: {
        flex: 3.7,
        flexDirection: 'column',
        backgroundColor: 'black'
    },
    dataSection: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black'
    },
    heartRateSection: {
        flex: 1,
        flexDirection: 'column',
    },
    o2SatSection: {
        flex: 1,
        flexDirection: 'column'
    },
    co2Section: {
        flex: 1,
        flexDirection: 'column'
    },
    heartRateData: {
        flex: 1,
        flexDirection: 'column',
        borderRightWidth: moderateScale(2.5),
        borderColor: 'grey'
    },
    heartRateWave: {
        flex: 2,
        flexDirection: 'column'
    },
    o2SatData: {
        flex: 1,
        flexDirection: 'column',
        borderRightWidth: moderateScale(2.5),
        borderColor: 'grey'
    },
    o2SatWave: {
        flex: 4,
    },
    co2Data: {
        flex: 1,
        borderRightWidth: moderateScale(2.5),
        borderColor: 'grey'
    },
    co2Wave: {
        flex: 4,
    }
})
