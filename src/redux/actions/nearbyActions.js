import DeviceInfo from 'react-native-device-info'

export const ACTIONS = {
    UPDATE_HEART_RATE: "UPDATE_HEART_RATE",
    UPDATE_BLOOD_PRESSURE: "UPDATE_BLOOD_PRESSURE",
    UPDATE_O2SAT: "UPDATE_O2SAT",
	  UPDATE_ETCO2: "UPDATE_ETCO2",
		UPDATE_WAVEFORM: "UPDATE_WAVEFORM",
		UPDATE_FACE: "UPDATE_FACE",
		HELLO_RESPONSE: "HELLO_RESPONSE",
		HELLO_REQUEST: "HELLO_REQUEST",
		REMOVE_DEVICE: "REMOVE_DEVICE",
		LISTEN_TO: "LISTEN_TO"
}

export function Update_Store(slider, value) {
	console.log("Updating store: " + slider + " " + value)
  return { type: slider, value: value }
}

export function Update_Value(type, value) {
  return (dispatch, getState) => {
    let m = {
			message: value,
			type: type,
			timeStamp: new Date()
		};
		console.log("getState.Listening_To: " + getState().Listening_To);
		console.log("publishing: " + m.type + " " + m.message);
    getState().NearbyApi.nearbyApi.publish(JSON.stringify(m))
    return dispatch(Update_Store(type, value));
  }
}

export function On_Message_Found(m) {
  return (dispatch, getState) => {
		if (m.type === ACTIONS.HELLO_REQUEST) {
			let response_m = {
				message: DeviceInfo.getDeviceName(),
				type: ACTIONS.HELLO_RESPONSE,
				timeStamp: new Date()
			}
			//console.log("publishing: " + response_m.type + " " + response_m.message);
			getState().NearbyApi.nearbyApi.publish(JSON.stringify(response_m))
			return dispatch(Update_Store(ACTIONS.HELLO_RESPONSE, m.message))
		}
		else if (m.type === ACTIONS.HELLO_RESPONSE) {
			//return dispatch({type: m.type, value: m.message})
			return dispatch(Update_Store(m.type, m.message))
		}
		else {
			return dispatch(Update_Store(m.type, m.message)) 
		}
	} 
}