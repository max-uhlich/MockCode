import { ACTIONS } from "./actions/nearbyActions"
import { combineReducers } from 'redux'
import { NearbyAPI } from "react-native-nearby-api";

const initialState = {
    nearbyApi: new NearbyAPI(true),
    devices: new Set()
}

function NearbyApi(state = initialState, action) {
  //console.log("In reducer NearbyApi")
  //state.devices.add('Test 1*f139d13*52d')
  //state.devices.add('Test Device*xxc9ef')
  //state.devices.add('Testing Device*1zz1c')
  //const iterator1 = state.devices.entries();

  //for (let entry of iterator1) {
  //  console.log(entry);
  //}

  switch (action.type) {
    case ACTIONS.HELLO_RESPONSE:
      return {
        ...state,
        devices: new Set(state.devices.add(action.value))
      }
    case ACTIONS.REMOVE_DEVICE:
      let newDevices = state.devices;
      newDevices.delete(action.value);
      return {
        ...state,
        devices: new Set(newDevices)
      }
    default:
      return state
  }
}

function HeartRate(state = 80, action) {
  //console.log("In reducer updating HeartRate")
  switch (action.type) {
    case ACTIONS.UPDATE_HEART_RATE:
      return parseInt(action.value)
    default:
      return state
  }
}

function bloodPressure(state = '120/78', action) {
  //console.log("In reducer bloodPressure")
  switch (action.type) {
    case ACTIONS.UPDATE_BLOOD_PRESSURE:
      return action.value
    default:
      return state
  }
}

function O2Sat(state = 96, action) {
  //console.log("In reducer O2Sat")
  switch (action.type) {
    case ACTIONS.UPDATE_O2SAT:
      return parseInt(action.value)
    default:
      return state
  }
}

//Ideally this action just changes the source state for the image, not sure how the formatting should go
function face(state = 'normal', action) {
  //console.log("In reducer Face")
  switch (action.type) {
    case ACTIONS.UPDATE_FACE:
      return action.value
    default:
      return state
  }
}

function EtC02(state= 25, action) {
  //console.log("In reducer Etc02")
  switch (action.type) {
    case ACTIONS.UPDATE_ETCO2:
      return parseInt(action.value)
    default:
      return state
  }
}

function Waveform(state = 'Normal Sinus Rhythm', action) {
  //console.log("In reducer Waveform")
  switch (action.type) {
    case ACTIONS.UPDATE_WAVEFORM:
      return action.value
    default:
      return state
  }
}

function SwitchVals(state = '1111', action) {

  switch (action.type) {
    case ACTIONS.UPDATE_SWITCHVALS:
      //console.log("updating sitchvals: " + action.value)
      return action.value
    default:
      return state
  }

  /*switch (action.type) {
    case ACTIONS.TOGGLE_SWITCHVALS:
      console.log("updating sitchvals at position: " + action.value)

      let pre = state.slice(0, action.value)
      let post = state.slice(action.value+1)
      let val = (state.charAt(action.value)==='1') ? '0' : '1'

      console.log("updating pre+val+post: " + pre+val+post)
      return pre+val+post
    default:
      return state
  }*/
}

function Listening_To(state = null, action) {
  //console.log("In reducer updating Listen")
  switch (action.type) {
    case ACTIONS.LISTEN_TO:
      return action.value
    default:
      return state
  }
}

const MockApp = combineReducers({
    NearbyApi,
    HeartRate,
    bloodPressure,
    O2Sat,
    EtC02,
    Waveform,
    face,
    Listening_To,
    SwitchVals,
});

export default MockApp;
