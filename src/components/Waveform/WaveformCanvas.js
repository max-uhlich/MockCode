import React from "react";
import {Platform, WebView, StyleSheet, View} from "react-native";
import Canvas from 'react-native-canvas';

import { waveformData } from './WaveformData.js';

//import Renderer from './WaveformRenderer'
//r = new Renderer('HR');

class WaveformCanvas extends React.Component {
  
  constructor() {
    //console.log('constructor')
    super();
    this.state = {
      //x:0,
      //y:50,
      //canvas:null,
      //path:"",
      //front:"-1,50 -1,50",
      //back:"198,0 200,0",
      dimensions:undefined
    };
    //this.path = ""
    //this.path = "0,152 1,152 2,153 3,155 4,153 5,155 6,152 7,153 8,155 9,157 10,157 11,159 12,162 13,165 14,165 15,168 16,174 17,178 18,178 19,170 20,158 21,145 22,126 23,102 24,70 25,40 26,20 27,12 28,22 29,52 30,96 31,138 32,163 33,172 34,170 35,163 36,158 37,158 38,159 39,160 40,158"
    //this.path = "5,158 10,155 15,155 20,152 25,154 30,152 35,145 40,144 45,145 50,145 55,153 60,158 65,160 70,160 75,157 80,152 85,155 90,157 95,168 100,158 105,40 110,96 115,163 120,158 125,159 130,158 135,158 140,155 145,159 150,160 155,161 160,159 165,161 170,157 175,159 180,160 185,161 190,161 195,159 200,163 205,162 210,163 215,163 220,159 225,153 230,149 235,148 240,149 245,149 250,150 255,152 260,150 265,152 270,152 275,155 280,156 285,153 290,155 295,155 300,157 305,158 310,155 315,155 320,152 325,154 330,152 335,145 340,144 345,145 350,145 355,153 360,158 365,160 370,160 375,157 380,152 385,155 390,157 395,168 400,158 405,40 410,96 415,163 420,158 425,159 430,158 435,158 440,155 445,159 450,160 455,161 460,159 465,161 470,157 475,159 480,160 485,161 490,161 495,159 500,163 505,162 510,163 515,163 520,159 525,153 530,149 535,148 540,149 545,149 550,150 555,152"
    //this.path2 = "5,158 10,155 15,155 20,152 25,154 30,152 35,145 40,144 45,145 50,145 55,153 60,158 65,50 70,50 75,50 80,152 85,155 90,157 95,168 100,158 105,40 110,96 115,163 120,158 125,159 130,158 135,158 140,155 145,159 150,160 155,161 160,159 165,161 170,157 175,159 180,160 185,161 190,161 195,159 200,163 205,162 210,163 215,163 220,159 225,153 230,149 235,148 240,149 245,149 250,150 255,152 260,150 265,152 270,152 275,155 280,156 285,153 290,155 295,155 300,157 305,158 310,155 315,155 320,152 325,154 330,152 335,145 340,144 345,145 350,145 355,153 360,158 365,160 370,160 375,157 380,152 385,155 390,157 395,168 400,158 405,40 410,96 415,163 420,158 425,159 430,158 435,158 440,155 445,159 450,160 455,161 460,159 465,161 470,157 475,159 480,160 485,161 490,161 495,159 500,163 505,162 510,163 515,163 520,159 525,153 530,149 535,148 540,149 545,149 550,150 555,152"
    //this.front = [];
    //this.back = [[201,0], [202, 0]];
    this.x = 0;
    this.y = 0;
    this.arrIndex = 0;
    this.renderFrame = this.renderFrame.bind(this);
    this.traceWidth = 10;
    this.beeptime = 0;
    this.pitches = ['D2', 'D#2', 'E2', 'F2', 'F#2', 'G2', 'G#2', 'A2', 'A#2', 'B2', 'C3', 'C#3', 'D3', 'D#3', 'E3', 'F3', 'F#3', 'G3', 'G#3', 'A3', 'A#3', 'B3', 'C4', 'C#4', 'D4', 'D#4', 'E4', 'F4', 'F#4', 'G4', 'G#4', 'A4', 'A#4', 'B4', 'C5', 'C#5', 'D5', 'D#5', 'E5', 'F5', 'F#5']
    //this.stepsize = this.props.stepsize; //stepsize must be smaller than traceWidth otherwise we won't clear everything.
    //this.handleCanvas = this.handleCanvas.bind(this);
    //this.userTest = React.createRef();

    //this.fps = 15;
    //this.then = Date.now();
    //this.interval = 1000 / this.fps;

    //this.windowTime = 5000;
    //this.r = new Renderer('HR');
    //this.r.changeWaveform('HR', 'NSR');
    //this.r.updateFrequency(120);
    //this.frame = this.r.getFrame(0, 100);
    this.layoutBool = false
  }

  componentDidMount() {
    //console.log('componentDidMount')
    
    this.stepsize = this.props.stepsize; 
    this.fps = this.props.fps;
    this.then = Date.now();
    this.interval = 1000 / this.fps;
    this._frameId = requestAnimationFrame(() => {
      this.renderFrame();
    });

    //setTimeout(() => {cancelAnimationFrame(this._frameId)}, 2000)
  }

  componentWillUnmount() {
    //console.log('componentWillUnmount')
    //console.log("UNMOUNTING FRAMEID: " + this._frameId)
    cancelAnimationFrame(this._frameId);
  }

  handleCanvas = (canvas) => {
    //console.log('handleCanvas')
    if(canvas){
      this.canvasRef = canvas;
      this.canvasRef.height = this.state.dimensions.height;
      this.canvasRef.width = this.state.dimensions.width;
      this.ctx = this.canvasRef.getContext('2d');
      this.ctx.strokeStyle = this.props.colour;
      this.ctx.fillStyle = this.props.colour;
    }
  }

  handleWebView = (webview) => {
    //console.log('handleWebView')
    if(webview){
      this.webviewRef = webview;
      //this.webviewRef.injectJavaScript('beep(\'D5\')');
      //this.webviewRef.injectJavaScript('change_size()');
    }
  }

  ecgGenerator(x) {
    //Not called yet
    console.log('ecgGenerator')
    let twindow = x % 300;
    return waveformData.HR.VT.dataPoints[twindow]
    if (twindow < 35) {
    } else {
      return 1;
    }
  }

  _waveform(x) {
    //console.log('_waveform ' + x)
    //var w = waveformData.HR.NSR;
    //var p = w.dataPoints[x % w.nPoints];
    //var scaled =  (w.range.max -  p) / (w.range.max - w.range.min) * this.state.dimensions.height
    //return scaled.toFixed();

    //var s = store.getState();
    switch (this.props.wavetype) {
      case "HR":
        switch (this.waveform) {
          case "Normal Sinus Rhythm":
            var w = waveformData.HR.NSR;
            //c = Math.floor(this.state.dimensions.width / (5000 * (store.getState().HeartRate / 60000)));
            
            var bps = this.heartrate/60                     //beats per second
            var bpw = this.spw*bps                                      //beats per window
            var ppb = this.state.dimensions.width/bpw                   //pixels per beat
            //var fpb = (this.state.dimensions.width/this.stepsize)/bpw   //frames per beat
            //console.log("bps " + bps)
            //console.log("bpw " + bpw)
            //console.log("ppb " + ppb)
            //console.log("fpb " + fpb)

            cadence = Math.round(ppb);
            //cadence = Math.min(c, w.nPoints);
            break

          case "Ventricular Tachycardia":
            var w = waveformData.HR.VT
            cadence = w.nPoints
            break;
          case "Ventricular Fibrillation":
            var w = waveformData.HR.VF
            cadence = w.nPoints
            break;
          case "PEA/Asystole":
            var w = waveformData.HR.PEA
            cadence = w.nPoints
            break;
          case "Compressions In-Progress":
            var w = waveformData.HR.ASYSTOLE;
            cadence = w.nPoints;
        }
        // Cadence can never go below 28, otherwise we fail to render heart beats.
        cadence = Math.max(cadence,28)
        //console.log("cadence: " + cadence)

        // If cadence is really high, we will add noise to the end
        var xPos = (x % cadence) + Math.floor(Math.random()*2)
        if (xPos>w.nPoints)
          var p = waveformData.NOISE.NORMAL.dataPoints[xPos % waveformData.NOISE.NORMAL.nPoints]
        else
          var p = w.dataPoints[xPos];

        var scaled =  ((w.range.max -  p) / (w.range.max - w.range.min) * this.state.dimensions.height).toFixed();

        // Beep if necessary
        if ((scaled < this.threshold) && ((x - this.beeptime)>(3*this.stepsize))){
          this.beeptime = x;
          //this.webviewRef.injectJavaScript('beep(\'D5\')');
          this.webviewRef.injectJavaScript('beep(\'' + this.pitch + '\')');
        }
        //console.log(scaled)
        //(s.O2Sat-96)
        return scaled;
        break;

      case "BP":
        if (this.waveform == "Compressions In-Progress") {
          return this.state.dimensions.height /2;
        } else {
          return x % 200;
        }
        break;
      case "O2Sat":
        var w = waveformData.O2Sat.NORMAL2;
        var p = w.dataPoints[x % w.nPoints] - 1;
        var scaled =  ((w.range.max -  p) / (w.range.max - w.range.min) * this.state.dimensions.height)/2
        return scaled.toFixed();

        scaled = this.state.dimensions.height - this.state.dimensions.height * (s.O2Sat / 100) + 10
        return scaled;
        break;
      default:
        return 100;
    }
  }

  config(w, h, bpm) {
    console.log('config')

  }

  renderFrame() {
    now = Date.now();
    delta = now - this.then;
    //console.log("renderFrame")

    if (delta > this.interval) {
    //if (true) {
      this.then = now - (delta % this.interval);

      if (this.state.dimensions){

        this.y = this._waveform(this.arrIndex);
        //var newPoint = this.x + "," + this.y + " "
        //this.path += newPoint

        //console.log("newPoint: " + newPoint)

        // Draw a particular line segment of our curve.
        if(this.x===0){
          //this.wintimer = new Date()
          //this.webviewRef.injectJavaScript('first_point(\''+this.x+'\',\''+this.y+'\')');
          this.ctx.moveTo(this.x, this.y);
          this.ctx.fillRect(this.x, this.y, 1, 1);
        } else {
          //this.webviewRef.injectJavaScript('draw_line(\''+this.x+'\',\''+this.y+'\')');
          this.ctx.lineTo(this.x, this.y);
          this.ctx.stroke();
        }

        // Draw the trace.
        //this.webviewRef.injectJavaScript('trace(\''+(this.x+1)+'\',\''+this.traceWidth+'\')');
        this.ctx.clearRect(this.x+1, 0, this.traceWidth, this.state.dimensions.height);
        var overage = (this.x+1) + (this.traceWidth-1) - this.state.dimensions.width;
        //console.log("overage: " + overage)
        if (overage > 0){
          //this.webviewRef.injectJavaScript('trace(\''+0+'\',\''+overage+'\')');
          this.ctx.clearRect(0, 0, overage, this.state.dimensions.height);
        }
        
        this.x = (this.x % (this.state.dimensions.width+1)) + this.stepsize

        if(this.x >= (this.state.dimensions.width+1)){
          //console.log("path: " + this.path)
          //this.webviewRef.injectJavaScript('reset()');
          this.ctx.beginPath();
          //this.path = ""
          this.x = 0
          //this.wintimer2 = new Date()
          //this.spw = (this.spw + ((this.wintimer2.getTime() - this.wintimer.getTime())/1000))/2
          //console.log("this.spw: " + this.spw)
        }

        if(this.x <= this.state.dimensions.width){
          this.arrIndex += this.stepsize;
        }
      }
    }

    this._frameId = requestAnimationFrame(this.renderFrame);
  }

  onLayout = event => {

    console.log('onLayout')
    console.log("layout width: " + event.nativeEvent.layout.width)
    console.log("layout height: " + event.nativeEvent.layout.height)
    if (this.layoutBool) {
      console.log('returning now')
      return // layout was already called
    }
    this.layoutBool = true;

    this.viewRef.measure((x, y, width, height) => {
      console.log("measure width: " + width)
      console.log("measureheight: " + height)

      this.threshold = Math.round(0.48913*height)
      this.spw = (width/this.stepsize)/this.fps;

      this.setState({ dimensions: { width:width, height:height } })
    })

    //let { width, height } = event.nativeEvent.layout
    //console.log("layout width: " + event.nativeEvent.layout.width)
    //console.log("layout height: " + event.nativeEvent.layout.height)

    return







    console.log('onLayout')
    let { width, height } = event.nativeEvent.layout
    if (this.state.dimensions) {
      if (width == this.state.dimensions.width && height == this.state.dimensions.height) return;
    }
    this.setState({ dimensions: { width:width, height:height } })

    console.log("width: " + width)
    console.log("height: " + height)
    this.threshold = Math.round(0.48913*height)
    //console.log("threshold: " + this.threshold)
    
    /*this.fps = 30;
    this.then = Date.now();
    this.interval = 1000 / this.fps;
    this._frameId = requestAnimationFrame(() => {
      this.renderFrame();
    });*/

    //setTimeout(() => {cancelAnimationFrame(this._frameId)}, 2000)
    //ref={(c) => {this.userTest = c}}

    //seconds per window
    this.spw = (width/this.stepsize)/this.fps;
    //console.log("seconds per window: " + this.spw)
    var bps = this.heartrate/60                     //beats per second
    var bpw = this.spw*bps                                      //beats per window
    //console.log("bpw: " + bpw + " " + Math.round(bpw))
    
    //this.measure();
    //this.view.measure((x, y, width, height) => {
    //  console.log("measure width: " + width)
    //  console.log("measureheight: " + height)
    //})
  }

//ref={(c) => {this.canvasRef = c; this.canvasRef.height = this.state.dimensions.height;}} />
//<View style={{ flex: 1, alignSelf: 'stretch' }} onLayout={this.onLayout} > 
//<Canvas ref={this.handleCanvas}/> 
  render() {
    //console.log('waveform render ' + Platform.OS)
    var s = store.getState();
    this.waveform = s.Waveform;
    //console.log("this.waveform: " + this.waveform)
    this.heartrate = s.HeartRate;
    //console.log("this.heartrate: " + this.heartrate)
    this.pitch = this.pitches[s.O2Sat % 60]
    if (this.state.dimensions) {
      console.log("dimensions true")
      //console.log("this.state.dimensions: " + this.state.dimensions.height + " " + this.state.dimensions.width)
      return (
        <View style={{ flex: 1, alignSelf: 'stretch' }} > 
          <WebView
            ref={this.handleWebView}
            //source={require('./tone_synth.html')}
            source={Platform.OS === 'ios' ? require('./tone_synth.html') : {uri: "file:///android_asset/tone_synth.html"}}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            injectedJavaScript={'init(\''+this.state.dimensions.width+'\',\''+this.state.dimensions.height+'\',\''+this.props.colour+'\');'}
          />
          <Canvas ref={this.handleCanvas}/> 
          </View>
      );
    } else {
      console.log("dimensions false")
      return (<View style={{ flex: 1, alignSelf: 'stretch' }} ref={ref => this.viewRef = ref} onLayout={this.onLayout}/>);

    }
  }
}

  /*render() {
    console.log('render ')
    if (this.state.dimensions) {
      return (
        <View style={{ flex: 1, alignSelf: 'stretch' }} onLayout={this.onLayout} >
        <Svg height={this.state.dimensions.height} width={this.state.dimensions.width}>
        <Polyline
          points={this.path}
          fill="none"
          stroke="green"
          strokeWidth="1"
          ref={(c) => {this.userTest = c;}}
        />
        <Rect x={this.x-9} width="10" height={this.state.dimensions.height} fill="#1c2321"/>
        </Svg>
        </View>
      );
    } else {
      return (<View style={{ flex: 1, alignSelf: 'stretch' }} onLayout={this.onLayout}/>);

    }
  }
}*/

const styles = StyleSheet.create({
  surface : {
    width: '100%',
    height: '100%'
  },
  surfaceView : {
    width: '75%',
    height: '92%',
    marginBottom: '8%'
  }
});

export default WaveformCanvas;