import DeviceInfo from 'react-native-device-info'

export const ACTIONS = {
    UPDATE_HEART_RATE: "UPDATE_HEART_RATE",
    UPDATE_BLOOD_PRESSURE: "UPDATE_BLOOD_PRESSURE",
    UPDATE_O2SAT: "UPDATE_O2SAT",
	  UPDATE_ETCO2: "UPDATE_ETCO2",
		UPDATE_WAVEFORM: "UPDATE_WAVEFORM",
		UPDATE_FACE: "UPDATE_FACE",
		UPDATE_SWITCHVALS: "UPDATE_SWITCHVALS",
		HELLO_RESPONSE: "HELLO_RESPONSE",
		HELLO_REQUEST: "HELLO_REQUEST",
		REMOVE_DEVICE: "REMOVE_DEVICE",
		LISTEN_TO: "LISTEN_TO"
}

export function Update_Store(slider, value) {
	//console.log("Updating Store: " + slider + " " + value)
  return { type: slider, value: value }
}

export function Update_Value(type, value) {
  return (dispatch, getState) => {
		// We will only broadcast and listen to ourself if we are not listening to anybody else
		if (getState().Listening_To === null){
			let m = {
				message: value + "*" + DeviceInfo.getUniqueID(),
				type: type,
				timeStamp: new Date()
			};
			// This is the only place where we publish a value change that another device needs to listen to
			// We will need to include our device name+ID here.
			//console.log("Listening_To: " + getState().Listening_To)
			console.log("Value PUBLISH: " + m.type + " " + (m.message+"").split('*')[0])
			getState().NearbyApi.nearbyApi.publish(JSON.stringify(m))
			return dispatch(Update_Store(type, value));
		}
  }
}

export function On_Message_Found(m) {
  return (dispatch, getState) => {
		if (m.type === ACTIONS.HELLO_REQUEST) {
			let response_m = {
				message: DeviceInfo.getDeviceName().replace("*", "") + "*" + DeviceInfo.getUniqueID(),
				type: ACTIONS.HELLO_RESPONSE,
				timeStamp: new Date()
			}
			//console.log("Ignore PUBLISH: " + response_m.type + " " + response_m.message)
			getState().NearbyApi.nearbyApi.publish(JSON.stringify(response_m))
			return dispatch(Update_Store(ACTIONS.HELLO_RESPONSE, m.message))
		}
		else if (m.type === ACTIONS.HELLO_RESPONSE) {
			//return dispatch({type: m.type, value: m.message})
			return dispatch(Update_Store(m.type, m.message))
		}
		else {
			//I think this is the only place where values will be updated based on a found message.
			if (getState().Listening_To !== null){
				var listen_ID = getState().Listening_To.split('*').slice(1).join('')
				var incoming_ID = (m.message+"").split('*').slice(1).join('')
				if (listen_ID === incoming_ID) {
					//console.log("Listening To: " + getState().Listening_To + " listenID: " + listen_ID)
					//console.log("m.message: " + m.message + " incoming_ID: " + incoming_ID)
					console.log("m.message: " + (m.message+"").split('*')[0] + " m.type: " + m.type)
					//console.log("Updating Store Value " + m.type + " " + (m.message+"").split('*')[0])
					return dispatch(Update_Store(m.type, (m.message+"").split('*')[0]))
				} else {
					//console.log("ignoring mismatched IDs " + listen_ID + " " + incoming_ID)
				}
			} else {
				//console.log("ignoring listening to null " + m.type + " " + m.message)
			}
		}
	}
}