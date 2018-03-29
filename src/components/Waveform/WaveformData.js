import React from 'react';

/*
 * This is the database of data points for specific waveforms 
 *
 * duration: duration of the snippet in ms
 * nPoints: number of points in the duration
 * range: the minimum and maximum y values of the given waveform snippet
 * dataPoints: array of the data points for the snippet
 *
 */
export var waveformData = {
  'HR':{
    'NSR': {
      'duration': 800,
      'nPoints': 300,
      'nWaves': 1,
      'range': {
        'min': -0.535,
        'max': 0.94
      },
      'dataPoints' : [-0.275, -0.28, -0.285, -0.305, -0.29, -0.3, -0.28, -0.29, -0.3, -0.315, -0.32, -0.335, -0.36, -0.385, -0.385, -0.405, -0.455, -0.485, -0.485, -0.425, -0.33, -0.22, -0.07, 0.12, 0.375, 0.62, 0.78, 0.84, 0.765, 0.52, 0.17, -0.165, -0.365, -0.435, -0.425, -0.37, -0.33, -0.325, -0.335, -0.345, -0.33, -0.325, -0.315, -0.31, -0.32, -0.335, -0.34, -0.325, -0.345, -0.335, -0.33, -0.335, -0.33, -0.325, -0.33, -0.33, -0.345, -0.355, -0.335, -0.325, -0.305, -0.32, -0.32, -0.33, -0.34, -0.335, -0.34, -0.345, -0.355, -0.355, -0.34, -0.33, -0.33, -0.33, -0.34, -0.35, -0.325, -0.325, -0.33, -0.33, -0.335, -0.335, -0.34, -0.33, -0.34, -0.35, -0.355, -0.35, -0.345, -0.33, -0.32, -0.335, -0.33, -0.345, -0.33, -0.335, -0.335, -0.345, -0.345, -0.355, -0.34, -0.34, -0.335, -0.33, -0.35, -0.35, -0.345, -0.335, -0.335, -0.335, -0.35, -0.355, -0.355, -0.345, -0.345, -0.335, -0.35, -0.36, -0.36, -0.36, -0.365, -0.36, -0.37, -0.385, -0.37, -0.36, -0.355, -0.36, -0.375, -0.375, -0.365, -0.365, -0.36, -0.36, -0.365, -0.37, -0.355, -0.33, -0.325, -0.325, -0.335, -0.34, -0.315, -0.3, -0.3, -0.29, -0.295, -0.29, -0.285, -0.275, -0.255, -0.25, -0.25, -0.265, -0.255, -0.245, -0.23, -0.245, -0.245, -0.255, -0.255, -0.24, -0.25, -0.255, -0.245, -0.255, -0.25, -0.25, -0.265, -0.26, -0.26, -0.265, -0.27, -0.265, -0.26, -0.275, -0.28, -0.29, -0.275, -0.27, -0.26, -0.28, -0.28, -0.285, -0.275, -0.275, -0.265, -0.27, -0.285, -0.29, -0.28, -0.275, -0.285, -0.28, -0.3, -0.3, -0.305, -0.295, -0.3, -0.31, -0.31, -0.305, -0.295, -0.285, -0.285, -0.29, -0.295, -0.31, -0.29, -0.295, -0.3, -0.305, -0.31, -0.325, -0.31, -0.3, -0.29, -0.31, -0.325, -0.33, -0.315, -0.3, -0.305, -0.31, -0.32, -0.33, -0.325, -0.315, -0.31, -0.305, -0.305, -0.31, -0.3, -0.305, -0.29, -0.3, -0.3, -0.305, -0.305, -0.29, -0.28, -0.295, -0.305, -0.315, -0.305, -0.295, -0.29, -0.28, -0.27, -0.275, -0.275, -0.27, -0.25, -0.25, -0.255, -0.225, -0.22, -0.205, -0.2, -0.205, -0.215, -0.23, -0.22, -0.225, -0.225, -0.225, -0.23, -0.235, -0.24, -0.235, -0.22, -0.21, -0.205, -0.245, -0.285, -0.285, -0.3, -0.31, -0.33, -0.33, -0.325, -0.315, -0.32, -0.315, -0.325, -0.34, -0.345, -0.34, -0.34, -0.35, -0.345, -0.355, -0.33, -0.335, -0.33, -0.32, -0.345, -0.355, -0.34, -0.33]
    },
    'VT': {
      'duration': 0,
      'nPoints': 0,
      'dataPoints' : []
    },
    'VF': {
      'duration': 0,
      'nPoints': 0,
      'dataPoints' : []

    },
    'PEA': {
      'duration': 0,
      'nPoints': 0,
      'dataPoints' : []
    },
    'ASYSTOLE': {
      'duration': 0,
      'nPoints': 0,
      'dataPoints' : []
    }
  },
  'BP':{
    
  },
  'O2Sat':{
    
  }
}
