import React from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import PeerListElement from './PeerListElement';
import { Update_Value, ACTIONS } from '../../redux/actions/nearbyActions';

export default class PeerList extends React.PureComponent {
  constructor() {
    super();
    this.state = store.getState();
  }

  toggleListeningCallback = (value) => {
    store.dispatch(Update_Value(ACTIONS.LISTEN_TO, value));
    this.setState({Listening_To: value});

    //console.log("SWITCH JUST CHANGED: " + this.props.item.id);
    //this.setState({switchValue: value});
    //store.dispatch(Update_Value(ACTIONS.LISTEN_TO, this.props.item.id));
  }
  
  _keyExtractor = (item, index) => item.id;

  _renderItem = ({item}) => (
    <PeerListElement 
      item={item} 
      Listening_To={this.state.Listening_To} 
      toggleListeningCallback={this.toggleListeningCallback}/>
  );

  render() {
    let data = [];
    this.props.devices.forEach(i => data.push({ id: i }));
    return (
      <View style={{flex: 1}}>
        <FlatList
          data={data}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
        />
      </View>
    )
  }
}