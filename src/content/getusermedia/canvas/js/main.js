/*
 *  Copyright (c) 2015 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */

// 'use strict';

// Put variables in global scope to make them available to the browser console.
var video = document.querySelector('video');
var canvas = window.canvas = document.querySelector('canvas');
canvas.width = 480;
canvas.height = 360;

var button = document.querySelector('button');
button.onclick = function() {
  if (webrtcDetectedType === 'plugin') {
    var base64 = video.getFrame();
    var image = new Image();
    image.onload = function () {
      canvas.getContext('2d').
        drawImage(image, 0, 0, canvas.width, canvas.height);
    };
    image.setAttribute('src', 'data:image/png;base64,' + base64);
  } else {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').
      drawImage(video, 0, 0, canvas.width, canvas.height);
  }
};

var constraints = {
  audio: false,
  video: true
};

function successCallback(stream) {
  window.stream = stream; // make stream available to browser console
  video = attachMediaStream(video, stream); 
}

function errorCallback(error) {
  console.log('navigator.getUserMedia error: ', error);
}

navigator.getUserMedia(constraints, successCallback, errorCallback);
