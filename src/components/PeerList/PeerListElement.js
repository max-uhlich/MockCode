import React from 'react';
import {View, Text, Image, StyleSheet, Switch} from 'react-native';

export default class PeerListElement extends React.PureComponent {
    
    constructor(props) {
        super(props);
        if(this.props.item.id === this.props.Listening_To)
            tempSwitchVal = true;
        else
            tempSwitchVal = false;
        
        this.state = {
            switchValue: tempSwitchVal,
            Listening_To: props.Listening_To
        };
    }

    componentWillReceiveProps(newProps) {
        this.setState({Listening_To: newProps.Listening_To});
        //console.log("switch componentWillReceiveProps " + this.props.item.id + " " + newProps.Listening_To)
        //console.log("this.state.switchValue" + this.state.switchValue)
        if(this.props.item.id !== newProps.Listening_To)
            this.setState({switchValue: false});
    }
    
    _onSwitchChange = (value) => {
        this.setState({switchValue: value});
        if(value)
            this.props.toggleListeningCallback(this.props.item.id);
        else
            this.props.toggleListeningCallback(null);

        //console.log("SWITCH JUST CHANGED: " + this.props.item.id);
        //this.setState({switchValue: value});
        //store.dispatch(Update_Value(ACTIONS.LISTEN_TO, this.props.item.id));
    }

    render() {
        const item = this.props.item;
        return (
        <View style={styles.listElement}>
            <Text style={styles.connectionName}>{(item.id+"").split('*')[0]}</Text>
            <Image
                source={require('../img/wifi.png')}
                style={styles.connectionType}
            />
            <Switch
                value = {this.state.switchValue}
                onValueChange={this._onSwitchChange}
                onTintColor="#1073ff"
                thumbTintColor="white"
                tintColor="#babdc1"
            /> 
        </View>
        );
    }
}

const styles = StyleSheet.create({
    listElement: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    connectionName: {
        flex: 0.7,
        fontSize: 25
    },
    connectionType: {
        flex: 0.3,
        alignSelf: 'center',
        width: undefined,
        resizeMode: 'contain'
    }
});

