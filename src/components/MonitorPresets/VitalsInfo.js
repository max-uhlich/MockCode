import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {moderateScale} from '../../utils/scaling';

export default class VitalInfo extends React.PureComponent {
    render() {
        return (
        <View style={styles.container}>
            <View style={styles.vitalSignName}>
                <View style={{flex: 1, flexDirection: 'column', justifyContent: 'flex-start'}}>
                    <Text style={[this.props.style, {marginBottom: '-5%', fontWeight: 'bold', fontSize: moderateScale(20)}]}>{this.props.vitalSignName}</Text>
                    <View style={{alignItems: 'flex-end', marginRight:'70%'}}>
                        <Text style={[this.props.style, {fontSize: moderateScale(20)}]}>{this.props.numer}</Text>
                        <Text style={[this.props.style, {marginTop: '-15%', fontSize: moderateScale(20)}]}>{this.props.denom}</Text>
                    </View>
                </View>
            </View>
            <View style={styles.vitalRate}>
                <Text style={[{fontSize: moderateScale(90), fontWeight: 'bold', marginTop: '-10%'}, this.props.style]}>{this.props.vitalRate}</Text>
            </View>
        </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    vitalSignName: {
        flex: 0.8,
        flexDirection: 'row'
    },
    vitalRate: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        backgroundColor: 'black',
    }
})